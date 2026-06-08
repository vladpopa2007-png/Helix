import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ title, content, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-white/10 last:border-0 pb-3 last:pb-0">
      <button 
        onClick={onToggle}
        className="w-full flex items-start justify-between text-left py-3 transition-colors group"
      >
        <span className={`font-bold text-sm transition-colors ${isOpen ? 'text-white' : 'text-natural-green group-hover:text-white'}`}>
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="shrink-0 ml-4 mt-1"
        >
          <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-white' : 'text-natural-green'}`} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-xs text-white/70 leading-relaxed pb-3">
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  items: { q: string; a: string }[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-1">
      {items.map((item, i) => (
        <AccordionItem 
          key={i} 
          title={item.q} 
          content={item.a} 
          isOpen={openIndex === i} 
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
