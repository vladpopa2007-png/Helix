export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'image' | 'link' | 'checklist';
  description: string;
  category: 'biologie' | 'chimie' | 'administrativ' | 'sfaturi' | 'schițe';
  downloadUrl?: string;
  thumbnailUrl?: string;
}

export const resources: Resource[] = [
  {
    id: 'res-sk-sistem-nervos-intro',
    title: 'Sinteză: Sistemul Nervos (Introducere)',
    type: 'pdf',
    category: 'schițe',
    description: 'Clasificarea funcțională și localizarea SN, structura SNP și sistemul meningeal.',
    downloadUrl: '#'
  },
  {
    id: 'res-sk-arcul-reflex',
    title: 'Sinteză: Arcul Reflex',
    type: 'pdf',
    category: 'schițe',
    description: 'Componentele detaliate: receptori, cale aferentă, centri nervoși, cale eferentă și efectori.',
    downloadUrl: '#'
  },
  {
    id: 'res-sk-caile-sensibilitatii',
    title: 'Sinteză: Căile Sensibilității',
    type: 'pdf',
    category: 'schițe',
    description: 'Căile exteroceptive (termic-dureroasă, tactilă) și proprioceptive (conștientă/inconștientă).',
    downloadUrl: '#'
  },
  {
    id: 'res-sk-caile-descendente',
    title: 'Sinteză: Căile Descendente',
    type: 'pdf',
    category: 'schițe',
    description: 'Sistemul piramidal (motilitate voluntară) și extrapiramidal (involuntară).',
    downloadUrl: '#'
  },
  {
    id: 'res-sk-diencefal-hipofiza',
    title: 'Sinteză: Diencefalul și Hipofiza',
    type: 'pdf',
    category: 'schițe',
    description: 'Topografia diencefalului și legătura structural/funcțională cu glanda hipofiză.',
    downloadUrl: '#'
  },
  {
    id: 'res-sk-emisfere-cerebrale',
    title: 'Sinteză: Emisferele Cerebrale',
    type: 'pdf',
    category: 'schițe',
    description: 'Morfologie, substanța albă/cenușie, scoarța cerebrală (paleo/neocortex) și reflexe.',
    downloadUrl: '#'
  },
  {
    id: 'res-sk-maduva-spinarii',
    title: 'Sinteză: Măduva Spinării',
    type: 'pdf',
    category: 'schițe',
    description: 'Morfologie externă, structura internă și funcția reflexă a măduvei.',
    downloadUrl: '#'
  },
  {
    id: 'res-sk-nervii-spinali-cranieni',
    title: 'Sinteză: Nervii Spinali și Cranieni',
    type: 'pdf',
    category: 'schițe',
    description: 'Distribuția și funcțiile celor 31 perechi de nervi spinali și 12 perechi de nervi cranieni.',
    downloadUrl: '#'
  },
  {
    id: 'res-sk-snv',
    title: 'Sinteză: Sistemul Nervos Vegetativ',
    type: 'pdf',
    category: 'schițe',
    description: 'Componentele Simpatic și Parasimpatic, efecte asupra organelor și neurotransmițători.',
    downloadUrl: '#'
  },
  {
    id: 'res-sk-celula-organite',
    title: 'Sinteză: Celula și Organitele',
    type: 'pdf',
    category: 'schițe',
    description: 'Membrana celulară, citoplasma, organite comune și specifice (neurofibrile, corpi tigroizi).',
    downloadUrl: '#'
  },
  {
    id: 'res-sk-transport-transmembranar',
    title: 'Sinteză: Transportul Transmembranar',
    type: 'pdf',
    category: 'schițe',
    description: 'Difuziune, osmoză, transport activ (pompe) și transport vezicular (citoză).',
    downloadUrl: '#'
  },
  {
    id: 'res-sk-tesuturi',
    title: 'Sinteză: Țesuturile Umane',
    type: 'pdf',
    category: 'schițe',
    description: 'Clasificarea și structura țesuturilor epiteliale, conjunctive, musculare și nervoase.',
    downloadUrl: '#'
  },
  {
    id: 'res-checklist-dosar',
    title: 'Checklist: Dosarul de Înscriere',
    type: 'checklist',
    category: 'administrativ',
    description: 'O listă completă cu toate documentele originale și copiile necesare pentru validarea dosarului la secretariat.'
  },
  {
    id: 'res-pdf-simulare-bio',
    title: 'Simulare Grilă Biologie 2025',
    type: 'pdf',
    category: 'biologie',
    description: 'Subiectele date la simularea oficială de anul trecut, incluzând baremul de corectare detaliat.',
    downloadUrl: '#'
  },
  {
    id: 'res-vid-tehnici-invatare',
    title: 'Cum să înveți pentru Medicină?',
    type: 'video',
    category: 'sfaturi',
    description: 'Video: Sfaturi de la studenți din anii mari despre organizarea timpului și utilizarea hărților conceptuale.',
    thumbnailUrl: 'https://picsum.photos/seed/learn/400/250'
  },
  {
    id: 'res-img-harta-conceptuala-nervos',
    title: 'Harta Conceptuală: Sistemul Nervos',
    type: 'image',
    category: 'biologie',
    description: 'O schemă vizuală a întregului sistem nervos central și periferic, ideală pentru recapitulare rapidă.',
    thumbnailUrl: 'https://picsum.photos/seed/mindmap/400/250'
  },
  {
    id: 'res-pdf-admitere-chimie-organic',
    title: 'Ghid Reacții Chimie Organică',
    type: 'pdf',
    category: 'chimie',
    description: 'Sinteza tuturor reacțiilor de adiție, substituție și oxidare cerute pentru examenul grilă.',
    downloadUrl: '#'
  },
  {
    id: 'res-link-biblio-oficiala',
    title: 'Bibliografia Oficială (Minister)',
    type: 'link',
    category: 'administrativ',
    description: 'Link către manualele și capitolele aprobate oficial pentru concursul de admitere 2026.'
  }
];
