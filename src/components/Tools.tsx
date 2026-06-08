import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, PlayCircle, CheckCircle2, AlertCircle, Beaker, Search, RefreshCw, HelpCircle, X } from 'lucide-react';
import SmilesDrawer from 'smiles-drawer';
import SEO from './SEO';

// ---------------------------------------------------------------------------
// Constants and shared helpers
// ---------------------------------------------------------------------------
const DEFAULT_FORMULA = 'C6H6';
const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 320;

type RendererStatus = 'idle' | 'loading' | 'ready' | 'error';
type SmilesTheme = 'light' | 'dark';

type SimulationResult = {
  min: number;
  status: string;
  university: string;
  note: string;
};

type SmilesTree = unknown;

type SmilesDrawerInstance = {
  draw: (tree: SmilesTree, canvas: HTMLCanvasElement, theme: SmilesTheme, infoOnly: boolean) => void;
};

type SmilesDrawerConstructor = new (options: {
  width: number;
  height: number;
  bondThickness: number;
  bondLength: number;
  fontSizeLarge: number;
  fontSizeSmall: number;
  padding: number;
  compactDrawing: boolean;
  explicitHydrogens: boolean;
}) => SmilesDrawerInstance;

type SmilesDrawerModule = {
  Drawer: SmilesDrawerConstructor;
  parse: (
    smiles: string,
    onSuccess: (tree: SmilesTree) => void,
    onError: (error: unknown) => void,
  ) => void;
};

const normalizeFormulaKey = (value: string) => value.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');

const getSmilesTheme = (): SmilesTheme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

const getSmilesDrawerModule = (): SmilesDrawerModule | null => {
  const candidate = ((SmilesDrawer as { default?: unknown }).default ?? SmilesDrawer) as Partial<SmilesDrawerModule>;

  if (candidate && typeof candidate.parse === 'function' && typeof candidate.Drawer === 'function') {
    return candidate as SmilesDrawerModule;
  }

  return null;
};

// ---------------------------------------------------------------------------
// SMILES / formula lookup table
// Notes:
// - Keys are normalized by removing spaces and symbols like parentheses.
// - For formulas with multiple isomers, we provide a common representative.
// ---------------------------------------------------------------------------
const FORMULA_TO_SMILES: Record<string, string> = {
  H2: '[H][H]',
  O2: 'O=O',
  N2: 'N#N',
  CL2: 'ClCl',
  BR2: 'BrBr',

  CH4: 'C',
  H2O: 'O',
  H2O2: 'OO',
  NH3: 'N',
  CO: '[C-]#[O+]',
  CO2: 'O=C=O',
  SO2: 'O=S=O',
  SO3: 'O=S(=O)=O',
  NO2: '[O-][N+]=O',
  HCL: 'Cl',
  HNO3: 'O=[N+]([O-])O',
  H2SO4: 'OS(=O)(=O)O',
  H3PO4: 'OP(=O)(O)O',
  NACL: '[Na+].[Cl-]',
  NAOH: '[Na+].[OH-]',
  KOH: '[K+].[OH-]',
  CAOH2: '[Ca+2].[OH-].[OH-]',
  CACO3: '[Ca+2].[O-]C([O-])=O',
  NH4CL: '[NH4+].[Cl-]',

  C2H6: 'CC',
  C2H4: 'C=C',
  C2H2: 'C#C',
  C3H8: 'CCC',
  C3H6: 'CC=C',
  C4H10: 'CCCC',
  C4H8: 'C1CCC1',
  C5H12: 'CCCCC',
  C6H6: 'c1ccccc1',
  C6H12: 'C1CCCCC1',
  C7H8: 'Cc1ccccc1',

  CH3OH: 'CO',
  C2H5OH: 'CCO',
  C3H8O: 'CC(C)O',
  C4H10O: 'CCOCC',
  C3H8O3: 'OCC(O)CO',

  CH2O: 'C=O',
  C2H4O: 'CC=O',
  C3H6O: 'CC(=O)C',
  C2H4O2: 'CC(=O)O',
  CH3COOH: 'CC(=O)O',
  C3H6O3: 'CC(O)C(=O)O',

  C6H6O: 'c1ccc(cc1)O',
  C6H7N: 'Nc1ccccc1',
  C6H12O6: 'OC1C(O)C(O)C(O)C(O)C1O',
  CH4N2O: 'NC(=O)N',
  C8H9NO2: 'CC(=O)Nc1ccc(O)cc1',
  C8H10N4O2: 'Cn1c(=O)c2c(ncn2C)n(C)c1=O',
  C9H8O4: 'CC(=O)Oc1ccccc1C(=O)O',
};

