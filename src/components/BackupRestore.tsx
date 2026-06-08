import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Upload, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

interface BackupRestoreProps {
  bookmarks: string[];
  completed: string[];
  onRestore: (data: { bookmarks: string[]; completed: string[] }) => void;
}

export default function BackupRestore({ bookmarks, completed, onRestore }: BackupRestoreProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      bookmarks,
      completed,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `progres-medadmitere-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        if (Array.isArray(data.bookmarks) && Array.isArray(data.completed)) {
          onRestore({
            bookmarks: data.bookmarks,
            completed: data.completed
          });
          setStatus('success');
          setTimeout(() => setStatus('idle'), 3000);
        } else {
          throw new Error('Format invalid');
        }
      } catch (err) {
        console.error('Import failed:', err);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-natural-card border border-natural-border/50 rounded-[32px] p-8 shadow-sm">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-natural-green/10 rounded-2xl flex items-center justify-center shrink-0">
          <ShieldCheck className="w-8 h-8 text-natural-green" />
        </div>
        
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-xl font-serif font-bold text-natural-green-dark mb-1">Backup & Sincronizare</h3>
          <p className="text-sm text-natural-gray">
            Nu îți pierde progresul. Exportă studiile tale într-un fișier local pentru a le restaura oricând sau pe alt dispozitiv.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExport}
            className="flex items-center gap-2 px-5 py-2.5 bg-natural-green text-white rounded-xl text-xs font-bold shadow-md hover:bg-natural-green-dark transition-colors"
          >
            <Download className="w-4 h-4" /> Exportă Progres
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-5 py-2.5 bg-natural-muted text-natural-green-dark rounded-xl text-xs font-bold border border-natural-border hover:bg-natural-border transition-colors"
          >
            <Upload className="w-4 h-4" /> Importă Fișier
          </motion.button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImport} 
            className="hidden" 
            accept=".json"
          />
        </div>
      </div>

      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-green-700 text-sm font-medium"
          >
            <RefreshCw className="w-5 h-5 animate-spin" />
            Progres restaurat cu succes! Pagina se va actualiza.
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 p-4 bg-natural-earth/10 border border-natural-earth/20 rounded-2xl flex items-center gap-3 text-natural-earth text-sm font-medium"
          >
            <AlertCircle className="w-5 h-5" />
            Eroare: Fișierul selectat nu este valid sau este corupt.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
