import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items }: { items: { name: string, path?: string }[] }) {
  return (
    <nav className="flex items-center space-x-2 text-[10px] font-bold text-natural-gray uppercase tracking-widest mb-6 overflow-hidden whitespace-nowrap">
      <Link to="/" className="hover:text-natural-green transition-colors flex items-center shrink-0">
        Acasă
      </Link>
      {items.map((item, i) => (
        <div key={i} className="flex items-center space-x-2 min-w-0">
          <ChevronRight className="w-3 h-3 text-natural-gray/40 shrink-0" />
          {item.path ? (
            <Link to={item.path} className="hover:text-natural-green transition-colors truncate shrink-0">
              {item.name}
            </Link>
          ) : (
            <span className="text-natural-green/60 truncate">{item.name}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
