import { Topic } from '../../types';

export const biologyTopics: Topic[] = [
  {
    id: 'bio-celula',
    subject: 'biologie',
    title: 'Celula',
    category: 'Introducere',
    importance: 'high',
    readTime: '15 min',
    excerpt: 'Bazele biologiei celulare: structura celulei, organite și compoziția chimică.',
    content: `
# Celula
Celula este unitatea de bază structurală și funcțională a tuturor organismelor vii.

## 1. Structura Celulei
Toate celulele eucariote prezintă trei componente principale:
- **Membrana celulară (Plasmalema)**: Înveliș lipoproteic ce înconjoară celula, separă structurile interne ale celulei de mediu extracelular, având rol de protecție și în transportul selectiv. Este alcătuită, în principal de Fosfolipide(lipide complexe) și proteine. 
  - **Fosfolipidele** sunt dispuse astfel încat porțiunea lor hidrofilă (cu afinitate pentru apă ) la exterior , iar porțiunea lor hidrofobă (cu afinitate pentru grăsimi ce respinge apa) la interior, creând un miez hidrofob care restricționează pasajul transmembranar pentru Molecule **Hidrosolubile** și **Ioni** . 
  - **Lipidele membranei** sunt în special fosfolipidele, dar sunt reprezentate și colesterolul (care conferă stabilitate), la interior, spre miezul hidrofob, și glicolipidele (lipide cu grupări glucidice) la exterior.
  - **Componenta proteica a membranei** este cea ce realizeaza funcțiile de transport transmembranar. Proteinele se pot afla pe fața externă sau internă a membranei sau pot traversa întreaga membrană (proteine transmembranare). Deoarece **proteinele** sunt dispuse neregulat în membrană, aceasta este descrisă ca având o structură de **mozaic fluid**. 
  - **Glucidele** (în special glicolipide și glicoproteine) , atașate pe fața ei externa. Acestea sunt încărcate puternic negativ, atașate pe fața externă.

![Membrane Structure](https://cdn.kastatic.org/ka-perseus-images/fed788320703b8fa3c23d3b95b936ab07f1fe5a7.png)

- **Citoplasma**: are o structură complexă , unde se desfașoară principalele funcții vitale. Este un sistem coloidal, cu mediu de dispersie apa, iar faza dispersata este ansamblul de micelii coloidale în mișcare browniană. Funcțional, citoplasma conține hialoplasma (partea nestructurată) și **organitele celulare** (partea structurată). 
- **Nucleul**: Centrul de control care coordonează procesele biologice celulare fundamentale (conțin materialul genetic ADN/ARN, controlează metabolismul celular, transmite informația). Are o poziție centrală sau excentrică (celule adipoase, mucoase. Are de obicei forma celulei. Numărul nucelilor variază: celule mononucleate (majoritatea), binucleate (hepatocite), multinucleate (celule musculare striate). Nucleul este înconjurat de o membrană dublă, poroasă, care permite schimbul de substanțe cu citoplasma. În interiorul nucleului se găsesc cromatina (ADN + proteine) și nucleolul (sinteza ARN-ului ribozomal). 
  - **Dimensiunile**: 3-20 μ, corespunzător ciclului funcțional al celulei, fiind în raport de 1/3-1/4 din citoplasmă.   
  - **Structura**: membrana nucleară (dublă, poroasă),  carioplasma (lichidul din nucleu), cromatina (ADN + proteine) și nucleoli. 

## 2. Organite Celulare
### Organite Comune (în toate celulele):
- **1. Reticulul Endoplasmatic (RE)**: Sistem canalicular de transport, ce leagă plasmalema de stratul extern al membranei nucleare. Poate fi **neted (REN)** (metabolismul glicogenului) sau **rugos (RER/REG)** (sinteza proteinelor datorită prezenței ribozomilor).
- **2. Ribosomii (Corpusculii lui Palade)**: Organite bogate in ribonucleoproteine, de forma unor granule ovale sau rotunde (150-250 Å). Există ribozomi liberi în matricea citoplasmă și asociați Reticului Endoplasmatic Neted, care formează ergastoplasma (REG). Ribozomii sunt sediul sintezei proteinelor.
- **3. Aparatul Golgi (Dictiozomii)**: Sistem membranar format din micro și macrovezicule și din cisterne alungite, situat în apropierea nucleului, în zona cea mai activă a citoplasmei.Rol în excreția substanțelor celulare.
- **4. Mitocondria**: Formă ovalară, rotundă, cu un perete de structură trilaminară (lipoproteică). Prezintă un învelis extern (membrana externă) , urmat de un spațiu intermembranar și un învelis intern (membrana internă) care formează creste mitocondriale. În interiorul mitocondriei se găsește matricea mitocondrială, undese află sistemele enzimatice și fosforilarea oxidativă (sinteza ATP-ului).
- **5. Lizozomii**: Corpusculi sferici raspândiți în intreaga hialoplasma, ce conțin enzime hidrolitice pentru digestia intracelulară (fagocitoză), cu rol important în celulele fagocitare (leucocite, macrofage).
- **6. Centrozomul**: Situat in apropierea nucleului, manifestându-se in timpul diviziunii celulare. Este format din 2 centrioli cilindrici, orientati perpendicular unul pe celălalt și înconjurați de o zonă de citoplasmă vâscoasă (centrosferă). Are rol în diviziunea celulară (absent în neuronii care nu se divid).

### Organite Specifice:
- **Neurofibrilele**: Constituie o rețea care se întinde în citoplasma neuronului, în axoplasmă și în dendrite. Are rol mecanic și de conducere.
- **Corpii Tigroizi (Corpusculii Nissl)**: În citoplasma neuronului, cu rol în metabolismul neuronal, fiind echivalenți ai ergastoplasmei.
- **Miofibrilele**: Elemente contractile prezente din sarcoplasma fibrelor musculare.

## 3. Proprietățile Celulei
- **Sinteza Proteică**: Coordonată de nucleu și realizată de ribozomi.
- **Transportul Transmembranar**:
  - Prezintă permeabilitate selectivă, fiind un înveliș lipoproteic, pentru anumite molecule și majoritatea ionilor.
  - Permite un schimb **bidirecțional** de **substanțe nutritive**, **deșeuri** (produși ai catabolismului celular) precum și un trasnfer ionic, care determina apariția unor diferențe de potențial electric între interiorul și exteriorul celulei (**curenți electrici**).
  - Modalități de transport:
  - **Pasiv**: Difuziune (gaz, molecule), Osmotice (apa).
  - **Activ**: Cu consum de ATP (pompele Na+/K+, Ca2+).
  - **Vezicular (Citoza)**: Endocitoza (fagocitoza - solide, pinocitoza - lichide) și Exocitoza.
- **Ecitabilitatea**: Capacitatea de a genera un potențial de acțiune (impuls).
    `,
    questions: [
      {
        id: 'q1',
        topicId: 'bio-celula',
        question: 'Care organit celular este supranumit "centrala energetică" a celulei?',
        options: ['Ribozomul', 'Mitocondria', 'Aparatul Golgi', 'Lizozomul'],
        correctOption: 1,
        explanation: 'Mitocondriile sunt sediul respirației celulare și al sintezei de ATP (energie), fiind de aceea numite centrale energetice.'
      },
      {
        id: 'q2',
        topicId: 'bio-celula',
        question: 'Unde are loc sinteza proteinelor în celulă?',
        options: ['În nucleu', 'În lizozomi', 'La nivelul ribozomilor', 'În centrozom'],
        correctOption: 2,
        explanation: 'Ribozomii (corpusculii lui Palade) sunt sediul sintezei proteinelor.'
      },
      {
        id: 'q3',
        topicId: 'bio-celula',
        question: 'Care organit lipsește din neuronii adulți, motiv pentru care aceștia nu se divid?',
        options: ['Nucleul', 'Centrozomul', 'Mitocondria', 'Reticulul endoplasmatic'],
        correctOption: 1,
        explanation: 'Centrozomul are rol în diviziunea celulară; absența lui în neuroni explică de ce aceștia nu se divid.'
      },
      {
        id: 'q4',
        topicId: 'bio-celula',
        question: 'Modelul structural al membranei celulare este descris ca:',
        options: ['Mozaic rigid', 'Strat dublu proteic', 'Mozaic fluid', 'Lipozom sferic'],
        correctOption: 2,
        explanation: 'Membrana are o structură de mozaic fluid, fiind un înveliș lipoproteic selectiv.'
      }
    ]
  },
  {
    id: 'bio-sistem-nervos',
    subject: 'biologie',
    title: 'Sistemul Nervos',
    category: 'Sisteme',
    importance: 'high',
    readTime: '25 min',
    excerpt: 'Organizarea sistemului nervos, neuronul și sinapsa.',
    content: `
# Sistemul Nervos

Sistemul nervos coordonează activitatea organismului prin impulsuri electrice, integrând organismul în mediul de viață.

## 1. Clasificare
### După funcție:
- **SN Somatic**: Al vieții de relație (integrează organismul în mediu).
- **SN Vegetativ (SNV)**: Autonom (independen). Are două componente antagonice:
  - **Simbatic**: Pregătește corpul pentru acțiune (luptă sau fugă). Cresterea activității cordului.
  - **Parasinpatic**: Menține funcțiile în repaus. Scăderea activității cordului.

### După localizare:
- **SNC (Sistem Nervos Central / Nevrax)**: Adăpostit în craniu și canalul vertebral.
  - **Măduva Spinării**: Centru reflex și de conducere.
  - **Encefal**: Trunchi cerebral, Cerebel, Diencefal, Emisfere cerebrale.
- **SNP (Sistem Nervos Periferic)**: Nervi și ganglioni care leagă SNC de restul corpului.

## 2. Neuronul și Nevrogliile
Neuronul este unitatea structurală și funcțională.
- **Componente**: Corp celular (pericarion), Dendrite (centripete) și Axon (centrifug).
- **Tece axonale (SNP)**: Mielină (produsă de Schwan), Teaca Schwan și Teaca Henle.
- **Nevrogliile (Celulele gliale)**: De 10 ori mai numeroase decât neuronii. Rol de suport, protecție și troficitate. Exemple: Astrocite, Microglii, Oligodendrogliile.

## 3. Arcul Reflex
Reprezintă baza fundamentală a activității sistemului nervos. Componentele sale sunt:
1. **Receptorul**: Transformă energia stimulului în impuls nervos.
2. **Calea Aferentă**: Fibre senzitive care duc mesajul la centru.
3. **Centrul Nervos**: Analizează informația și elaborează o comandă.
4. **Calea Eferentă**: Fibre motorii care duc comanda la efector.
5. **Efectorul**: Organul care execută comanda (muschi sau glande).

## 4. Sistemul Meningeal
Protejează organele SNC și este format din 3 foițe:
- **Dura-mater** (externă, fibroasă).
- **Arahnoida** (mijlocie).
- **Pia-mater** (internă, vascularizată, aderentă la țesutul nervos).
    `,
    questions: [
      {
        id: 'q5',
        topicId: 'bio-sistem-nervos',
        question: 'Care componentă a sistemului nervos vegetativ pregătește corpul pentru acțiune (luptă sau fugă)?',
        options: ['Somatic', 'Parasimpatic', 'Simpatic', 'Periferic'],
        correctOption: 2,
        explanation: 'Sistemul Simpatic intervine în situații neobișnuite, de stres sau pericol, pregătind organismul pentru acțiune.'
      },
      {
        id: 'q6',
        topicId: 'bio-sistem-nervos',
        question: 'Teaca de mielină din sistemul nervos periferic este produsă de:',
        options: ['Codurile lui Palade', 'Nodurile Ranvier', 'Celulele Schwann', 'Astrocite'],
        correctOption: 2,
        explanation: 'Celulele Schwann sunt cele care produc teaca de mielină în SNP.'
      },
      {
        id: 'q7',
        topicId: 'bio-sistem-nervos',
        question: 'Care este ordinea corectă a elementelor unui arc reflex?',
        options: [
          'Receptor -> Cale aferentă -> Centru -> Cale eferentă -> Efector',
          'Efector -> Cale eferentă -> Centru -> Cale aferentă -> Receptor',
          'Centru -> Receptor -> Cale aferentă -> Efector -> Cale eferentă',
          'Receptor -> Cale eferentă -> Centru -> Cale aferentă -> Efector'
        ],
        correctOption: 0,
        explanation: 'Orice arc reflex începe cu un receptor și se termină cu un efector, trecând prin căile aferentă și eferentă via centrul nervos.'
      }
    ]
  },
  {
    id: 'bio-tesuturi',
    subject: 'biologie',
    title: 'Țesuturile Umane',
    category: 'Introducere',
    importance: 'high',
    readTime: '20 min',
    excerpt: 'Clasificarea și structura celor patru tipuri fundamentale de țesuturi.',
    content: `
# Țesuturile Umane

Țesutul este un sistem organizat de materie vie, format din celule similare care realizează aceeași funcție.

## 1. Țesutul Epitelial
### Clasificare după funcție:
- **De acoperire**: Pavimentos, cubic, cilindric (simplu sau stratificat). Protejează suprafețele.
- **Glandular (Secretor)**: Formează glande endocrine (hormoni în sânge) și exocrine (secretă prin canale).
- **Senzorial**: Conține celule specializate în recepționarea stimulilor (gustativ, auditiv, vestibular).

## 2. Țesutul Conjunctiv
Are rol de suport, legătură și troficitate. Format din celule, fibre și substanță fundamentală.
- **Moale**: Lax, reticulat (hematopoieză), adipos (rezervă), fibros (tendoane), elastic.
- **Semidur (Cartilaginos)**: Hialin (articulații), elastic (pavilionul urechii), fibros (discuri intervertebrale).
- **Dur (Osos)**: Compact (haversian) și spongios (trabecular).
- **Fluid**: Sângele (plasmă + elemente figurate: hematii, leucocite, trombocite).

## 3. Țesutul Muscular
Specializat pentru contractilitate (transformă energia chimică în mecanică).
- **Striat Scheletic**: Voluntar, mușchii de pe oase.
- **Striat Cardiac (Miocardul)**: Involuntar, inima.
- **Neted**: Involuntar, pereții organelor interne (visceral) și irisul (multiunitar).

## 4. Țesutul Nervos
Format din **neuroni** (conducere impuls) și **nevroglii** (suport). Este responsabil pentru reglarea și coordonarea întregului organism.
    `
  },
  {
    id: 'bio-digestiv',
    subject: 'biologie',
    title: 'Sistemul Digestiv',
    category: 'Sisteme',
    importance: 'high',
    readTime: '20 min',
    excerpt: 'Anatomia și fiziologia tubului digestiv și a glandelor anexe.',
    content: `
# Sistemul Digestiv

Sistemul digestiv realizează transformarea alimentelor în nutrienți absorbabili.

## 1. Componente
- **Tubul digestiv**: Cavitate bucală, faringe, esofag, stomac, intestin subțire, intestin gros.
- **Glande anexe**: Glande salivare, ficat, pancreas.

## 2. Digestia în Stomac
- **Activitate motorie**: Amestecarea alimentelor cu sucul gastric.
- **Activitate chimică**: Enzime precum pepsina (pentru proteine) și lipaza gastrică.

## 3. Absorbția Intestinală
Are loc în principal în intestinul subțire prin intermediul vilozităților intestinale care măresc suprafața de contact.
    `
  },
  {
    id: 'bio-endocrin',
    subject: 'biologie',
    title: 'Sistemul Endocrin',
    category: 'Sisteme',
    importance: 'high',
    readTime: '18 min',
    excerpt: 'Glandele endocrine și rolul hormonilor în reglarea organismului.',
    content: `
# Sistemul Endocrin

Reglează funcțiile organismului prin intermediul hormonilor eliberați direct în sânge.

## 1. Hipofiza (Glanda Pituitară)
Considerată "creierul endocrin". Secretă:
- **STH**: Hormonul de creștere.
- **TSH**: Stimulează tiroida.
- **ACTH**: Stimulează glandele suprarenale.

## 2. Tiroida
Secretă tiroxina și triiodotironina, care reglează metabolismul bazal.

## 3. Pancreasul Endocrin
Reglează glicemia prin:
- **Insulină**: Scade glicemia (hipoglicemiant).
- **Glucagon**: Crește glicemia (hiperglicemiant).
    `
  },
  // New Biology Topics
  {
    id: 'bio-circulator',
    subject: 'biologie',
    title: 'Sistemul Circulator',
    category: 'Sisteme',
    importance: 'high',
    readTime: '22 min',
    excerpt: 'Inima, vasele de sânge și marea/mica circulație.',
    content: `
# Sistemul Circulator

Asigură transportul substanțelor (nutrienți, gaze, hormoni) la celule și preluarea produșilor de deșeu.

## 1. Inima
Organ musculos cavitar cu 4 camere: 2 atrii și 2 ventricule.
- **Morfologie**: Pericard (extern), Miocard (mușchiul), Endocard (intern).
- **Automatismul cardiac**: Nodulul sinoatrial (pacemaker natural), nodulul atrioventricular, fasciculul His, rețeaua Purkinje.

## 2. Vasele de sânge
- **Artere**: Pleacă de la inimă, pereți groși și elastici.
- **Vene**: Vin la inimă, au valvule semilunare (în membrele inferioare).
- **Capilare**: Cele mai subțiri, loc unde are loc schimbul de substanțe.

## 3. Circulația Sângelui
- **Marea circulație (Sistemică)**: Ventricul stâng -> Aortă -> Corp -> Vene cave -> Atriu drept.
- **Mica circulație (Pulmonară)**: Ventricul drept -> Artera pulmonară -> Plămâni -> Vene pulmonare -> Atriu stâng.
    `
  },
  {
    id: 'bio-respirator',
    subject: 'biologie',
    title: 'Sistemul Respirator',
    category: 'Sisteme',
    importance: 'high',
    readTime: '15 min',
    excerpt: 'Căile respiratorii, plămânii și mecanismul ventilației.',
    content: `
# Sistemul Respirator

Asigură schimbul de gaze dintre organism și mediu (O2 pentru oxidări celulare și eliminarea CO2).

## 1. Căile Respiratorii
- **Extrapulmonare**: Cavitate nazală, faringe, laringe (aparat fonator), trahee, bronhii principale.

## 2. Plămânii
Unitatea structurală și funcțională este **alveola pulmonară**.
- **Pleura**: Membrana dublă ce înconjoară plămânii (foița viscerală și parietală).

## 3. Ventilația Pulmonară
- **Inspirația**: Proces activ (contracția diafragmului și mușchilor intercostali).
- **Expirația**: Proces pasiv în repaus.
    `
  },
  {
    id: 'bio-excretor',
    subject: 'biologie',
    title: 'Sistemul Excretor',
    category: 'Sisteme',
    importance: 'high',
    readTime: '18 min',
    excerpt: 'Rinichii, căile urinare și formarea urinei.',
    content: `
# Sistemul Excretor

Elimină substanțele nefolositoare și toxice din sânge, menținând echilibrul mediului intern.

## 1. Anatomia Rinichiului
Organe pereche în spatele cavității abdominale.
- **Zona corticală**: La exterior.
- **Zona medulară**: Conține piramidele lui Malpighi.
- **Nefronul**: Unitatea structurală și funcțională. Format din corpuscul renal (glomerul + capsulă) și tub urinifer.

## 2. Formarea Urinei
- **Ultrafiltrarea glomerulară**: Rezultă urina primară (cca. 180L/zi).
- **Reabsorbția tubulară**: Recuperarea substanțelor utile.
- **Secreția tubulară**: Eliminarea activă a deșeurilor.

## 3. Căile Urinare
Uretere, vezica urinară (golire prin reflexul de micțiune) și uretra.
    `
  },
  {
    id: 'bio-locomotor',
    subject: 'biologie',
    title: 'Sistemul Locomotor',
    category: 'Sisteme',
    importance: 'medium',
    readTime: '20 min',
    excerpt: 'Scheletul și sistemul muscular.',
    content: `
# Sistemul Locomotor

Compus din sistemul osos (partea pasivă) și sistemul muscular (partea activă).

## 1. Sistemul Osos
Totalitatea oaselor legate prin articulații.
- **Scheletul capului**: Neurocraniu și viscerocraniu.
- **Scheletul trunchiului**: Coloana vertebrală, coastele și sternul.
- **Scheletul membrelor**: Centuri și scheletul membrelor libere.

## 2. Articulațiile
- **Imobile**: Suturile craniene.
- **Mobile (Diartroze)**: Permit mișcări variate (ex: genunchi, cot).

## 3. Sistemul Muscular
Mușchii scheletici realizează mișcarea prin contracție.
- **Proprietățile mușchiului**: Excitabilitate, contractilitate, extensibilitate și elasticitate.
    `
  },
  {
    id: 'bio-ochiul',
    subject: 'biologie',
    title: 'Analizatorul Vizual',
    category: 'Senzorial',
    importance: 'high',
    readTime: '22 min',
    excerpt: 'Structura ochiului, retina și formarea imaginii.',
    content: `
# Analizatorul Vizual

Ochiul este principalul receptor senzorial, oferind peste 80% din informațiile despre mediu.

## 1. Globul Ocular
Format din 3 tunici:
- **Sclerotica**: Tunica externă, protectoare (albul ochiului). În față devine corneea transparentă.
- **Coroida**: Tunica medie, vascularizată, hrănește ochiul. Conține irisul (partea colorată).
- **Retina**: Tunica internă, fotosensibilă. Conține celule cu **conuri** (vederea colorată, diurnă) și **bastoane** (vederea nocturnă).

## 2. Mediile Transparente
- Corneea, umoarea apoasă, cristalitul (lentilă biconvexă), corpul vitros.

## 3. Fiziologia Vederii
Lumina trece prin mediile transparente și se focalizează pe retină. Imaginea formată este **reală, răsturnată și mai mică**.
    `
  },
  {
    id: 'bio-genetica-bazele',
    subject: 'biologie',
    title: 'Bazele Geneticii',
    category: 'Genetica',
    importance: 'high',
    readTime: '25 min',
    excerpt: 'ADN, ARN și legile lui Mendel.',
    content: `
# Bazele Geneticii

Genetica studiază ereditatea și variabilitatea organismelor.

## 1. Acizii Nucleici
- **ADN (Acid Deoxiribonucleic)**: Structură dublu elicoidală (Watson și Crick). Poartă informația genetică.
- **ARN (Acid Ribonucleic)**: Implicat în sinteza proteinelor (ARNm, ARNt, ARNr).

## 2. Legile lui Mendel
- **Legea Purității Gameților**: Gameții sunt întotdeauna puri genetic.
- **Legea Segregării Independente**: Perechile de caractere segregă independent în generația a doua.

## 3. Diviziunea Celulară
- **Mitoza**: Rezultă celule diploide (identice cu mama).
- **Meioza**: Rezultă gameți haploizi (reducerea numărului de cromozomi la jumătate).
    `
  }
];
