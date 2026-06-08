import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'motion/react';
import { Coffee } from 'lucide-react';
import { topics } from './data/topics';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Admission from './components/Admission';
import Tools from './components/Tools';
import Resources from './components/Resources';
import SubjectPage from './components/SubjectPage';
import BookmarksPage from './components/BookmarksPage';
import TopicDetailWrapper from './components/TopicDetail';
import NotFound from './components/NotFound';
import PracticeExam from './components/PracticeExam';
import Forum from './components/Forum';
import StudyStats from './components/StudyStats';
import InteractiveDiagrams from './components/InteractiveDiagrams';
import { useBadges } from './hooks/useBadges';

// --- Main App ---

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('helix-theme');
    if (saved) return saved as 'light' | 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('helix-bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const [completed, setCompleted] = useState<string[]>(() => {
    const saved = localStorage.getItem('helix-completed');
    return saved ? JSON.parse(saved) : [];
  });

  // Badge system integration
  const { stats, addStudySession, recordQuizScore } = useBadges(topics.length);

  useEffect(() => {
    localStorage.setItem('helix-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('helix-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('helix-completed', JSON.stringify(completed));
  }, [completed]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  }, []);

  const toggleCompleted = useCallback((id: string) => {
    setCompleted(prev => {
      const newCompleted = prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id];
      // Track completion for badge system
      if (!prev.includes(id)) {
        const topic = topics.find(t => t.id === id);
        if (topic) {
          addStudySession(id, topic.subject, 300); // 5 minutes minimum for completion
        }
      }
      return newCompleted;
    });
  }, [addStudySession]);

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-natural-bg selection:bg-natural-green/30">
          <Navbar bookmarkCount={bookmarks.length} theme={theme} onToggleTheme={toggleTheme} />
          
          <main>
            <Routes>
              <Route path="/" element={
                <Home 
                  bookmarks={bookmarks} 
                  onToggleBookmark={toggleBookmark} 
                  completed={completed} 
                  onRestore={(data) => {
                    setBookmarks(data.bookmarks);
                    setCompleted(data.completed);
                  }}
                />
              } />
              <Route path="/admitere" element={<Admission />} />
              <Route path="/biologie" element={<SubjectPage subject="biologie" bookmarks={bookmarks} onToggleBookmark={toggleBookmark} completed={completed} />} />
              <Route path="/chimie" element={<SubjectPage subject="chimie" bookmarks={bookmarks} onToggleBookmark={toggleBookmark} completed={completed} />} />
              <Route path="/materiale" element={<Resources />} />
              <Route path="/salvate" element={<BookmarksPage bookmarks={bookmarks} onToggleBookmark={toggleBookmark} completed={completed} />} />
              <Route path="/instrumente" element={<Tools />} />
              <Route path="/topic/:id" element={<TopicDetailWrapper bookmarks={bookmarks} onToggleBookmark={toggleBookmark} completed={completed} onToggleCompleted={toggleCompleted} />} />
              <Route path="/examen-practic" element={<PracticeExam onComplete={(score, total, timeSpent) => recordQuizScore('exam', (score / total) * 100)} />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/realizari" element={<StudyStats />} />
              <Route path="/diagrame" element={<InteractiveDiagrams />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <footer className="bg-natural-muted border-t border-natural-border/50 py-12 px-4 mt-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center space-x-2">
                  <img src="/d-logo.png" alt="HELIX.med" className="w-10 h-10 rounded" />
                  <span className="font-serif font-bold text-natural-green-dark">HELIX.med</span>
                </div>
                <p className="text-xs text-natural-gray italic">© 2026 HELIX.med. Creat pentru viitorii medici.</p>
              </div>

              <motion.a 
                href="https://buymeacoffee.com/helixmd"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 bg-[#FFDD00] text-black px-6 py-3 rounded-2xl font-bold shadow-sm hover:shadow-md transition-all text-sm"
              >
                <Coffee className="w-5 h-5" />
                <span>Susține proiectul</span>
              </motion.a>
            </div>
          </footer>
        </div>
      </Router>
    </ErrorBoundary>
  );
}
