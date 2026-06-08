import { useState, useEffect, useCallback } from 'react';
import { Badge, UserStats, StudySession, Subject } from '../types';

const BADGE_DEFINITIONS = {
  // Study time milestones (seconds)
  study_time_1h: { name: '🔥 First Hour', description: 'Study for 1 hour', requirement: 3600 },
  study_time_5h: { name: '⚡ Dedicated', description: 'Study for 5 hours', requirement: 18000 },
  study_time_10h: { name: '🚀 Power Learner', description: 'Study for 10 hours', requirement: 36000 },
  study_time_50h: { name: '💪 Marathon', description: 'Study for 50 hours', requirement: 180000 },
  study_time_100h: { name: '👑 Master', description: 'Study for 100 hours', requirement: 360000 },
  
  // Quiz performance
  perfect_quiz: { name: '🎯 Perfect Score', description: 'Get 10/10 on a quiz', requirement: 100 },
  consistent_90: { name: '📈 Consistent', description: 'Maintain 90%+ quiz average', requirement: 90 },
  
  // Completion
  complete_bio: { name: '🧬 Biology Master', description: 'Complete all biology topics', requirement: 'complete_biologie' },
  complete_chem: { name: '⚗️ Chemistry Master', description: 'Complete all chemistry topics', requirement: 'complete_chimie' },
  
  // Streaks
  streak_7: { name: '🔗 Week Warrior', description: '7-day study streak', requirement: 7 },
  streak_30: { name: '🏆 Month Champion', description: '30-day study streak', requirement: 30 },
};

export function useBadges(totalTopics: number = 0) {
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('helix-user-stats');
    if (saved) return JSON.parse(saved);
    return {
      totalStudyTime: 0,
      currentStreak: 0,
      lastStudyDate: null,
      badges: [],
      studySessions: [],
      quizScores: [],
    };
  });

  // Save stats to localStorage
  useEffect(() => {
    localStorage.setItem('helix-user-stats', JSON.stringify(stats));
  }, [stats]);

  // Add study session and track time
  const addStudySession = useCallback(
    (topicId: string, subject: Subject, durationSeconds: number) => {
      setStats(prev => {
        const newSession: StudySession = {
          id: `session-${Date.now()}`,
          topicId,
          subject,
          startTime: Date.now() - durationSeconds * 1000,
          duration: durationSeconds,
          completedAt: Date.now(),
        };

        // Update streak
        const today = new Date().toDateString();
        const lastStudyDate = prev.lastStudyDate ? new Date(prev.lastStudyDate).toDateString() : null;
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        let newStreak = prev.currentStreak;
        if (lastStudyDate === today) {
          // Already studied today
        } else if (lastStudyDate === yesterday) {
          newStreak = prev.currentStreak + 1;
        } else {
          newStreak = 1;
        }

        return {
          ...prev,
          totalStudyTime: prev.totalStudyTime + durationSeconds,
          studySessions: [...prev.studySessions, newSession],
          currentStreak: newStreak,
          lastStudyDate: Date.now(),
          badges: evaluateBadges([...prev.studySessions, newSession], prev.quizScores, prev.badges, newStreak, totalTopics),
        };
      });
    },
    [totalTopics]
  );

  // Record quiz score
  const recordQuizScore = useCallback((topicId: string, score: number) => {
    setStats(prev => {
      const newScores = [
        ...prev.quizScores,
        { topicId, score, date: Date.now() },
      ];
      return {
        ...prev,
        quizScores: newScores,
        badges: evaluateBadges(prev.studySessions, newScores, prev.badges, prev.currentStreak, totalTopics),
      };
    });
  }, [totalTopics]);

  // Mark topic as completed
  const markTopicCompleted = useCallback((topicId: string) => {
    setStats(prev => ({
      ...prev,
      badges: evaluateBadges(prev.studySessions, prev.quizScores, prev.badges, prev.currentStreak, totalTopics),
    }));
  }, [totalTopics]);

  return {
    stats,
    addStudySession,
    recordQuizScore,
    markTopicCompleted,
  };
}

function evaluateBadges(
  sessions: StudySession[],
  quizScores: Array<{ topicId: string; score: number; date: number }>,
  currentBadges: Badge[],
  currentStreak: number,
  totalTopics: number
): Badge[] {
  const badges = [...currentBadges];
  const existingBadgeIds = new Set(badges.map(b => b.id));

  // Calculate total study time
  const totalStudyTime = sessions.reduce((sum, s) => sum + s.duration, 0);

  // Study time badges
  const studyTimeBadges = [
    { id: 'study_time_1h', time: 3600 },
    { id: 'study_time_5h', time: 18000 },
    { id: 'study_time_10h', time: 36000 },
    { id: 'study_time_50h', time: 180000 },
    { id: 'study_time_100h', time: 360000 },
  ];

  for (const { id, time } of studyTimeBadges) {
    if (!existingBadgeIds.has(id) && totalStudyTime >= time) {
      const def = BADGE_DEFINITIONS[id as keyof typeof BADGE_DEFINITIONS];
      badges.push({
        id,
        type: 'study_time',
        name: def.name,
        description: def.description,
        icon: def.name.split(' ')[0],
        unlockedAt: Date.now(),
        requirement: time,
      });
      existingBadgeIds.add(id);
    }
  }

  // Quiz performance badges
  if (quizScores.length > 0) {
    // Perfect score
    if (!existingBadgeIds.has('perfect_quiz') && quizScores.some(q => q.score === 100)) {
      const def = BADGE_DEFINITIONS.perfect_quiz;
      badges.push({
        id: 'perfect_quiz',
        type: 'quiz_performance',
        name: def.name,
        description: def.description,
        icon: '🎯',
        unlockedAt: Date.now(),
        requirement: 100,
      });
      existingBadgeIds.add('perfect_quiz');
    }

    // Consistent 90%+
    const recentScores = quizScores.slice(-10);
    if (
      !existingBadgeIds.has('consistent_90') &&
      recentScores.length >= 5 &&
      recentScores.every(q => q.score >= 90)
    ) {
      const def = BADGE_DEFINITIONS.consistent_90;
      badges.push({
        id: 'consistent_90',
        type: 'quiz_performance',
        name: def.name,
        description: def.description,
        icon: '📈',
        unlockedAt: Date.now(),
        requirement: 90,
      });
      existingBadgeIds.add('consistent_90');
    }
  }

  // Streak badges
  const streakBadges = [
    { id: 'streak_7', streak: 7 },
    { id: 'streak_30', streak: 30 },
  ];

  for (const { id, streak } of streakBadges) {
    if (!existingBadgeIds.has(id) && currentStreak >= streak) {
      const def = BADGE_DEFINITIONS[id as keyof typeof BADGE_DEFINITIONS];
      badges.push({
        id,
        type: 'streak',
        name: def.name,
        description: def.description,
        icon: def.name.split(' ')[0],
        unlockedAt: Date.now(),
        requirement: streak,
      });
      existingBadgeIds.add(id);
    }
  }

  return badges;
}
