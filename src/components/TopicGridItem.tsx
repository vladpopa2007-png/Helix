import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Bookmark, BookmarkCheck, Clock, CheckCircle2 } from 'lucide-react';
import { Topic } from '../types';

interface TopicGridItemProps {
  topic: Topic;
  index: number;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  isCompleted: boolean;
}

export default function TopicGridItem({ 
  topic, 
  index, 
  isBookmarked, 
  onToggleBookmark, 
  isCompleted 
}: TopicGridItemProps) {
  return (
    <div className="relative group h-full">
      <button 
        onClick={(e) => {
          e.preventDefault();
          onToggleBookmark(topic.id);
        }}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all ${isBookmarked ? 'bg-natural-green text-white shadow-lg' : 'bg-natural-card/80 text-natural-gray hover:bg-natural-card hover:text-natural-green shadow-sm'}`}
      >
        {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
      </button>
      <Link to={`/topic/${topic.id}`} className="block h-full">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-natural-card p-6 rounded-2xl border transition-all h-full text-left flex flex-col ${
            isCompleted 
              ? 'border-natural-green/40 shadow-sm bg-natural-green/[0.02]' 
              : 'border-natural-border/50 hover:border-natural-green/20 hover:shadow-md'
          }`}
        >
          <div className="flex gap-2 mb-4 items-center">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
              isCompleted ? 'bg-natural-green/20 text-natural-green' : 'bg-natural-green/5 text-natural-green'
            }`}>
              {topic.category}
            </span>
            {topic.importance === 'high' && (
              <span className="px-2 py-0.5 rounded bg-natural-earth/10 text-[10px] font-bold text-natural-earth uppercase">
                Examen
              </span>
            )}
            {isCompleted && (
              <span className="ml-auto flex items-center text-[10px] font-bold text-natural-green uppercase">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Parcurs
              </span>
            )}
          </div>
          <h4 className={`text-lg font-bold mb-2 transition-colors ${
            isCompleted ? 'text-natural-green' : 'text-natural-green-dark group-hover:text-natural-green'
          }`}>
            {topic.title}
          </h4>
          <p className="text-natural-gray text-sm line-clamp-2 mb-4 flex-grow">
            {topic.excerpt}
          </p>
          <div className="flex items-center text-xs text-natural-gray space-x-4 mt-auto pt-4 border-t border-natural-border/20">
            <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {topic.readTime}</span>
            {isCompleted && <span className="text-[10px] italic text-natural-green/60">Finalizat</span>}
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
