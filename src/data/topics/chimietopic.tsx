import { useEffect, useState } from 'react';
import { supabase } from '../../components/supabase'; // calea către fișierul de la Pasul B

interface Topic {
  id: string;
  title: string;
  excerpt: string;
  [key: string]: any;
}

export default function ChimiePage() {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    async function fetchTopics() {
      const { data, error } = await supabase
        .from('topics')
        .select('*')
        .eq('subject', 'chimie'); // Aduce doar rândurile unde subiectul e chimie

      if (data) setTopics(data);
    }

    fetchTopics();
  }, []);

  return (
    <div>
      {topics.map((topic) => (
        <div key={topic.id} className="card">
          <h2>{topic.title}</h2>
          <p>{topic.excerpt}</p> {/* Iată la ce folosește excerpt! */}
          <button onClick={() => window.location.href = `/topic/${topic.id}`}>
            Citește lecția
          </button>
        </div>
      ))}
    </div>
  );
}