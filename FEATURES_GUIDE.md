# Ghidul Caracteristicilor HELIX

Acest document explică toate caracteristicile noi adăugate la platforma HELIX.

## Cuprins
1. [Sistemul de Insigne de Realizări](#sistemul-de-insigne-de-realizări)
2. [Simulator de Examen Practic](#simulator-de-examen-practic)
3. [Diagrame Interactive](#diagrame-interactive)
4. [Forum de Studiu](#forum-de-studiu)
5. [Statistici și Analize de Studiu](#statistici-și-analize-de-studiu)

---

## Sistemul de Insigne de Realizări

### Descriere Generală
Sistemul de insigne urmărește automat progresul tău de studiu și deblochează realizări pe măsură ce studiezi mai mult și obții rezultate mai bune.

### Categoriile de Insigne

#### 1. **Insigne de Timp de Studiu**
Deblochate prin acumularea timpului de studiu:
- 🔥 **Prima Oră** - Studiază timp de 1 oră
- ⚡ **Dedicat** - Studiază timp de 5 ore
- 🚀 **Învăţător Puternic** - Studiază timp de 10 ore
- 💪 **Maraton** - Studiază timp de 50 ore
- 👑 **Maestru** - Studiază timp de 100 ore

#### 2. **Insigne de Performanță în Teste**
Deblochate prin obţinerea de scoruri înalte în teste:
- 🎯 **Scor Perfect** - Obţii 10/10 la orice test
- 📈 **Consecvent** - Menţii o medie de 90%+ la ultimele 5 teste

#### 3. **Insigne de Completare**
Deblochate prin finalizarea tuturor subiectelor dintr-o disciplină:
- 🧬 **Maestru în Biologie** - Completează toate subiectele de biologie
- ⚗️ **Maestru în Chimie** - Completează toate subiectele de chimie

#### 4. **Insigne de Streak (Continuitate)**
Deblochate prin studiu consistent:
- 🔗 **Războinic al Săptămânii** - Studiază 7 zile la rând
- 🏆 **Campion al Lunii** - Studiază 30 de zile la rând

### Cum să Obţii Insigne
1. Vizitează pagina "Realizări" pentru a vedea toate insignele disponibile
2. Deschide un subiect pentru a începe să urmărești sesiunile de studiu
3. Completează subiectele pentru a-ți mări timpul de studiu
4. Fă teste pentru a-ți construi antecedentele de performanță
5. Revino zilnic pentru a-ți construi streak-ul!

### Detalii de Implementare
- Insignele sunt urmărite în `localStorage` folosind hook-ul `useBadges`
- Sesiunile de studiu sunt înregistrate automat când se completează subiectele
- Sistemul de insigne se află în [src/hooks/useBadges.ts](src/hooks/useBadges.ts)

---

## Simulator de Examen Practic

### Descriere Generală
Examen complet cu timp limitat care imită condițiile reale de examen cu analiză detaliată a performanței.

### Caracteristici
- ✓ **Lungime personalizată** - Alege 10, 20, 30 sau 50 de întrebări
- ✓ **Selecția dificultăţii** - Ușor, Mediu sau Dificil
- ✓ **Selecția subiectului** - Biologie, Chimie sau Mixt
- ✓ **Examene cu timp** - ~90 de secunde per întrebare
- ✓ **Descompunere a scorului** - Vezi performanța pe subiect
- ✓ **Feedback detaliat** - Vezi explicații pentru fiecare răspuns

### Cum se Foloseşte
1. Navighează la "Examen Practic" în meniu
2. Selectează preferințele tale pentru examen:
   - Numărul de întrebări
   - Nivelul de dificultate
   - Subiect(e)
3. Fă clic pe "Începe Examen"
4. Răspunde la întrebări în limita de timp
5. Vizualizează rezultatele cu descompunere detaliată
6. Încearcă din nou pentru a-ți îmbunătăţi scorul

### Stările Interfeţei
- **Configurație** - Setează parametrii examenului
- **Examen Activ** - Răspunde la întrebări cu cronometru
- **Rezumat** - Vizualizează rezultatele și descompunerea

---

## Diagrame Interactive

### Descriere Generală
Diagrame educaționale pe care se poate face clic, pentru subiectele de biologie și chimie, cu capacități de adnotare.

### Diagrame Disponibile
- 🧬 **Celula Animală** - Explorează organitele și funcțiile lor
- 🌱 **Fotosinteza** - Reacții dependente și independente de lumină
- ⚗️ **Legătura Chimică** - Tipuri de legături și proprietățile lor
- 🧬 **Replicarea ADN-ului** - Proces pas cu pas

### Caracteristici
- ✓ **Fă clic pentru a afla** - Obţii informații detaliate despre fiecare parte
- ✓ **Comutare straturi** - Arată/ascunde diferite sisteme
- ✓ **Adnotări personale** - Adaugă note de studiu la elemente
- ✓ **Feedback vizual** - Efecte la trecerea mouse-ului și evidenţiere

### Cum se Foloseşte
1. Navighează la "Diagrame"
2. Selectează o diagramă din listă
3. Fă clic pe elemente pentru a afla mai mult
4. Fă clic pe "Adaugă Notă" pentru a adnota elemente
5. Notele tale sunt salvate automat

### Crearea Diagramelor Personalizate
Editează [src/data/diagrams.ts](src/data/diagrams.ts) pentru a adăuga diagrame noi:

```typescript
export const myDiagram: InteractiveDiagram = {
  id: 'unique-id',
  type: 'cell', // sau 'anatomy', 'reaction', 'process'
  title: 'Titlul Diagramei',
  description: 'Descriere scurtă',
  elements: [
    {
      id: 'element-1',
      label: 'Numele Elementului',
      info: 'Informații detaliate despre acest element',
      x: 100, // Coordonata X
      y: 150, // Coordonata Y
      type: 'point', // sau 'area', 'shape'
    },
    // Adaugă mai multe elemente...
  ],
};
```

---

## Forum de Studiu

### Descriere Generală
Forum de discuţie organizat pe subiecte unde studenții pot pune întrebări, partaja perspective și învăţa unii de la alții.

### Caracteristici
- ✓ **Discuţii specifice pe subiecte** - Organizate pe subiecte din curriculum
- ✓ **Autentificare utilizator** - Participare bazată pe nume de utilizator
- ✓ **Funcţionalitate de căutare** - Găsește discuţii rapid
- ✓ **Sistem de răspunsuri** - Conversații în format thread
- ✓ **Actualizări în timp real** (când Supabase este conectat)

### Cum se Foloseşte
1. Navighează la "Forum" în meniu
2. Introdu un nume de utilizator (salvat pentru sesiuni viitoare)
3. Răsfoieşte discuţiile existente sau creează una nouă
4. Fă clic pe o discuţie pentru a vedea răspunsurile
5. Adaugă răspunsul tău sau deschide o discuţie nouă

### Crearea unei Noi Discuţii
1. Fă clic pe "Fir Nou"
2. Introdu titlul discuţiei
3. Selectează subiectul asociat
4. Scrie întrebarea sau subiectul tău
5. Fă clic pe "Postează"

### Integrarea cu Baza de Date
Forumul poate fi conectat la Supabase pentru stocare persistentă:
- Vezi [FORUM_SUPABASE_SETUP.md](FORUM_SUPABASE_SETUP.md) pentru instrucțiuni de configurare
- În prezent folosește localStorage în scop demonstrativ
- Tabele: `forum_threads` și `forum_replies`

---

## Statistici și Analize de Studiu

### Descriere Generală
Tabloul de bord personal care arată progresul tău, realizările și activitatea de studiu.

### Metrici Afişate
- ⏱️ **Timp Total de Studiu** - Ore și minute studiate
- 🔥 **Streak Curent** - Zile de studiu consecutive
- 🏆 **Insigne Obţinute** - Total realizări deblochate
- 📚 **Teste Realizate** - Numărul de încercări de teste

### Caracteristici
- ✓ **Vitrina de realizări** - Afişează toate insignele deblochate
- ✓ **Activitate recentă** - Vizualizează ultimele 5 sesiuni de studiu
- ✓ **Urmărire progres** - Monitorizează-ți îmbunătăţirea
- ✓ **Filtru insigne** - Vezi insigne deblochate vs blocate

### Cum se Accesează
Navighează la "Realizări" în meniu

---

## Prezentarea Arhitecturii

### Fişiere Noi Create
```
src/
├── hooks/
│   └── useBadges.ts           # Logica urmării insignelor
├── data/
│   └── diagrams.ts             # Definiții diagrame interactive
├── components/
│   ├── BadgeDisplay.tsx         # Componentă UI pentru insigne
│   ├── PracticeExam.tsx         # Simulator de examen
│   ├── InteractiveDiagram.tsx   # Vizualizor diagrame
│   ├── InteractiveDiagrams.tsx  # Pagina galerie diagrame
│   ├── Forum.tsx                # Forum de discuţie
│   └── StudyStats.tsx           # Tabloul de bord analize
└── Documentation/
    └── FORUM_SUPABASE_SETUP.md  # Ghid configurare bază date
```

### Fluxul de Date
```
App.tsx (gestionarea stării)
  ├── Hook useBadges (urmărire insigne)
  ├── Sesiuni de studiu (urmărire completare)
  ├── Scoruri teste (urmărire performanță)
  └── Stare partajată cu componente
```

### Chei de Stocare Locală
- `helix-user-stats` - Sistem insigne și date de studiu
- `helix-forum-username` - Nume utilizator forum
- `helix-theme` - Preferință temă (existent)
- `helix-bookmarks` - Subiecte marcate (existent)
- `helix-completed` - Subiecte completate (existent)

---

## Ghid de Integrare

### Adăugare la TopicDetail
Pentru a urmări timpul de studiu la vizualizarea unui subiect:

```typescript
const handleStudySession = (durationSeconds: number) => {
  addStudySession(topic.id, topic.subject, durationSeconds);
};
```

### Înregistrarea Scorurilor de Teste
După finalizarea unui test:

```typescript
const handleQuizComplete = (score: number, total: number) => {
  recordQuizScore(topic.id, (score / total) * 100);
};
```

### Afişarea Insignelor în Componente
```typescript
import BadgeDisplay from './BadgeDisplay';

<BadgeDisplay badges={stats.badges} showNew={newBadgeUnlocked} />
```

---

## Considerații de Performanță

1. **Calcule Insigne** - Recalculate doar când se schimbă datele de studiu
2. **Stocare Locală** - Consideră dimensiunea pentru utilizare intensivă (ia în considerare IndexedDB)
3. **Actualizări Forum** - Actualmente sondaj (ia în considerare WebSockets cu Supabase)
4. **Redare Diagrame** - Bazate pe SVG, scalează bine

---

## Îmbunătăţiri Viitoare

1. **Analiză Powered de IA** - Identifică subiecte slabe
2. **Învăţare Adaptivă** - Ajustează recomandări bazate pe performanță
3. **Partajare Socială** - Partajează realizări
4. **Repetare Spațiată** - Optimizează programul de revizuire
5. **Aplicaţie Mobilă** - Versiune React Native
6. **Colaborare în Timp Real** - Sesiuni de studiu live
7. **Rapoarte Analize Avansate** - Rapoarte de performanță detaliate

---

## Depanare

### Insignele Nu Apar
- Verifi consola browserului pentru erori
- Șterge localStorage și repornește
- Verifi că sesiunile de studiu sunt înregistrate

### Forumul Nu Funcţionează
- Verifi că numele de utilizator este setat
- Asigură-te că localStorage este activat
- Vezi [FORUM_SUPABASE_SETUP.md](FORUM_SUPABASE_SETUP.md) pentru integrare bază de date

### Diagramele Nu Se Redă
- Verifi că datele diagramei există în [src/data/diagrams.ts](src/data/diagrams.ts)
- Verifi că coordonatele SVG sunt valide
- Asigură-te că elementele au ID-uri unice

---

## Suport și Întrebări

Pentru probleme sau sugestii, te rog:
1. Consulta această documentație
2. Revizuiește comentariile din codul componentelor
3. Verifi consola browserului pentru mesaje de eroare
4. Referă-te la exemplele de date existente