// Quick-pick presets shown as chips
const PRESETS = [
  { label: 'Metan', formula: 'CH4' },
  { label: 'Apă', formula: 'H2O' },
  { label: 'Benzen', formula: 'C6H6' },
  { label: 'Etanol', formula: 'C2H5OH' },
  { label: 'Acid acetic', formula: 'CH3COOH' },
  { label: 'Acetonă', formula: 'C3H6O' },
  { label: 'Fenol', formula: 'C6H6O' },
  { label: 'Glucoză', formula: 'C6H12O6' },
  { label: 'Uree', formula: 'CH4N2O' },
  { label: 'Cofeină', formula: 'C8H10N4O2' },
  { label: 'Aspirină', formula: 'C9H8O4' },
  { label: 'Acetilenă', formula: 'C2H2' },
] as const;

const SIMULATION_RESULTS: SimulationResult[] = [
  { min: 9.6, status: 'Admis Buget', university: 'UMF Carol Davila (București)', note: 'Excelent! Ești în topul candidaților.' },
  { min: 9.3, status: 'Admis Buget', university: 'UMF Iuliu Hațieganu (Cluj)', note: 'Felicitări! Intri pe locurile fără taxă.' },
  { min: 8.8, status: 'Admis Buget', university: 'UMF Grigore T. Popa (Iași)', note: 'Nivel ridicat. Loc asigurat la buget.' },
  { min: 8.2, status: 'Admis Taxă', university: 'UMF Carol Davila', note: 'Ai intrat pe locurile cu taxă în Capitală.' },
  { min: 7.5, status: 'Admis Taxă', university: 'UMFST Târgu Mureș', note: 'Ești admis în sistemul cu taxă.' },
  { min: 5, status: 'Admis Taxă', university: 'Facultăți Regionale', note: 'Rezultat suficient pentru admitere la taxă.' },
  { min: 0, status: 'Respins', university: 'N/A', note: 'Media este sub pragul minim de admitere. Continuă să înveți!' },
];

// ---------------------------------------------------------------------------
// useSmilesDrawer — loads the library once and exposes a stable draw fn
// ---------------------------------------------------------------------------
function useSmilesDrawer() {
  const drawerRef = useRef<SmilesDrawerInstance | null>(null);
  const drawerSizeRef = useRef<string>('');
  const [libStatus, setLibStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    try {
      const smilesDrawerModule = getSmilesDrawerModule();

      if (smilesDrawerModule) {
        setLibStatus('ready');
      } else {
        console.error('SmilesDrawer structure invalid.');
        setLibStatus('error');
      }
    } catch (error) {
      console.error('SmilesDrawer load failed:', error);
      setLibStatus('error');
    }
  }, []);

  const draw = useCallback((smiles: string, canvas: HTMLCanvasElement): Promise<void> => {
    return new Promise((resolve, reject) => {
      const smilesDrawerModule = getSmilesDrawerModule();

      if (!smilesDrawerModule) {
        reject(new Error('Librăria nu a fost încărcată corect. Toate componentele lipsesc.'));
        return;
      }

      const canvasSizeKey = `${canvas.width}x${canvas.height}`;

      try {
        if (!drawerRef.current || drawerSizeRef.current !== canvasSizeKey) {
          drawerRef.current = new smilesDrawerModule.Drawer({
            width: canvas.width,
            height: canvas.height,
            bondThickness: 2,
            bondLength: 38,
            fontSizeLarge: 15,
            fontSizeSmall: 11,
            padding: 28,
            compactDrawing: false,
            explicitHydrogens: false,
          });
          drawerSizeRef.current = canvasSizeKey;
        }

        smilesDrawerModule.parse(
          smiles,
          (tree) => {
            try {
              const context = canvas.getContext('2d');
              context?.clearRect(0, 0, canvas.width, canvas.height);
              drawerRef.current?.draw(tree, canvas, getSmilesTheme(), false);
              resolve();
            } catch (error) {
              reject(error);
            }
          },
          (error) => reject(error),
        );
      } catch (error) {
        reject(error);
      }
    });
  }, []);

  return { libStatus, draw };
}

