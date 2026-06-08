import { useBadges } from '../hooks/useBadges';
import { motion } from 'motion/react';
import { Clock, Trophy, Flame, BookOpen } from 'lucide-react';
import BadgeDisplay from './BadgeDisplay';
import SEO from './SEO';

export default function StudyStats() {
  const { stats } = useBadges(0);

  const totalHours = Math.floor(stats.totalStudyTime / 3600);
  const totalMinutes = Math.floor((stats.totalStudyTime % 3600) / 60);
  const unlockedBadges = stats.badges.filter(b => b.unlockedAt).length;
  const totalBadges = stats.badges.length;

  return (
    <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto min-h-screen">
      <SEO title="Your Stats & Achievements" description="Track your study progress and achievements" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-natural-green-dark mb-2">Progresul Tău </h1>
          <p className="text-natural-gray">Învață în continuare pentru a debloca mai multe trofee</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-natural-card rounded-lg p-4 border border-natural-border text-center"
          >
            <Clock className="w-8 h-8 mx-auto mb-2 text-natural-green" />
            <div className="text-2xl font-bold text-natural-green-dark">{totalHours}h</div>
            <div className="text-xs text-natural-gray">Timp de studiu</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-natural-card rounded-lg p-4 border border-natural-border text-center"
          >
            <Flame className="w-8 h-8 mx-auto mb-2 text-natural-earth" />
            <div className="text-2xl font-bold text-natural-green-dark">{stats.currentStreak}</div>
            <div className="text-xs text-natural-gray">Streak</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-natural-card rounded-lg p-4 border border-natural-border text-center"
          >
            <Trophy className="w-8 h-8 mx-auto mb-2 text-natural-green" />
            <div className="text-2xl font-bold text-natural-green-dark">{unlockedBadges}</div>
            <div className="text-xs text-natural-gray">Badges</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-natural-card rounded-lg p-4 border border-natural-border text-center"
          >
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-natural-blue" />
            <div className="text-2xl font-bold text-natural-green-dark">{stats.quizScores.length}</div>
            <div className="text-xs text-natural-gray">Quizzuri</div>
          </motion.div>
        </div>

        {/* Badges Section */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-natural-green-dark mb-4">Achievements</h2>
          <div className="bg-natural-card rounded-lg border border-natural-border p-6">
            {stats.badges.length === 0 ? (
              <div className="text-center py-12 text-natural-gray">
                <Trophy className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Nu ai încă trofee. Începe să studiezi pentru a câștiga primul tău!</p>
              </div>
            ) : (
              <BadgeDisplay badges={stats.badges} />
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-natural-green-dark mb-4">Activitate Recente</h2>
          <div className="bg-natural-card rounded-lg border border-natural-border overflow-hidden">
            {stats.studySessions.length === 0 ? (
              <div className="text-center py-8 text-natural-gray">
                <p>Nu ai încă sesiuni de studiu. Începe un subiect pentru a urmări progresul!</p>
              </div>
            ) : (
              <div className="space-y-1">
                {[...stats.studySessions]
                  .reverse()
                  .slice(0, 5)
                  .map((session, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center justify-between px-4 py-3 border-b border-natural-border last:border-b-0"
                    >
                      <div>
                        <p className="font-medium text-natural-green-dark">{session.topicId}</p>
                        <p className="text-xs text-natural-gray">
                          {new Date(session.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-natural-green">
                          {Math.floor(session.duration / 60)}m
                        </p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
