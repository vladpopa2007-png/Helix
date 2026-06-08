export type Subject = 'biologie' | 'chimie';

export interface Topic {
  id: string;
  subject: Subject;
  title: string;
  category: string;
  importance: 'high' | 'medium' | 'low';
  readTime: string;
  excerpt: string;
  content: string;
  questions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
}

export interface Program {
  id: string;
  name: string;
  duration: string;
  description: string;
  seats: {
    budget: number;
    tax: number;
  };
}

export interface FAQ {
  q: string;
  a: string;
}

export interface TimelineEvent {
  date: string;
  event: string;
}

export interface AdmissionInfo {
  faculty: {
    name: string;
    about: string;
    images: string[];
  };
  programs: Program[];
  requirements: {
    documents: string[];
    timeline: TimelineEvent[];
  };
  faq: FAQ[];
}

// Badge System
export type BadgeType = 'study_time' | 'quiz_performance' | 'completion' | 'streak';

export interface Badge {
  id: string;
  type: BadgeType;
  name: string;
  description: string;
  icon: string; // emoji or icon name
  unlockedAt: number | null; // timestamp or null if not unlocked
  requirement: number | string; // threshold value
}

export interface StudySession {
  id: string;
  topicId: string;
  subject: Subject;
  startTime: number;
  duration: number; // in seconds
  completedAt: number;
}

export interface UserStats {
  totalStudyTime: number; // in seconds
  currentStreak: number; // days
  lastStudyDate: number | null; // timestamp
  badges: Badge[];
  studySessions: StudySession[];
  quizScores: Array<{ topicId: string; score: number; date: number }>;
}

// Forum/Discussion
export interface ForumThread {
  id: string;
  topicId: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  updatedAt: number;
  replyCount: number;
  viewCount: number;
}

export interface ForumReply {
  id: string;
  threadId: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  isAnswer?: boolean;
}

// Interactive Diagrams
export interface InteractiveDiagram {
  id: string;
  type: 'anatomy' | 'cell' | 'reaction' | 'process';
  title: string;
  description: string;
  elements: DiagramElement[];
  layers?: DiagramLayer[];
}

export interface DiagramElement {
  id: string;
  label: string;
  info: string;
  x: number;
  y: number;
  type: 'point' | 'area' | 'shape';
}

export interface DiagramLayer {
  id: string;
  name: string;
  visible: boolean;
  elements: DiagramElement[];
}

// Practice Exam
export interface PracticeExam {
  id: string;
  title: string;
  totalQuestions: number;
  duration: number; // in minutes
  questions: Array<QuizQuestion & { difficulty: 'easy' | 'medium' | 'hard' }>;
}

export interface ExamResult {
  examId: string;
  score: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
  completedAt: number;
  breakdown: Array<{ subject: Subject; correct: number; total: number }>;
  answers: Array<{ questionId: string; selectedOption: number }>;
}
