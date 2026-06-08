import { Topic } from '../../types';

export const chemistryTopics: Topic[] = [
  {
    id: 'chem-alchene',
    subject: 'chimie',
    title: 'Alchene',
    category: 'Chimie Organică',
    importance: 'high',
    readTime: '20 min',
    excerpt: 'Hidrocarburi nesaturate cu o legătură dublă.',
    content: `
# Alchene

Alchenele sunt hidrocarburi nesaturate care conțin o legătură dublă C=C. Formula generală: CnH2n.

## 1. Structură
Legătura dublă este formată dintr-o legătură sigma și o legătură pi. Atomii de carbon sunt hibridizați sp2.

## 2. Nomenclatură
Se înlocuiește sufixul "-an" din alcanul corespunzător cu "-enă".
Exemple: etena (CH2=CH2), propena.

## 3. Proprietăți Chimice
Reacția caracteristică este **Adiția**:
- Adiția H2 (hidrogenare) -> alcani.
- Adiția Halogenilor (Cl2, Br2) -> compuși dihalogenați vicinali.
- Adiția Hidracizilor (HCl, HBr) -> conform regulii lui Markovnikov.
- Oxidarea: blândă (soluție Bayer) sau energică (KMnO4/H2SO4).
    `,
    questions: [
      {
        id: 'q8',
        topicId: 'chem-alchene',
        question: 'Care este formula generală a alchenelor?',
        options: ['CnH2n+2', 'CnH2n', 'CnH2n-2', 'CnHn'],
        correctOption: 1,
        explanation: 'Alchenele sunt hidrocarburi nesaturate cu o legătură dublă, având formula generală CnH2n.'
      },
      {
        id: 'q9',
        topicId: 'chem-alchene',
        question: 'Ce tip de hibridizare prezintă atomii de carbon implicați în legătura dublă la alchene?',
        options: ['sp', 'sp2', 'sp3', 'sp3d'],
        correctOption: 1,
        explanation: 'Atomii de carbon din legătura dublă a alchenelor sunt hibridizați sp2, având o geometrie plan-trigonală.'
      },
      {
        id: 'q10',
        topicId: 'chem-alchene',
        question: 'Conform regulii lui Markovnikov, la adiția hidracizilor la alchene asimetrice, halogenul se fixează la:',
        options: [
          'Atomul de carbon cel mai hidrogenat',
          'Oricare dintre atomii de carbon',
          'Atomul de carbon cel mai puțin hidrogenat',
          'Atomul de carbon de la capătul catenei'
        ],
        correctOption: 2,
        explanation: 'Regula lui Markovnikov spune că atomul de hidrogen se fixează la carbonul cel mai hidrogenat, iar halogenul la cel mai puțin hidrogenat.'
      }
    ]
  },
  {
    id: 'chem-solutii',
    subject: 'chimie',
    title: 'Soluții și Concentrații',
    category: 'Chimie Generală',
    importance: 'medium',
    readTime: '12 min',
    excerpt: 'Calculul concentrațiilor procentuale și molare.',
    content: `
# Soluții și Concentrații

Soluția este un amestec omogen format din dizolvat (solut) și dizolvant (solvent).

## 1. Concentrația Procentuală Masică (c%)
c% = (md / ms) * 100
Unde:
- md = masa dizolvatului
- ms = masa soluției (md + m_solvent)

## 2. Concentrația Molară (CM)
CM = n / V
Unde:
- n = numărul de moli (m/M)
- V = volumul soluției exprimat în litri
    `
  },
  {
    id: 'chem-alcani',
    subject: 'chimie',
    title: 'Alcani',
    category: 'Chimie Organică',
    importance: 'high',
    readTime: '15 min',
    excerpt: 'Hidrocarburi saturate cu legături simple C-C.',
    content: `
# Alcani

Hidrocarburi saturate cu formula generală CnH2n+2.

## 1. Structură
Conțin doar legături sigma C-C și C-H. Atomii de carbon sunt hibridizați sp3 (geometrie tetraedrică).

## 2. Seria Omoloagă
- Metan (CH4)
- Etan (C2H6)
- Propan (C3H8)
- Butan (C4H10)

## 3. Proprietăți Chimice
- **Substituția**: Clorurarea metanului.
- **Izomerizarea**: Transformarea alcanilor liniari în alcani ramificați.
- **Arderea**: Reacție puternic exotermă care produce CO2 și H2O.
    `
  },
  {
    id: 'chem-alcooli',
    subject: 'chimie',
    title: 'Alcooli',
    category: 'Chimie Organică',
    importance: 'high',
    readTime: '17 min',
    excerpt: 'Compuși hidroxilici cu grupa funcțională -OH.',
    content: `
# Alcooli

Compuși organici care conțin grupa hidroxil (-OH) legată de un atom de carbon saturat.

## 1. Clasificare
- După numărul grupărilor -OH: monohidroxilici, polihidroxilici (ex: glicerina).
- După natura radicalului: saturați, nesaturați, aromatici.

## 2. Proprietăți Fizice
Alcoolii inferiori sunt solubili în apă datorită legăturilor de hidrogen. Punctele de fierbere sunt mult mai mari decât ale hidrocarburilor corespunzătoare.

## 3. Reacții Caracteristice
- **Reacția cu metalele alcaline**: Formarea alcoxizilor.
- **Deshidratarea**: Formarea alchenelor sau eterilor.
- **Oxidarea**: Alcoolii primari trec în aldehide și apoi în acizi carboxilici.
    `
  },
  // New Chemistry Topics
  {
    id: 'chem-alchine',
    subject: 'chimie',
    title: 'Alchine',
    category: 'Chimie Organică',
    importance: 'high',
    readTime: '18 min',
    excerpt: 'Hidrocarburi nesaturate cu o legătură triplă.',
    content: `
# Alchine

Hidrocarburi nesaturate ce conțin o legătură triplă C≡C. Formula generală: CnH2n-2.

## 1. Structură
Legătura triplă este formată dintr-o legătură sigma și două legături pi. Hibridizare sp (geometrie liniară).

## 2. Acetilena (Etina)
Cea mai importantă alchină (HC≡CH).
- **Obținere**: Din carbid (CaC2) și apă.

## 3. Proprietăți Chimice
- **Adiția**: H2 (totală sau parțială), Halogeni, Hidracizi, Apă (reacția Kucerov - rezultă aldehidă sau cetonă).
- **Reacția cu metalele**: Formarea acetylurilor (caracter acid slab).
    `
  },
  {
    id: 'chem-arene',
    subject: 'chimie',
    title: 'Arene',
    category: 'Chimie Organică',
    importance: 'high',
    readTime: '25 min',
    excerpt: 'Hidrocarburi aromatice, benzenul și derivații săi.',
    content: `
# Arene (Hidrocarburi Aromatice)

Compuși care conțin cel puțin un ciclu benzenic.

## 1. Benzenul (C6H6)
Structura Kekulé (alternanță de legături simple și duble) vs. Reprezentarea modernă (sextet electronic delocalizat).

## 2. Proprietăți Chimice
Caracter aromatic (suportă ușor substituția, greu adiția).
- **Substituția**: Halogenare, Nitrare, Sulfonare, Alchilare (Friedel-Crafts).
- **Oxidarea**: Ciclul este rezistent la oxidanți obișnuiți.
    `
  },
  {
    id: 'chem-acizi-carboxilici',
    subject: 'chimie',
    title: 'Acizi Carboxilici',
    category: 'Chimie Organică',
    importance: 'high',
    readTime: '22 min',
    excerpt: 'Compuși cu grupa funcțională -COOH.',
    content: `
# Acizi Carboxilici

Compuși organici care conțin grupa funcțională carboxil (-COOH). Formula generală: R-COOH.

## 1. Clasificare
- După natura radicalului: saturați (acid formic, acetic), nesaturați (acid acrylic), aromatici (acid benzoic).
- După numărul grupărilor -COOH: monocarboxilici, dicarboxilici (acid oxalic).

## 2. Proprietăți Fizice
Acizii inferiori sunt lichizi, solubili în apă și au miros înțepător. Punctele de fierbere sunt mari din cauza dimerizării prin legături de hidrogen.

## 3. Proprietăți Chimice
- **Caracterul acid**: Reacționează cu metale active, oxizi metalici, baze și săruri ale acizilor mai slabi.
- **Esterificarea**: Reacția cu alcoolii în prezență de H2SO4 (rezultă ester și apă).
    `
  },
  {
    id: 'chem-zaharide',
    subject: 'chimie',
    title: 'Zaharide (Glucide)',
    category: 'Compuși cu Acțiune Biologică',
    importance: 'high',
    readTime: '25 min',
    excerpt: 'Clasificarea zaharidelor: monozaharide, oligozaharide și polizaharide.',
    content: `
# Zaharide (Glucide)

Compuși polihidroxilcarbonilici (polihidroxialdehide sau polihidroxicetone).

## 1. Monozaharide (CnH2nOn)
- **Glucoza (Aldohexoză)**: Cel mai important zahăr. Sursă de energie.
- **Fructoza (Cetohexoză)**: Zahărul din fructe.

## 2. Dizaharide
- **Zaharoza**: Glucoză + Fructoză.
- **Celobioza**: Rezultă din hidroliza celulozei.

## 3. Polizaharide
- **Amidonul**: Polimer de alfa-glucoză. Rezervă energetică la plante.
- **Celuloza**: Polimer de beta-glucoză. Rol structural (pereți celulari).
    `
  },
  {
    id: 'chem-proteine',
    subject: 'chimie',
    title: 'Aminoacizi și Proteine',
    category: 'Compuși cu Acțiune Biologică',
    importance: 'high',
    readTime: '24 min',
    excerpt: 'Bazele vieții: structura proteinelor și rolul enzimelor.',
    content: `
# Aminoacizi și Proteine

Aminoacizii sunt cărămizile care construiesc proteinele prin legături peptidice.

## 1. Aminoacizi
Conțin o grupă amino (-NH2) și o grupă carboxil (-COOH).
- **Aminoacizi esențiali**: Nu pot fi sintetizați de organism.

## 2. Proteine
Polimeri naturali rezultați prin policondensarea aminoacizilor.
- **Structură**: Primară (secvența), Secundară (elice/pliere), Terțiară (tridimensională), Cuaternară.
- **Proprietăți**: Denaturarea (pierderea structurii sub acțiunea căldurii sau pH-ului).

## 3. Enzime
Catalizatori biologici de natură proteică, extrem de specifici.
    `
  },
  {
    id: 'chem-lipide',
    subject: 'chimie',
    title: 'Lipide (Grăsimi)',
    category: 'Compuși cu Acțiune Biologică',
    importance: 'medium',
    readTime: '15 min',
    excerpt: 'Trigliceride, acizi grași și rolul grăsimilor în organism.',
    content: `
# Lipide (Grăsimi)

Compuși organici insolubili în apă, dar solubili în solvenți organici.

## 1. Acizi Grași
Acizi carboxilici cu catenă lungă.
- **Saturați**: Palmitic, Stearic.
- **Nesaturați**: Oleic (o legătură dublă), Linoleic.

## 2. Trigliceride
Esteri ai glicerinei cu acizii grași.
- **Uleiuri**: Lichide la temp. camerei (predomină acizii nesaturați).
- **Grăsimi**: Solide (predomină acizii saturați).

## 3. Săpunuri și Detergenți
Săruri ale acizilor grași cu metale alcaline (săpunuri) sau substanțe de sinteză (detergenți).
    `
  }
];
