import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { resources, Resource } from '../data/resources';
import { 
  FileText, 
  Video, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  CheckSquare, 
  Download,
  Search,
  Filter,
  X,
  Layers
} from 'lucide-react';

export default function Resources() {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredResources = resources.filter(res => {
    const matchesFilter = filter === 'all' || res.category === filter;
    const matchesSearch = res.title.toLowerCase().includes(search.toLowerCase()) || 
                          res.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSuggest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    
    // Simulate API call
    console.log("Suggestion submitted:", suggestion);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setSuggestion('');
    }, 2000);
  };

  const getIcon = (type: Resource['type'], category: Resource['category']) => {
    if (category === 'schițe') return <Layers className="w-5 h-5 text-natural-green" />;
    
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-natural-earth" />;
      case 'video': return <Video className="w-5 h-5 text-natural-green" />;
      case 'image': return <ImageIcon className="w-5 h-5 text-natural-green-dark" />;
      case 'link': return <LinkIcon className="w-5 h-5 text-natural-gray" />;
      case 'checklist': return <CheckSquare className="w-5 h-5 text-natural-green" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const categories = [
    { id: 'all', name: 'Toate Resursele' },
    { id: 'schițe', name: 'Schițe Digitale' },
    { id: 'biologie', name: 'Biologie' },
    { id: 'chimie', name: 'Chimie' },
    { id: 'administrativ', name: 'Administrativ' },
    { id: 'sfaturi', name: 'Sfaturi & Tehnici' },
  ];

  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-natural-green-dark">Centrul de Materiale</h1>
        <p className="text-natural-gray max-w-2xl mx-auto text-lg leading-relaxed">
          O bibliotecă centralizată de resurse, hărți mentale, simulări și ghiduri pentru a-ți maximiza timpul de studiu.
        </p>
      </header>

      {/* Search and Filters */}
      <section className="flex flex-col md:flex-row gap-6 items-center justify-between bg-natural-card p-6 rounded-[32px] border border-natural-border shadow-sm">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-natural-gray/50" />
          <input 
            type="text" 
            placeholder="Caută materiale (ex: grilă, sistem nervos, dosar)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-natural-muted border-none rounded-2xl focus:ring-2 focus:ring-natural-green transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${filter === cat.id ? 'bg-natural-green text-white shadow-md' : 'bg-natural-muted text-natural-gray hover:bg-natural-border'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Resource Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredResources.map((res) => (
            <motion.div
              key={res.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group bg-natural-card rounded-[32px] border border-natural-border overflow-hidden flex flex-col hover:shadow-xl transition-all"
            >
              {res.thumbnailUrl ? (
                <div className="aspect-video relative overflow-hidden">
                   <img 
                    src={res.thumbnailUrl} 
                    alt={res.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    referrerPolicy="no-referrer"
                   />
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                   <div className="absolute top-4 left-4 p-2 bg-natural-card/90 backdrop-blur rounded-xl shadow-sm text-natural-green">
                      {getIcon(res.type, res.category)}
                   </div>
                </div>
              ) : (
                <div className="aspect-video bg-natural-muted flex items-center justify-center">
                   <div className="w-16 h-16 bg-natural-card rounded-3xl flex items-center justify-center shadow-sm text-natural-green">
                      {getIcon(res.type, res.category)}
                   </div>
                </div>
              )}
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold text-natural-green uppercase tracking-widest px-2 py-1 bg-natural-green/10 rounded-lg">
                    {res.category}
                  </span>
                  <span className="text-[10px] font-bold text-natural-gray uppercase tracking-widest">
                    {res.type}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold text-natural-green-dark mb-4 leading-tight group-hover:text-natural-green transition-colors">
                  {res.title}
                </h3>
                <p className="text-sm text-natural-gray leading-relaxed mb-8 flex-1">
                  {res.description}
                </p>
                <div className="pt-6 border-t border-natural-border flex items-center justify-between">
                   <button className="text-sm font-bold text-natural-green-dark hover:text-natural-green flex items-center gap-2 transition-colors">
                      {res.type === 'pdf' ? (
                        <>
                          <Download className="w-4 h-4" /> Descarcă PDF
                        </>
                      ) : res.type === 'video' ? (
                        <>
                          <Video className="w-4 h-4" /> Vezi Video
                        </>
                      ) : (
                        <>
                          Vezi Material <CheckSquare className="w-4 h-4 ml-1" />
                        </>
                      )}
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-20 bg-natural-muted rounded-[40px] border border-dashed border-natural-border">
           <Filter className="w-12 h-12 text-natural-gray/30 mx-auto mb-4" />
           <p className="text-natural-gray">Nicio resursă găsită pentru căutarea ta. Încearcă alți termeni sau categorii.</p>
        </div>
      )}

      {/* Suggestion Card */}
      <section className="bg-natural-earth/5 border border-natural-earth/10 rounded-[40px] p-10 flex flex-col md:flex-row items-center gap-10">
         <div className="w-20 h-20 bg-natural-earth text-white rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-natural-earth/20">
            <LinkIcon className="w-10 h-10" />
         </div>
         <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold text-natural-green-dark mb-2">Lipsește un material?</h3>
            <p className="text-natural-gray leading-relaxed">
              Dacă ai nevoie de o schemă anume sau de un model de subiect pe care nu-l găsești aici, contactează-ne pentru a-l adăuga.
            </p>
         </div>
         <button 
           onClick={() => setIsModalOpen(true)}
           className="bg-natural-green-dark text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-all shadow-md shrink-0"
         >
            Sugerează Resursă
         </button>
      </section>

      {/* Suggestion Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitted && setIsModalOpen(false)}
              className="absolute inset-0 bg-natural-green-dark/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-natural-card w-full max-w-lg rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-natural-green" />
              
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-natural-muted rounded-full transition-colors text-natural-gray"
              >
                <X className="w-5 h-5" />
              </button>

              {isSubmitted ? (
                <div className="text-center py-10 flex flex-col items-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-natural-green text-white rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckSquare className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-2xl font-serif font-bold text-natural-green-dark mb-2">Mulțumim!</h3>
                  <p className="text-natural-gray italic">Sugestia ta a fost trimisă echipei noastre.</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="text-3xl font-serif font-bold text-natural-green-dark mb-3">Sugerează o resursă</h3>
                    <p className="text-natural-gray">Ajută-ți colegii adăugând materiale care lipsesc din biblioteca noastră.</p>
                  </div>

                  <form onSubmit={handleSuggest} className="space-y-6">
                    <div>
                      <label className="block text-xs font-black text-natural-gray uppercase tracking-widest mb-3 italic">Ce material lipsește?</label>
                      <textarea 
                        rows={4}
                        value={suggestion}
                        onChange={(e) => setSuggestion(e.target.value)}
                        placeholder="Ex: Harta mentală pentru Sistemul Endocrin, sau teste grilă din 2023..."
                        className="w-full p-6 bg-natural-muted border-none rounded-3xl focus:ring-2 focus:ring-natural-green transition-all resize-none text-natural-green-dark font-medium"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={!suggestion.trim()}
                      className="w-full bg-natural-green text-white py-5 rounded-3xl font-bold hover:bg-natural-green-dark transition-all shadow-lg shadow-natural-green/20 disabled:opacity-50 disabled:shadow-none"
                    >
                      Trimite Sugestia
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
