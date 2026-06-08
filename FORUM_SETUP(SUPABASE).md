# Ghid Integrare Forum - Configurare Supabase

Acest ghid explică cum să conectezi componenta Forum la o bază de date Supabase reală pentru stocare persistentă a datelor.

## 1. Crează Tabelele Supabase

În tabloul de bord al proiectului Supabase, creează următoarele tabele:

### Tabel: `forum_threads`
```sql
CREATE TABLE forum_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id VARCHAR(255) NOT NULL,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  author_id VARCHAR(255) NOT NULL,
  author_name VARCHAR(50) NOT NULL,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,
  reply_count INT DEFAULT 0,
  view_count INT DEFAULT 0,
  FOREIGN KEY (topic_id) REFERENCES topics(id)
);

CREATE INDEX idx_threads_topic_id ON forum_threads(topic_id);
CREATE INDEX idx_threads_created_at ON forum_threads(created_at DESC);
```

### Tabel: `forum_replies`
```sql
CREATE TABLE forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL,
  content TEXT NOT NULL,
  author_id VARCHAR(255) NOT NULL,
  author_name VARCHAR(50) NOT NULL,
  created_at BIGINT NOT NULL,
  is_answer BOOLEAN DEFAULT false,
  FOREIGN KEY (thread_id) REFERENCES forum_threads(id) ON DELETE CASCADE
);

CREATE INDEX idx_replies_thread_id ON forum_replies(thread_id);
CREATE INDEX idx_replies_created_at ON forum_replies(created_at);
```

## 2. Setează Politicile de Securitate la Nivel de Rând (RLS)

Pentru `forum_threads`:
```sql
-- Activează RLS
ALTER TABLE forum_threads ENABLE ROW LEVEL SECURITY;

-- Permite oricui să citească
CREATE POLICY "Permite acces citire" ON forum_threads
  FOR SELECT USING (true);

-- Permite oricui să creeze (în producție, necesită autentificare)
CREATE POLICY "Permite inserare" ON forum_threads
  FOR INSERT WITH CHECK (true);

-- Permite utilizatorilor să-și actualizeze propriile fire
CREATE POLICY "Permite actualizare propie" ON forum_threads
  FOR UPDATE USING (author_id = current_user_id()) WITH CHECK (author_id = current_user_id());
```

Pentru `forum_replies`:
```sql
-- Activează RLS
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;

-- Permite oricui să citească
CREATE POLICY "Permite acces citire" ON forum_replies
  FOR SELECT USING (true);

-- Permite oricui să creeze
CREATE POLICY "Permite inserare" ON forum_replies
  FOR INSERT WITH CHECK (true);

-- Permite utilizatorilor să-și actualizeze propriile răspunsuri
CREATE POLICY "Permite actualizare propie" ON forum_replies
  FOR UPDATE USING (author_id = current_user_id()) WITH CHECK (author_id = current_user_id());
```

## 3. Creează un Hook de Serviciu Supabase

Creează un fișier nou `src/hooks/useSupabaseForum.ts`:

```typescript
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../components/supabase';
import { ForumThread, ForumReply } from '../types';

export function useSupabaseForum() {
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [replies, setReplies] = useState<Map<string, ForumReply[]>>(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Preiau toate firele
  const fetchThreads = useCallback(async (topicId?: string) => {
    setLoading(true);
    try {
      let query = supabase
        .from('forum_threads')
        .select('*')
        .order('created_at', { ascending: false });

      if (topicId) {
        query = query.eq('topic_id', topicId);
      }

      const { data, error: err } = await query;
      if (err) throw err;
      setThreads(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Eroare la preluarea firelor');
    } finally {
      setLoading(false);
    }
  }, []);

  // Preiau răspunsurile pentru un fir
  const fetchReplies = useCallback(async (threadId: string) => {
    try {
      const { data, error: err } = await supabase
        .from('forum_replies')
        .select('*')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });

      if (err) throw err;
      setReplies(prev => new Map(prev).set(threadId, data || []));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Eroare la preluarea răspunsurilor');
    }
  }, []);

  // Creez un nou fir
  const createThread = useCallback(
    async (thread: Omit<ForumThread, 'id' | 'replyCount' | 'viewCount'>) => {
      try {
        const { data, error: err } = await supabase
          .from('forum_threads')
          .insert([thread])
          .select();

        if (err) throw err;
        if (data) {
          setThreads(prev => [data[0], ...prev]);
          return data[0];
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Eroare la crearea firului');
      }
    },
    []
  );

  // Creez un nou răspuns
  const createReply = useCallback(async (reply: Omit<ForumReply, 'id'>) => {
    try {
      const { data, error: err } = await supabase
        .from('forum_replies')
        .insert([reply])
        .select();

      if (err) throw err;
      if (data) {
        const threadId = reply.threadId;
        setReplies(prev => {
          const newMap = new Map(prev);
          const threadReplies = newMap.get(threadId) || [];
          newMap.set(threadId, [...threadReplies, data[0]]);
          return newMap;
        });

        // Actualizez contorul de răspunsuri al firului
        await supabase
          .from('forum_threads')
          .update({ reply_count: (threads.find(t => t.id === threadId)?.replyCount || 0) + 1 })
          .eq('id', threadId);

        return data[0];
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Eroare la crearea răspunsului');
    }
  }, [threads]);

  return {
    threads,
    replies,
    loading,
    error,
    fetchThreads,
    fetchReplies,
    createThread,
    createReply,
  };
}
```

## 4. Actualizează Componenta Forum pentru a Folosi Supabase

Actualizează `src/components/Forum.tsx` pentru a folosi noul hook:

```typescript
import { useSupabaseForum } from '../hooks/useSupabaseForum';

// ... în componentă
export default function Forum({ subject }: ForumProps) {
  const {
    threads,
    replies: repliesMap,
    fetchThreads,
    fetchReplies,
    createThread,
    createReply,
  } = useSupabaseForum();

  // Încarcă firele inițiale la montare
  useEffect(() => {
    fetchThreads(subject);
  }, [subject, fetchThreads]);

  // Actualizează handleCreateThread pentru a folosi Supabase
  const handleCreateThread = async () => {
    if (!newThreadTitle.trim() || !newThreadTopic || !newThreadContent.trim() || !userName.trim()) {
      alert('Te rog completează toate câmpurile și setează un nume de utilizator');
      return;
    }

    await createThread({
      topicId: newThreadTopic,
      title: newThreadTitle,
      content: newThreadContent,
      authorId: \`user-\${Date.now()}\`,
      authorName: userName,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    setNewThreadTitle('');
    setNewThreadTopic('');
    setNewThreadContent('');
    setShowNewThread(false);
  };

  // ... restul componentei
}
```

## 5. Variabile de Mediu

Adaugă la `.env.local`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Actualizări în Timp Real (Opțional)

Pentru a activa actualizările forumului în timp real pentru mai mulți utilizatori:

```typescript
useEffect(() => {
  const subscription = supabase
    .channel('forum-threads')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'forum_threads' },
      () => fetchThreads(subject)
    )
    .subscribe();

  return () => subscription.unsubscribe();
}, [subject, fetchThreads]);
```

## Note

- Componenta Forum actuală folosește localStorage în scop demonstrativ
- Pentru a integra pe deplin Supabase, înlocuiește datele mock cu apelurile hook-ului
- Consideră adăugarea autentificării utilizatorului pentru o moderație mai bună
- Adaugă paginare pentru performanță atunci când se ocupă de multe fire
