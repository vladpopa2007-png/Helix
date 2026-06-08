import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { topics } from '../data/topics';
import TopicGridItem from './TopicGridItem';
import SEO from './SEO';

interface BookmarksPageProps {
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  completed: string[];
}

export default function BookmarksPage({ bookmarks, onToggleBookmark, completed }: BookmarksPageProps) {
  const bookmarkSet = useMemo(() => new Set(bookmarks), [bookmarks]);
  const completedSet = useMemo(() => new Set(completed), [completed]);

  const bookmarkedTopics = useMemo(() => 
    topics.filter(t => bookmarkSet.has(t.id)),
    [bookmarkSet]
  );

  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto min-h-screen">
      <SEO 
        title="Salvate" 
        description="Capitolele tale salvate pentru admiterea la medicină. Revizuiește rapid materia salvată."
      />
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-natural-green-dark">Subiecte Salvate</h1>
        <p className="text-natural-gray mt-2">Toate fișele și notele pe care le-ai marcat pentru revizuire ulterioară.</p>
      </div>

      {bookmarkedTopics.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
           <div className="w-20 h-20 bg-natural-muted rounded-full flex items-center justify-center text-natural-gray">
              <Bookmark className="w-10 h-10" />
           </div>
           <h3 className="text-xl font-bold text-natural-green-dark">Nu ai salvat încă nimic.</h3>
           <p className="text-natural-gray max-w-xs">Explorează capitolele de Biologie și Chimie și apasă pe iconița de semnal de carte pentru a le salva aici.</p>
           <Link to="/" className="text-natural-green font-bold hover:underline">Înapoi la Acasă</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedTopics.map((topic, i) => (
            <TopicGridItem 
              key={topic.id} 
              topic={topic} 
              index={i} 
              isBookmarked={true} 
              onToggleBookmark={onToggleBookmark} 
              isCompleted={completedSet.has(topic.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