// ---------------------------------------------------------------------------
// MolecularRenderer component
// ---------------------------------------------------------------------------
function MolecularRenderer() {
  const [input, setInput] = useState(DEFAULT_FORMULA);
  const [renderStatus, setRenderStatus] = useState<RendererStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef(DEFAULT_FORMULA);
  const lastRenderedInputRef = useRef(DEFAULT_FORMULA);
  const themeFrameRef = useRef<number | null>(null);

  const { libStatus, draw } = useSmilesDrawer();

  useEffect(() => {
    inputRef.current = input;
  }, [input]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const resolveSmiles = useCallback((raw: string): string => {
    const normalizedKey = normalizeFormulaKey(raw);
    return FORMULA_TO_SMILES[normalizedKey] ?? raw.trim();
  }, []);

  const handleRender = useCallback(
    async (value?: string) => {
      const target = (value ?? inputRef.current).trim();

      if (!target) {
        clearCanvas();
        setErrorMsg(null);
        setRenderStatus('idle');
        return;
      }

      if (libStatus !== 'ready') {
        setErrorMsg('Librăria de randare încă se încarcă. Încearcă din nou.');
        setRenderStatus('error');
        return;
      }

      if (!canvasRef.current) {
        return;
      }

      setRenderStatus('loading');
      setErrorMsg(null);

      const normalizedKey = normalizeFormulaKey(target);
      const smiles = resolveSmiles(target);

      try {
        await draw(smiles, canvasRef.current);
        lastRenderedInputRef.current = target;
        setRenderStatus('ready');
      } catch (error) {
        console.error('SMILES render failed:', error);
        setErrorMsg(
          FORMULA_TO_SMILES[normalizedKey]
            ? 'Eroare la desenarea structurii pentru această moleculă.'
            : 'Formula sau codul SMILES nu este recunoscut. Verifică sintaxa.',
        );
        setRenderStatus('error');
      }
    },
    [clearCanvas, draw, libStatus, resolveSmiles],
  );

  useEffect(() => {
    if (libStatus === 'ready') {
      void handleRender(DEFAULT_FORMULA);
    }
  }, [handleRender, libStatus]);

  useEffect(() => {
    if (libStatus !== 'ready') {
      return;
    }

    const observer = new MutationObserver((mutations) => {
      const classChanged = mutations.some((mutation) => mutation.attributeName === 'class');

      if (!classChanged) {
        return;
      }

      if (themeFrameRef.current !== null) {
        window.cancelAnimationFrame(themeFrameRef.current);
      }

      themeFrameRef.current = window.requestAnimationFrame(() => {
        void handleRender(lastRenderedInputRef.current);
        themeFrameRef.current = null;
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();

      if (themeFrameRef.current !== null) {
        window.cancelAnimationFrame(themeFrameRef.current);
      }
    };
  }, [handleRender, libStatus]);

  const handlePreset = useCallback(
    (formula: string) => {
      setInput(formula);
      inputRef.current = formula;
      void handleRender(formula);
    },
    [handleRender],
  );

  const handleClearInput = useCallback(() => {
    setInput('');
    inputRef.current = '';
    lastRenderedInputRef.current = '';
    setErrorMsg(null);
    setRenderStatus('idle');
    clearCanvas();
  }, [clearCanvas]);

  return (
    <section className="bg-natural-card p-8 rounded-[32px] border border-natural-border shadow-sm flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-natural-earth/10 rounded-xl flex items-center justify-center text-natural-earth">
          <Beaker className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-natural-green-dark">Vizualizator Chimic</h2>
          <p className="text-xs text-natural-gray mt-0.5">Structuri 2D din formule sau coduri SMILES</p>
        </div>
      </div>

      <AnimatePresence>
        {libStatus === 'loading' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 flex items-center gap-2 px-4 py-3 bg-natural-muted rounded-2xl border border-natural-border/50"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="w-4 h-4 border-2 border-natural-gray/20 border-t-natural-green rounded-full shrink-0"
            />
            <span className="text-xs text-natural-gray font-medium">Se încarcă librăria de randare...</span>
          </motion.div>
        )}
        {libStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 flex items-center gap-2 px-4 py-3 bg-natural-earth/5 rounded-2xl border border-natural-earth/20"
          >
            <AlertCircle className="w-4 h-4 text-natural-earth shrink-0" />
            <span className="text-xs text-natural-earth font-medium">
              Librăria SmilesDrawer nu a putut fi încărcată. Verifică conexiunea și reîncarcă pagina.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                void handleRender();
              }
            }}
            placeholder="ex: C6H6, Ca(OH)2 sau c1ccccc1"
            disabled={libStatus !== 'ready'}
            className="w-full p-4 pr-12 bg-natural-muted rounded-2xl border-2 border-transparent focus:border-natural-green/30 focus:ring-0 transition-all tracking-wider font-mono text-sm disabled:opacity-50"
          />
          {input && (
            <button
              onClick={handleClearInput}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-natural-gray/40 hover:text-natural-gray transition-colors"
              aria-label="Șterge formula"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={() => void handleRender()}
          disabled={!input.trim() || libStatus !== 'ready'}
          className="px-5 py-4 bg-natural-earth text-white rounded-2xl font-bold hover:bg-natural-earth/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline text-sm">Randează</span>
        </button>
      </div>

      <div className="flex items-start gap-2 mb-4 px-1">
        <HelpCircle className="w-3.5 h-3.5 text-natural-gray/40 mt-0.5 shrink-0" />
        <p className="text-[11px] text-natural-gray/60 leading-relaxed">
          Acceptă formule chimice precum H2O, NaCl, Ca(OH)2, C8H10N4O2 sau coduri SMILES precum c1ccccc1 și CCO.
          Formulele sunt normalizate automat, inclusiv dacă folosesc paranteze.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {PRESETS.map((preset) => (
          <button
            key={preset.formula}
            onClick={() => handlePreset(preset.formula)}
            disabled={libStatus !== 'ready'}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border disabled:opacity-40 ${
              normalizeFormulaKey(input) === preset.formula
                ? 'bg-natural-green text-white border-natural-green shadow-sm'
                : 'bg-natural-muted text-natural-gray border-natural-border/50 hover:border-natural-green/30 hover:text-natural-green'
            }`}
          >
            {preset.label}
            <span className="ml-1 opacity-50 font-mono font-normal">{preset.formula}</span>
          </button>
        ))}
      </div>

      <div className="relative flex-grow min-h-[280px] bg-natural-muted/40 rounded-3xl border border-natural-border/50 overflow-hidden flex items-center justify-center">
        {libStatus === 'loading' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-natural-muted/20 animate-pulse">
            <div className="w-16 h-16 bg-natural-border/30 rounded-2xl" />
            <div className="w-32 h-3 bg-natural-border/30 rounded-full" />
            <div className="w-24 h-2.5 bg-natural-border/20 rounded-full" />
          </div>
        )}

        <AnimatePresence>
          {renderStatus === 'loading' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-natural-muted/60 backdrop-blur-sm z-10 gap-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                className="w-8 h-8 border-3 border-natural-green/20 border-t-natural-green rounded-full"
                style={{ borderWidth: 3 }}
              />
              <span className="text-xs text-natural-gray font-medium">Se calculează structura...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {libStatus === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center bg-natural-earth/5 z-20">
            <div className="w-16 h-16 bg-natural-earth/10 rounded-2xl flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-natural-earth" />
            </div>
            <p className="text-sm font-bold text-natural-green-dark">Librăria nu a putut fi încărcată</p>
            <p className="text-xs text-natural-gray max-w-xs leading-relaxed">
              Eroare tehnică la inițializarea vizualizatorului. Verifică conexiunea la internet și reîncarcă pagina.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-6 py-2 bg-natural-earth text-white rounded-xl text-xs font-bold hover:bg-natural-earth/80 transition-all"
            >
              Reîncarcă Pagina
            </button>
          </div>
        )}

        <AnimatePresence>
          {renderStatus === 'error' && libStatus === 'ready' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center z-10"
            >
              <div className="w-14 h-14 bg-natural-earth/10 rounded-2xl flex items-center justify-center">
                <AlertCircle className="w-7 h-7 text-natural-earth" />
              </div>
              <p className="text-sm font-bold text-natural-green-dark">Eroare de randare</p>
              <p className="text-xs text-natural-gray max-w-xs leading-relaxed">{errorMsg}</p>
              <button
                onClick={() => setRenderStatus('idle')}
                className="mt-1 text-xs font-bold text-natural-green hover:underline"
              >
                Încearcă din nou
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {renderStatus === 'idle' && libStatus === 'ready' && (
          <div className="flex flex-col items-center gap-2 text-natural-gray/40">
            <Beaker className="w-10 h-10" />
            <p className="text-xs font-medium">Introdu o formulă și apasă Randează</p>
          </div>
        )}

        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            renderStatus === 'ready' ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <p className="text-[10px] text-natural-gray/50 italic mt-3 text-center">
        Afișează structuri 2D prin librăria SmilesDrawer. Rezultatele sunt orientative.
      </p>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main Tools page
// ---------------------------------------------------------------------------
export default function Tools() {
  const [bacGrade, setBacGrade] = useState('');
  const [examGrade, setExamGrade] = useState('');
  const [calculatedMedie, setCalculatedMedie] = useState<number | null>(null);

  const [simStep, setSimStep] = useState(0);
  const [simResult, setSimResult] = useState<Omit<SimulationResult, 'min'> | null>(null);

  const simulationTimersRef = useRef<number[]>([]);

  const clearSimulationTimers = useCallback(() => {
    simulationTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    simulationTimersRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearSimulationTimers();
  }, [clearSimulationTimers]);

  const resetSimulation = useCallback(() => {
    clearSimulationTimers();
    setSimStep(0);
    setSimResult(null);
  }, [clearSimulationTimers]);

  const handleBacGradeChange = useCallback(
    (value: string) => {
      setBacGrade(value);
      setCalculatedMedie(null);
      resetSimulation();
    },
    [resetSimulation],
  );

  const handleExamGradeChange = useCallback(
    (value: string) => {
      setExamGrade(value);
      setCalculatedMedie(null);
      resetSimulation();
    },
    [resetSimulation],
  );

  const handleCalculate = useCallback(() => {
    const bac = parseFloat(bacGrade);
    const exam = parseFloat(examGrade);

    if (!Number.isNaN(bac) && !Number.isNaN(exam) && bac >= 1 && bac <= 10 && exam >= 1 && exam <= 10) {
      setCalculatedMedie(exam * 0.9 + bac * 0.1);
      resetSimulation();
      return;
    }

    setCalculatedMedie(null);
    resetSimulation();
  }, [bacGrade, examGrade, resetSimulation]);

  const startSimulation = useCallback(() => {
    clearSimulationTimers();
    setSimResult(null);
    setSimStep(1);

    simulationTimersRef.current = [
      window.setTimeout(() => setSimStep(2), 1200),
      window.setTimeout(() => setSimStep(3), 2400),
      window.setTimeout(() => {
        setSimStep(4);

        if (calculatedMedie === null) {
          setSimResult({
            status: 'Eroare',
            university: 'N/A',
            note: 'Te rugăm să îți calculezi media mai întâi în secțiunea de mai jos.',
          });
          return;
        }

        const match =
          SIMULATION_RESULTS.find((result) => calculatedMedie >= result.min) ??
          SIMULATION_RESULTS[SIMULATION_RESULTS.length - 1];

        const { min: _min, ...resultWithoutMin } = match;
        setSimResult(resultWithoutMin);
      }, 4000),
    ];
  }, [calculatedMedie, clearSimulationTimers]);

  return (
    <div className="pt-24 pb-16 px-4 max-w-5xl mx-auto space-y-12">
      <SEO
        title="Instrumente"
        description="Simulator de admitere, calculator de medii și vizualizator de structuri chimice pentru admiterea la medicină."
      />

      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-natural-green-dark">Instrumente Interactive</h1>
        <p className="text-natural-gray mt-4 max-w-2xl mx-auto">
          Calculează-ți șansele, vizualizează structuri chimice și simulează procesul de admitere.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12">
        <section className="bg-natural-card p-8 rounded-[32px] border border-natural-border shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-natural-green/10 rounded-xl flex items-center justify-center text-natural-green">
              <Calculator className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-natural-green-dark">Calculator de Medii</h2>
          </div>

          <div className="space-y-4 flex-grow">
            <div>
              <label className="block text-xs font-bold text-natural-gray uppercase tracking-wider mb-2">
                Media Bacalaureat
              </label>
              <input
                type="number"
                step="0.01"
                min="1"
                max="10"
                value={bacGrade}
                onChange={(event) => handleBacGradeChange(event.target.value)}
                placeholder="ex: 9.25"
                className="w-full p-4 bg-natural-muted rounded-2xl border-none focus:ring-2 focus:ring-natural-green transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-natural-gray uppercase tracking-wider mb-2">
                Notă Estimată Examen (Grilă)
              </label>
              <input
                type="number"
                step="0.01"
                min="1"
                max="10"
                value={examGrade}
                onChange={(event) => handleExamGradeChange(event.target.value)}
                placeholder="ex: 9.80"
                className="w-full p-4 bg-natural-muted rounded-2xl border-none focus:ring-2 focus:ring-natural-green transition-all"
              />
            </div>

            <button
              onClick={handleCalculate}
              disabled={!bacGrade || !examGrade}
              className="w-full py-4 bg-natural-green text-white rounded-2xl font-bold hover:bg-natural-green-dark transition-all shadow-lg shadow-natural-green/20 disabled:opacity-50 disabled:shadow-none"
            >
              Calculează Media de Admitere
            </button>

            {calculatedMedie !== null && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-6 p-6 bg-natural-green/10 rounded-2xl text-center border border-natural-green/20"
              >
                <p className="text-natural-gray text-sm font-medium uppercase tracking-widest mb-1">Media ta finală ar fi:</p>
                <span className="text-4xl font-serif font-bold text-natural-green">{calculatedMedie.toFixed(2)}</span>
                <p className="text-xs text-natural-gray mt-2 italic">
                  *Estimare bazată pe ponderea standard (90% examen, 10% bac).
                </p>
              </motion.div>
            )}
          </div>
        </section>

        <MolecularRenderer />
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <section className="bg-natural-green-dark p-8 rounded-[32px] text-white flex flex-col items-center justify-center relative overflow-hidden h-full min-h-[400px]">
          <div className="absolute top-0 right-0 p-8 text-white/5">
            <Calculator className="w-48 h-48" />
          </div>

          {simStep === 0 ? (
            <div className="text-center z-10">
              <h2 className="text-3xl font-serif font-bold mb-4">Simulator Admitere</h2>
              <p className="text-white/70 mb-8 max-w-sm mx-auto">
                {calculatedMedie !== null
                  ? `Simulăm cu media ta de ${calculatedMedie.toFixed(2)}. Ești pregătit?`
                  : 'Calculează-ți mai întâi media de sus, apoi simulează rezultatul.'}
              </p>
              <button
                onClick={startSimulation}
                disabled={calculatedMedie === null}
                className="px-8 py-4 bg-white text-natural-green-dark rounded-2xl font-bold flex items-center gap-2 hover:bg-natural-muted transition-all mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlayCircle className="w-5 h-5" /> Începe Simularea
              </button>
            </div>
          ) : (
            <div className="w-full z-10 space-y-8">
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`w-3 h-3 rounded-full ${simStep >= step ? 'bg-white' : 'bg-white/20'}`}
                    />
                  ))}
                </div>

                <h3 className="text-xl font-bold text-center">
                  {simStep === 1 && 'Verificarea Dosarului...'}
                  {simStep === 2 && 'Susținerea Examenului...'}
                  {simStep === 3 && 'Corectarea Lucrării...'}
                  {simStep === 4 && 'Afișarea Rezultatelor!'}
                </h3>
              </div>

              {simStep < 4 ? (
                <div className="flex justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                    className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full"
                  />
                </div>
              ) : (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-white/10 p-6 rounded-2xl border border-white/20 text-center w-full"
                >
                  {simResult?.status === 'Respins' || simResult?.status === 'Eroare' ? (
                    <X className="w-12 h-12 text-natural-earth mx-auto mb-4" />
                  ) : (
                    <CheckCircle2 className="w-12 h-12 text-natural-green mx-auto mb-4" />
                  )}

                  <h4 className="text-2xl font-serif font-bold mb-1">{simResult?.status}</h4>
                  <p className="text-sm font-medium text-white/80 mb-3">{simResult?.university}</p>

                  <div className="h-px bg-white/20 w-12 mx-auto mb-4" />

                  <p className="text-sm leading-relaxed text-white/90">{simResult?.note}</p>

                  <button
                    onClick={resetSimulation}
                    className="mt-6 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                  >
                    Resetează Simulatorul
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </section>

        <section className="bg-natural-card p-8 rounded-[32px] border border-natural-border shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-natural-earth/10 rounded-xl flex items-center justify-center text-natural-earth">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-natural-green-dark">Informații Rapide</h2>
          </div>

          <div className="grid gap-8">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-natural-green/10 flex items-center justify-center shrink-0 text-natural-green">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-natural-green-dark">Calendar Actualizat</h4>
                <p className="text-sm text-natural-gray leading-relaxed">
                  Înscrierile încep pe 1 Iulie 2026. Calendarul complet este disponibil în secțiunea Admitere.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-natural-green/10 flex items-center justify-center shrink-0 text-natural-green">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-natural-green-dark">Acte Necesare</h4>
                <p className="text-sm text-natural-gray leading-relaxed">
                  Diplomă BAC, adeverință medicală, copii legalizate și taxă de înscriere.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-natural-green/10 flex items-center justify-center shrink-0 text-natural-green">
                <Beaker className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-natural-green-dark">Suport Tehnic</h4>
                <p className="text-sm text-natural-gray leading-relaxed">
                  Suntem aici să te ajutăm cu orice întrebare legată de platformă sau procesul de admitere.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
