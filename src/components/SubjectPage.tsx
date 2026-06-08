import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, BookmarkCheck, Clock, Award, ChevronRight, Inbox } from 'lucide-react';
import { Topic, Subject } from '../types';
import { topics } from '../data/topics';
import Breadcrumbs from './Breadcrumbs';
import SEO from './SEO';

interface SubjectPageProps {
  subject: Subject;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  completed: string[];
}

export default function SubjectPage({ 
  subject, 
  bookmarks, 
  onToggleBookmark, 
  completed 
}: SubjectPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Toate');

  const subjectTopics = useMemo(() => 
    topics.filter(t => t.subject === subject),
    [subject]
  );

  const categories = useMemo(() => {
    const cats = new Set(subjectTopics.map(t => t.category));
    return ['Toate', ...Array.from(cats)].sort();
  }, [subjectTopics]);

  const filteredTopics = useMemo(() => {
    if (selectedCategory === 'Toate') return subjectTopics;
    return subjectTopics.filter(t => t.category === selectedCategory);
  }, [subjectTopics, selectedCategory]);
  
  const completedSet = useMemo(() => new Set(completed), [completed]);
  const bookmarkSet = useMemo(() => new Set(bookmarks), [bookmarks]);

  const subjectCompleted = useMemo(() => 
    subjectTopics.filter(t => completedSet.has(t.id)).length,
    [subjectTopics, completedSet]
  );

  const progressPercent = useMemo(() => 
    subjectTopics.length > 0 ? (subjectCompleted / subjectTopics.length) * 100 : 0,
    [subjectCompleted, subjectTopics.length]
  );
  
  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
      <SEO 
        title={subject.charAt(0).toUpperCase() + subject.slice(1)} 
        description={`Pregătește-te pentru proba de ${subject} cu fișe structurate, diagrame și teste grilă interactive.`}
      />
      <div className="mb-12">
        <Breadcrumbs items={[{ name: subject }]} />
        <h1 className="text-4xl md:text-5xl font-serif font-bold capitalize text-natural-green-dark">{subject}</h1>
        <p className="text-natural-gray mt-2">Explorează toate capitolele și resursele disponibile.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1 border-r border-natural-border/50 pr-6 space-y-6 hidden md:block">
          <div>
            <h5 className="text-[10px] uppercase font-bold text-natural-green tracking-widest mb-4 font-mono">Categorii</h5>
            <ul className="space-y-1">
              {categories.map(cat => (
                <li 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-sm px-3 py-2 rounded-xl cursor-pointer transition-all ${
                    selectedCategory === cat 
                      ? 'bg-natural-green/10 text-natural-green font-bold' 
                      : 'text-natural-gray hover:text-natural-green hover:bg-natural-muted'
                  }`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-natural-green/5 p-5 rounded-[24px] border border-natural-green/10">
             <h5 className="text-[10px] uppercase font-bold text-natural-green tracking-widest mb-3 font-mono">Progresul Tău</h5>
             <div className="w-full bg-natural-muted h-2.5 rounded-full overflow-hidden mb-3 border border-natural-border/30">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="bg-natural-green h-full shadow-[0_0_8px_rgba(34,197,94,0.4)]" 
                />
             </div>
             <div className="flex justify-between items-end">
               <span className="text-[10px] font-bold text-natural-gray italic">
                 {subjectCompleted} / {subjectTopics.length} capitole
               </span>
               <span className="text-sm font-black text-natural-green font-mono">
                 {Math.round(progressPercent)}%
               </span>
             </div>
          </div>
        </div>

        <div className="md:col-span-3 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic, i) => {
                const isCompleted = completedSet.has(topic.id);
                const isBookmarked = bookmarkSet.has(topic.id);
                
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={topic.id} 
                    className="relative"
                  >
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        onToggleBookmark(topic.id);
                      }}
                      className={`absolute top-6 right-6 md:top-1/2 md:-right-12 md:-translate-y-1/2 z-20 p-2 rounded-full transition-all ${
                        isBookmarked 
                          ? 'text-natural-green bg-natural-green/5 md:bg-transparent' 
                          : 'text-natural-gray hover:text-natural-green'
                      }`}
                      aria-label="Bookmark"
                    >
                      {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                    </button>
                    <Link to={`/topic/${topic.id}`} className="block">
                      <motion.div 
                        whileHover={{ y: -4 }}
                        className="group"
                      >
                        <div className={`flex flex-col md:flex-row md:items-center justify-between p-7 rounded-[28px] border transition-all text-left ${
                          isCompleted 
                            ? 'border-natural-green/30 shadow-sm shadow-natural-green/5 bg-natural-green/[0.03] hover:shadow-lg hover:shadow-natural-green/10' 
                            : 'bg-natural-card border-natural-border/50 hover:border-natural-green/30 shadow-sm hover:shadow-xl'
                        }`}>
                            <div className="flex-1 flex items-center gap-5">
                              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
                                isCompleted 
                                  ? 'bg-natural-green border-natural-green text-white shadow-lg shadow-natural-green/20' 
                                  : 'bg-natural-muted border-natural-border text-natural-gray group-hover:border-natural-green group-hover:text-natural-green group-hover:bg-natural-card'
                              }`}>
                                 {isCompleted ? <BookmarkCheck className="w-5 h-5" /> : <span className="text-xs font-bold font-mono">0{i + 1}</span>}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[10px] font-bold text-natural-gray uppercase tracking-widest italic">{topic.category}</span>
                                  {isCompleted && (
                                    <span className="text-[9px] font-black text-natural-green uppercase px-2 py-0.5 bg-natural-green/10 rounded-md">
                                      Parcurs
                                    </span>
                                  )}
                                </div>
                                <h3 className={`text-xl font-bold font-serif transition-colors ${
                                  isCompleted ? 'text-natural-green' : 'text-natural-green-dark group-hover:text-natural-green'
                                }`}>
                                  {topic.title}
                                </h3>
                              </div>
                            </div>
                            <div className="mt-5 md:mt-0 flex items-center space-x-8 text-xs text-natural-gray font-medium">
                              <span className="flex items-center"><Clock className="w-4 h-4 mr-2 opacity-50" /> {topic.readTime}</span>
                              {topic.importance === 'high' && (
                                <span className="flex items-center text-natural-earth font-bold"><Award className="w-4 h-4 mr-2" /> Esențial</span>
                              )}
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                isCompleted ? 'bg-natural-green/20 text-natural-green' : 'bg-natural-green/10 text-natural-green/40 group-hover:bg-natural-green group-hover:text-white'
                              }`}>
                                <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5`} />
                              </div>
                            </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })
            ) : (
              <div className="py-20 text-center space-y-4 bg-natural-muted/30 rounded-[32px] border border-dashed border-natural-border">
                <div className="w-16 h-16 bg-natural-muted rounded-full flex items-center justify-center text-natural-gray mx-auto">
                  <Inbox className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-natural-green-dark">Niciun capitol găsit</h3>
                <p className="text-sm text-natural-gray max-w-xs mx-auto">Nu am găsit niciun capitol în categoria "{selectedCategory}".</p>
                <button 
                  onClick={() => setSelectedCategory('Toate')}
                  className="text-sm font-bold text-natural-green hover:underline"
                >
                  Vezi toate capitolele
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
