import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Bookmark, BookmarkCheck, Clock, CheckCircle2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { topics } from '../data/topics';
import Breadcrumbs from './Breadcrumbs';
import Quiz from './Quiz';
import SEO from './SEO';

interface TopicDetailProps {
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  isCompleted: boolean;
  onToggleCompleted: (id: string) => void;
}

export function TopicDetail({ 
  isBookmarked, 
  onToggleBookmark, 
  isCompleted, 
  onToggleCompleted 
}: TopicDetailProps) {
  const { pathname } = useLocation();
  const id = pathname.split('/').pop();
  const topic = topics.find(t => t.id === id);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? (window.scrollY / height) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const processedContent = useMemo(() => {
    if (!topic) return '';
    
    const otherTopics = topics
      .filter(t => t.id !== topic.id)
      .sort((a, b) => b.title.length - a.title.length);

    let content = topic.content;
    otherTopics.forEach(t => {
      const escapedTitle = t.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(?<!\\[)${escapedTitle}(?!\\]|\\))`, 'g');
      content = content.replace(regex, `[${t.title}](/topic/${t.id})`);
    });
    return content;
  }, [topic]);

  if (!topic) return <div className="pt-32 text-center">Capitol negăsit.</div>;

  return (
    <div className="pt-20">
      <SEO 
        title={topic.title} 
        description={topic.excerpt}
      />
      <div className="fixed top-16 left-0 h-1 bg-natural-green transition-all z-50" style={{ width: `${scrollProgress}%` }} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12 border-b border-natural-border/50 pb-8 text-left relative">
          <div className="absolute top-0 right-0 flex gap-2">
            <button 
              onClick={() => onToggleCompleted(topic.id)}
              className={`p-3 rounded-2xl transition-all flex items-center gap-2 text-sm font-bold ${isCompleted ? 'bg-natural-green text-white shadow-lg' : 'bg-natural-muted text-natural-gray hover:bg-natural-border'}`}
            >
              <BookmarkCheck className="w-5 h-5" /> {isCompleted ? 'Parcurs' : 'Marchează ca parcurs'}
            </button>
            <button 
              onClick={() => onToggleBookmark(topic.id)}
              className={`p-3 rounded-2xl transition-all flex items-center gap-2 text-sm font-bold ${isBookmarked ? 'bg-natural-green text-white shadow-lg' : 'bg-natural-muted text-natural-gray hover:bg-natural-border'}`}
            >
              {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>
          </div>
          <Breadcrumbs 
            items={[
              { name: topic.subject, path: `/${topic.subject}` },
              { name: topic.title }
            ]} 
          />
          <div className="flex gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-natural-green/10 text-[10px] font-bold text-natural-green uppercase tracking-widest">
              {topic.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-natural-muted text-[10px] font-bold text-natural-gray uppercase tracking-widest flex items-center border border-natural-border/30">
              <Clock className="w-3 h-3 mr-1" /> {topic.readTime} lectură
            </span>
            {isCompleted && (
              <span className="px-3 py-1 rounded-full bg-natural-green text-[10px] font-bold text-white uppercase tracking-widest flex items-center">
                 Capitol Finalizat
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-natural-green-dark mb-6 leading-tight">
            {topic.title}
          </h1>
          <p className="text-xl text-natural-gray italic">
            "{topic.excerpt}"
          </p>
        </header>

        <article className="prose prose-medical max-w-none text-left mb-20">
           <Markdown
             components={{
               a: ({ node, ...props }) => {
                 const isInternal = props.href?.startsWith('/');
                 if (isInternal) {
                   return <Link to={props.href || '/'} className="text-natural-green underline font-bold hover:text-natural-green-dark transition-colors" {...props as any} />;
                 }
                 return <a className="text-natural-green underline hover:text-natural-green-dark transition-colors" {...props as any} />;
               }
             }}
           >
             {processedContent}
           </Markdown>
        </article>

        {topic.questions && topic.questions.length > 0 && (
          <section className="mt-20 pt-16 border-t border-natural-border/50">
             <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-10 bg-natural-green/10 rounded-xl flex items-center justify-center text-natural-green">
                 <CheckCircle2 className="w-6 h-6" />
               </div>
               <h2 className="text-3xl font-serif font-bold text-natural-green-dark">Exersează Grila</h2>
             </div>
             <Quiz questions={topic.questions} topicTitle={topic.title} />
          </section>
        )}
      </div>
    </div>
  );
}

export default function TopicDetailWrapper({ 
  bookmarks, 
  onToggleBookmark, 
  completed, 
  onToggleCompleted 
}: { 
  bookmarks: string[], 
  onToggleBookmark: (id: string) => void, 
  completed: string[], 
  onToggleCompleted: (id: string) => void 
}) {
  const { pathname } = useLocation();
  const id = pathname.split('/').pop() || "";
  return (
    <TopicDetail 
      isBookmarked={bookmarks.includes(id)} 
      onToggleBookmark={onToggleBookmark} 
      isCompleted={completed.includes(id)} 
      onToggleCompleted={onToggleCompleted} 
    />
  );
}
