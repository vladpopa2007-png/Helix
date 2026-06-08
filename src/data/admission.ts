export interface Program {
  id: string;
  name: string;
  duration: string;
  description: string;
  seats: {
    budget: number;
    tax: number;
  };
}

export const admissionInfo = {
  faculty: {
    name: "Facultatea de Medicină și Farmacie",
    about: "O instituție de prestigiu dedicată excelenței în educația medicală, cercetare și practică clinică. Suntem dedicați formării viitoarei generații de medici care vor transforma asistența medicală în România și în lume.",
    images: [
      "https://picsum.photos/seed/med1/800/600",
      "https://picsum.photos/seed/med2/800/600",
      "https://picsum.photos/seed/med3/800/600"
    ]
  },
  programs: [
    {
      id: "medicina",
      name: "Medicină Generală",
      duration: "6 ani",
      description: "Programul principal de studii medicale, concentrat pe anatomie clinică, fiziologie, patologie și practică în spital.",
      seats: { budget: 200, tax: 100 }
    },
    {
      id: "medicina-dentara",
      name: "Medicină Dentară",
      duration: "6 ani",
      description: "Specializare în sănătatea orală, tehnici protetice și chirurgie maxilo-facială.",
      seats: { budget: 50, tax: 30 }
    },
    {
      id: "farmacie",
      name: "Farmacie",
      duration: "5 ani",
      description: "Studiul substanțelor medicamentoase, sintezei organice și managementului farmaceutic.",
      seats: { budget: 80, tax: 40 }
    }
  ],
  requirements: {
    documents: [
      "Diploma de Bacalaureat (original sau copie legalizată)",
      "Certificat de Naștere și Căsătorie (după caz)",
      "Adeverință medicală tip",
      "Copie carte de identitate",
      "Chitanță achitare taxă înscriere",
      "4 fotografii tip buletin"
    ],
    timeline: [
      { date: "1-15 Iulie 2026", event: "Înscrieri Online și Fizic" },
      { date: "20 Iulie 2026", event: "Examen de Admitere (Biologie și Chimie)" },
      { date: "22 Iulie 2026", event: "Afișare Rezultate Provizorii" },
      { date: "23-25 Iulie 2026", event: "Depunere Contestații și Confirmare Locuri" }
    ]
  },
  faq: [
    { q: "Ce materii se susțin la examen?", a: "Examenul constă dintr-o probă scrisă tip grilă din Biologie (obligatoriu) și Chimie sau Fizică (la alegere)." },
    { q: "Care a fost ultima medie la buget anul trecut?", a: "Ultima medie la buget pentru Medicină Generală a fost 9.45." },
    { q: "Există locuri speciale pentru mediul rural?", a: "Da, sunt alocate anual locuri speciale pentru absolvenții liceelor din mediul rural." }
  ]
};
