import { motion } from 'motion/react';
import { Badge } from '../types';

interface BadgeDisplayProps {
  badges: Badge[];
  showNew?: boolean; // new unlocked badges
}

export default function BadgeDisplay({ badges, showNew = false }: BadgeDisplayProps) {
  const unlockedBadges = badges.filter(b => b.unlockedAt);
  const lockedBadges = badges.filter(b => !b.unlockedAt);

  if (badges.length === 0) {
    return (
      <div className="text-center py-8 text-natural-gray">
        <p>No badges yet. Start studying to unlock achievements!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Unlocked Badges */}
      {unlockedBadges.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-natural-green-dark mb-3">Unlocked</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {unlockedBadges.map(badge => (
              <motion.div
                key={badge.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-2 p-2 rounded-lg bg-natural-green/5 border border-natural-green/20 group cursor-default hover:bg-natural-green/10"
              >
                <div className="text-3xl">{badge.icon}</div>
                <p className="text-xs font-semibold text-center text-natural-green-dark leading-tight line-clamp-2">
                  {badge.name}
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-natural-green-dark text-white text-xs rounded whitespace-nowrap">
                  {badge.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Badges */}
      {lockedBadges.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-natural-gray mb-3">In Progress</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {lockedBadges.map(badge => (
              <div
                key={badge.id}
                className="flex flex-col items-center gap-2 p-2 rounded-lg bg-natural-muted border border-natural-border opacity-50 group cursor-default"
              >
                <div className="text-3xl grayscale">{badge.icon}</div>
                <p className="text-xs font-semibold text-center text-natural-gray leading-tight line-clamp-2">
                  {badge.name}
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-natural-gray text-white text-xs rounded whitespace-nowrap">
                  {badge.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
