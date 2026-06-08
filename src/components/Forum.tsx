import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MessageSquare, Plus, Search, Filter, X, Clock, User } from 'lucide-react';
import { Subject, ForumThread, ForumReply } from '../types';
import { topics } from '../data/topics';
import SEO from './SEO';

interface ForumProps {
  subject?: Subject;
}

// Mock data - in production, this would come from Supabase
const MOCK_THREADS: ForumThread[] = [
  {
    id: 'thread-1',
    topicId: 'mitosis',
    title: 'What\'s the difference between prophase 1 and prophase 2 in meiosis?',
    content: 'I\'m confused about the timing and what happens in each phase...',
    authorId: 'user-1',
    authorName: 'Maria',
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 43200000,
    replyCount: 3,
    viewCount: 24,
  },
  {
    id: 'thread-2',
    topicId: 'bonding',
    title: 'Electronegativity and polar bonds - study tips?',
    content: 'Looking for effective ways to remember electronegativity values for exam...',
    authorId: 'user-2',
    authorName: 'Alex',
    createdAt: Date.now() - 172800000,
    updatedAt: Date.now() - 86400000,
    replyCount: 7,
    viewCount: 45,
  },
];

export default function Forum({ subject }: ForumProps) {
  const [threads, setThreads] = useState<ForumThread[]>(MOCK_THREADS);
  const [selectedThread, setSelectedThread] = useState<ForumThread | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTopic, setFilterTopic] = useState<string>('all');
  const [showNewThread, setShowNewThread] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadTopic, setNewThreadTopic] = useState<string>('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [newReplyContent, setNewReplyContent] = useState('');
  const [userName, setUserName] = useState(() => localStorage.getItem('helix-forum-username') || '');
  const [showUserInput, setShowUserInput] = useState(!userName);

  const relevantTopics = topics.filter(t => !subject || t.subject === subject);

  const filteredThreads = threads.filter(thread => {
    const matchesSearch = thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         thread.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterTopic === 'all' || thread.topicId === filterTopic;
    return matchesSearch && matchesFilter;
  });

  const handleCreateThread = useCallback(() => {
    if (!newThreadTitle.trim() || !newThreadTopic || !newThreadContent.trim() || !userName.trim()) {
      alert('Please fill in all fields and set a username');
      return;
    }

    const thread: ForumThread = {
      id: `thread-${Date.now()}`,
      topicId: newThreadTopic,
      title: newThreadTitle,
      content: newThreadContent,
      authorId: `user-${Date.now()}`,
      authorName: userName,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      replyCount: 0,
      viewCount: 0,
    };

    setThreads(prev => [thread, ...prev]);
    setNewThreadTitle('');
    setNewThreadTopic('');
    setNewThreadContent('');
    setShowNewThread(false);
  }, [newThreadTitle, newThreadTopic, newThreadContent, userName]);

  const handleReply = useCallback(() => {
    if (!selectedThread || !newReplyContent.trim() || !userName.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const reply: ForumReply = {
      id: `reply-${Date.now()}`,
      threadId: selectedThread.id,
      content: newReplyContent,
      authorId: `user-${Date.now()}`,
      authorName: userName,
      createdAt: Date.now(),
    };

    setReplies(prev => [...prev, reply]);
    setThreads(prev =>
      prev.map(t =>
        t.id === selectedThread.id ? { ...t, replyCount: t.replyCount + 1 } : t
      )
    );
    setNewReplyContent('');
  }, [selectedThread, newReplyContent, userName]);

  const handleSetUsername = (name: string) => {
    if (name.trim()) {
      setUserName(name);
      localStorage.setItem('helix-forum-username', name);
      setShowUserInput(false);
    }
  };

  const formatDate = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return 'now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  // Username modal
  if (showUserInput) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-natural-card rounded-2xl p-6 max-w-sm w-full"
        >
          <h2 className="text-xl font-serif font-bold text-natural-green-dark mb-4">Welcome to HELIX Forum</h2>
          <p className="text-sm text-natural-gray mb-4">Choose a username to participate in discussions</p>
          <input
            type="text"
            placeholder="Your name (max 20 chars)"
            maxLength={20}
            value={userName}
            onChange={e => setUserName(e.target.value)}
            className="w-full px-4 py-2 border border-natural-border rounded-lg bg-natural-bg text-natural-green-dark placeholder-natural-gray mb-4"
            onKeyDown={e => e.key === 'Enter' && handleSetUsername(userName)}
          />
          <button
            onClick={() => handleSetUsername(userName)}
            disabled={!userName.trim()}
            className="w-full py-2 bg-natural-green text-white rounded-lg font-semibold hover:bg-natural-green-dark transition-all disabled:opacity-50"
          >
            Continue
          </button>
        </motion.div>
      </div>
    );
  }

  // Thread view
  if (selectedThread) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-natural-card rounded-2xl max-w-2xl w-full p-6 md:p-8 my-4"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6 pb-4 border-b border-natural-border">
            <div>
              <h2 className="text-xl font-bold text-natural-green-dark mb-2">{selectedThread.title}</h2>
              <div className="flex items-center gap-4 text-xs text-natural-gray">
                <span className="flex items-center gap-1"><User className="w-3 h-3" />{selectedThread.authorName}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(selectedThread.createdAt)}</span>
                <span>{selectedThread.replyCount} replies</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedThread(null)}
              className="text-natural-gray hover:text-natural-green-dark transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Original post */}
          <div className="bg-natural-muted rounded-lg p-4 mb-6">
            <p className="text-sm text-natural-gray leading-relaxed">{selectedThread.content}</p>
          </div>

          {/* Replies */}
          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
            {replies.length === 0 ? (
              <p className="text-center text-sm text-natural-gray italic">No replies yet. Be the first!</p>
            ) : (
              replies.map(reply => (
                <motion.div
                  key={reply.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-natural-bg border border-natural-border rounded-lg p-3"
                >
                  <div className="flex items-center gap-2 mb-2 text-xs text-natural-gray">
                    <span className="font-semibold text-natural-green-dark">{reply.authorName}</span>
                    <span>{formatDate(reply.createdAt)}</span>
                  </div>
                  <p className="text-sm text-natural-gray">{reply.content}</p>
                </motion.div>
              ))
            )}
          </div>

          {/* Reply input */}
          <div className="space-y-3">
            <textarea
              value={newReplyContent}
              onChange={e => setNewReplyContent(e.target.value)}
              placeholder="Share your thoughts or answer..."
              className="w-full p-3 text-sm rounded-lg border border-natural-border bg-natural-bg text-natural-green-dark placeholder-natural-gray resize-none"
              rows={3}
            />
            <button
              onClick={handleReply}
              disabled={!newReplyContent.trim()}
              className="w-full py-2 bg-natural-green text-white rounded-lg font-semibold hover:bg-natural-green-dark transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Post Reply
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main forum list
  return (
    <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto min-h-screen">
      <SEO title="Forum - Study Groups" description="Discuss topics with other students" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-natural-green-dark mb-2">Study Forum</h1>
            <p className="text-natural-gray">Discuss topics, ask questions, and learn together</p>
          </div>
          <button
            onClick={() => setShowNewThread(true)}
            className="mt-2 flex items-center gap-2 px-4 py-2 bg-natural-green text-white rounded-lg font-semibold hover:bg-natural-green-dark transition-all whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            New Thread
          </button>
        </div>

        {/* User info */}
        <div className="text-xs text-natural-gray bg-natural-muted p-2 rounded flex items-center justify-between">
          <span>Logged in as: <span className="font-semibold text-natural-green-dark">{userName}</span></span>
          <button
            onClick={() => setShowUserInput(true)}
            className="text-natural-green hover:underline"
          >
            Change
          </button>
        </div>

        {/* Search and filter */}
        <div className="flex gap-3 flex-col md:flex-row">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-natural-gray" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-natural-border bg-natural-bg text-natural-green-dark placeholder-natural-gray"
            />
          </div>
          <select
            value={filterTopic}
            onChange={e => setFilterTopic(e.target.value)}
            className="px-4 py-2 rounded-lg border border-natural-border bg-natural-bg text-natural-green-dark"
          >
            <option value="all">All Topics</option>
            {relevantTopics.map(topic => (
              <option key={topic.id} value={topic.id}>
                {topic.title}
              </option>
            ))}
          </select>
        </div>

        {/* New thread modal */}
        <AnimatePresence>
          {showNewThread && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-natural-card rounded-2xl p-6 max-w-xl w-full"
              >
                <h2 className="text-xl font-serif font-bold text-natural-green-dark mb-4">Start New Discussion</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Discussion title"
                    value={newThreadTitle}
                    onChange={e => setNewThreadTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-natural-border bg-natural-bg text-natural-green-dark placeholder-natural-gray"
                  />
                  <select
                    value={newThreadTopic}
                    onChange={e => setNewThreadTopic(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-natural-border bg-natural-bg text-natural-green-dark"
                  >
                    <option value="">Select a topic</option>
                    {relevantTopics.map(topic => (
                      <option key={topic.id} value={topic.id}>
                        {topic.title}
                      </option>
                    ))}
                  </select>
                  <textarea
                    placeholder="What would you like to discuss?"
                    value={newThreadContent}
                    onChange={e => setNewThreadContent(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-natural-border bg-natural-bg text-natural-green-dark placeholder-natural-gray resize-none"
                    rows={4}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleCreateThread}
                      className="flex-1 py-2 bg-natural-green text-white rounded-lg font-semibold hover:bg-natural-green-dark transition-all"
                    >
                      Post
                    </button>
                    <button
                      onClick={() => setShowNewThread(false)}
                      className="flex-1 py-2 bg-natural-muted text-natural-gray rounded-lg font-semibold hover:bg-natural-border transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Threads list */}
        <div className="space-y-3">
          {filteredThreads.length === 0 ? (
            <div className="text-center py-12 text-natural-gray">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No discussions found. Start one to get the conversation going!</p>
            </div>
          ) : (
            filteredThreads.map(thread => (
              <motion.button
                key={thread.id}
                onClick={() => {
                  setSelectedThread(thread);
                  setReplies([]); // In production, fetch replies for this thread
                  setNewReplyContent('');
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-left p-4 bg-natural-card rounded-lg border border-natural-border hover:border-natural-green hover:bg-natural-green/5 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-natural-green-dark mb-1 line-clamp-2">{thread.title}</h3>
                    <p className="text-sm text-natural-gray line-clamp-2 mb-3">{thread.content}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-natural-gray">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{thread.authorName}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(thread.createdAt)}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{thread.replyCount} replies</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-semibold text-natural-green">{thread.replyCount}</div>
                    <div className="text-xs text-natural-gray">replies</div>
                  </div>
                </div>
              </motion.button>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
