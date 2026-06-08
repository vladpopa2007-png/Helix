import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, FlaskConical, ChevronRight } from 'lucide-react';
import { topics } from '../data/topics';
import { Topic } from '../types';
import TopicGridItem from './TopicGridItem';
import SEO from './SEO';
import BackupRestore from './BackupRestore';

interface HomeProps {
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  completed: string[];
  onRestore: (data: { bookmarks: string[]; completed: string[] }) => void;
}

export default function Home({ bookmarks, onToggleBookmark, completed, onRestore }: HomeProps) {
  const totalTopics = topics.length;
  const completedCount = completed.length;
  const overallProgress = useMemo(() => 
    totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0,
    [completedCount, totalTopics]
  );

  const bioCount = useMemo(() => topics.filter(t => t.subject === 'biologie').length, []);
  const chemCount = useMemo(() => topics.filter(t => t.subject === 'chimie').length, []);

  const completedSet = useMemo(() => new Set(completed), [completed]);
  const bookmarkSet = useMemo(() => new Set(bookmarks), [bookmarks]);

  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto natural-grid min-h-screen">
      <SEO 
        title="Acasă" 
        description="Platforma ta de pregătire pentru admiterea la medicină. Fișe de biologie și chimie, rezolvări și simulatoare interactive."
      />
      
      {/* ... Hero Section ... */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-natural-green/10 text-natural-green text-xs font-bold tracking-widest uppercase mb-4">
          Performanță în Educație Medicală
        </span>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-natural-green-dark mb-6 leading-tight">
          Pregătește-te pentru <br />
          <span className="text-gradient italic">Admitere</span>
        </h1>
        <p className="max-w-2xl mx-auto text-natural-gray text-lg md:text-xl mb-12">
          Fișe structurate și resurse actualizate. Tot ce ai nevoie pentru a intra la buget la Medicină.
        </p>
        
        <BackupRestore bookmarks={bookmarks} completed={completed} onRestore={onRestore} />
        
        {completedCount > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 max-w-xs mx-auto p-4 bg-natural-card rounded-2xl border border-natural-border shadow-sm flex items-center gap-4"
          >
             <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#375531" strokeWidth="4" strokeDasharray="125.6" strokeDashoffset={125.6 * (1 - overallProgress / 100)} strokeLinecap="round" className="transition-all duration-1000" />
                </svg>
                <span className="absolute text-[10px] font-bold text-natural-green-dark">{Math.round(overallProgress)}%</span>
             </div>
             <div className="text-left">
                <p className="text-sm font-bold text-natural-green-dark">Progres General</p>
                <p className="text-xs text-natural-gray">{completedCount} din {totalTopics} capitole parcurse</p>
             </div>
          </motion.div>
        )}
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <SubjectCard 
          title="Biologie" 
          description="Celula, anatomie, fiziologie și genetică. Totul explicat vizual."
          icon={<BookOpen className="w-8 h-8" />}
          path="/biologie"
          count={bioCount}
          color="bg-natural-green/10 text-natural-green"
        />
        <SubjectCard 
          title="Chimie" 
          description="Chimie organică și generală. De la legături la reacții complexe."
          icon={<FlaskConical className="w-8 h-8" />}
          path="/chimie"
          count={chemCount}
          color="bg-natural-earth/10 text-natural-earth"
        />
      </div>

      <section>
        <div className="flex items-center justify-between mb-8 pb-2 border-b border-natural-green/10">
          <h2 className="text-2xl font-serif font-bold text-natural-green-dark">Fișe Recente</h2>
          <Link to="/biologie" className="text-sm font-medium text-natural-green hover:underline flex items-center">
            Vezi toate <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.slice(0, 3).map((topic, i) => (
            <TopicGridItem 
              key={topic.id} 
              topic={topic} 
              index={i} 
              isBookmarked={bookmarkSet.has(topic.id)}
              onToggleBookmark={onToggleBookmark}
              isCompleted={completedSet.has(topic.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function SubjectCard({ title, description, icon, path, count, color }: any) {
  return (
    <Link to={path}>
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-natural-card p-8 rounded-[32px] shadow-sm border border-natural-border/50 flex flex-col justify-between h-full group hover:shadow-xl hover:shadow-natural-green/5 transition-all text-left"
      >
        <div>
          <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
          <h3 className="text-2xl font-serif font-bold mb-4 text-natural-green-dark">{title}</h3>
          <p className="text-natural-gray leading-relaxed mb-6">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-natural-green/60">{count} Capitole</span>
          <div className="w-10 h-10 rounded-full bg-natural-muted flex items-center justify-center group-hover:bg-natural-green group-hover:text-white transition-colors">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
