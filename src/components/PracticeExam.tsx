import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, CheckCircle2, XCircle, ChevronRight, RotateCcw, BarChart3, AlertCircle } from 'lucide-react';
import { QuizQuestion, Subject } from '../types';
import { topics } from '../data/topics';
import SEO from './SEO';

interface PracticeExamProps {
  onClose?: () => void;
  onComplete?: (score: number, totalQuestions: number, timeSpent: number) => void;
}

type DifficultyLevel = 'easy' | 'medium' | 'hard';

interface ExamConfig {
  numQuestions: number;
  difficulty: DifficultyLevel;
  subject: Subject | 'mixed';
  isConfigured: boolean;
}

export default function PracticeExam({ onClose, onComplete }: PracticeExamProps) {
  const [config, setConfig] = useState<ExamConfig>({
    numQuestions: 20,
    difficulty: 'medium',
    subject: 'mixed',
    isConfigured: false,
  });

  const [examState, setExamState] = useState<'config' | 'active' | 'summary'>('config');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<{ correct: boolean; timePerQuestion: number }[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [examStartTime, setExamStartTime] = useState(0);
  const [examPausedTime, setExamPausedTime] = useState(0);

  // Generate questions based on config
  const examQuestions = useMemo(() => {
    const allQuestions: (QuizQuestion & { difficulty: DifficultyLevel; subject: Subject })[] = [];

    topics.forEach(topic => {
      if (config.subject !== 'mixed' && topic.subject !== config.subject) return;

      topic.questions?.forEach(q => {
        // Simulate difficulty assignment (in real app, this would be in data)
        const difficultyPool = ['easy', 'medium', 'hard'] as const;
        const difficulty = difficultyPool[Math.floor(Math.random() * 3)];

        if (difficulty === config.difficulty) {
          allQuestions.push({
            ...q,
            difficulty,
            subject: topic.subject,
          });
        }
      });
    });

    // Shuffle and select
    return allQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, config.numQuestions);
  }, [config]);

  // Timer effect
useEffect(() => {
  if (examState !== 'active') return;

  const timer = setInterval(() => {
    setTimeRemaining(prev => {
      if (prev <= 1) {
        setExamState('summary');
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [examState]);

  const currentQuestion = examQuestions[currentIndex];
  const timeSpentSeconds = examStartTime ? Math.floor((Date.now() - examStartTime) / 1000) : 0;
  const minutesRemaining = Math.floor(timeRemaining / 60);
  const secondsRemaining = timeRemaining % 60;

const handleStartExam = () => {
  if (examQuestions.length === 0) {
    alert('No questions available for this configuration.');
    return;
  }
  setExamState('active');
  setExamStartTime(Date.now());
  setTimeRemaining(config.numQuestions * 90); // 90 seconds per question
};

const handleOptionSelect = (index: number) => {
  if (isAnswered || !currentQuestion) return;

  setSelectedOption(index);
  setIsAnswered(true);

  const correct = index === currentQuestion.correctOption;
  if (correct) setScore(s => s + 1);

  const questionTime = Math.floor((Date.now() - examStartTime) / 1000) - results.reduce((sum, r) => sum + r.timePerQuestion, 0);
  setResults(prev => [...prev, { correct, timePerQuestion: questionTime }]);
};

const handleNext = () => {
  if (currentIndex < examQuestions.length - 1) {
    setCurrentIndex(currentIndex + 1);
    setSelectedOption(null);
    setIsAnswered(false);
  } else {
    setExamState('summary');
  }
};

const handleRestart = () => {
  setExamState('config');
  setCurrentIndex(0);
  setSelectedOption(null);
  setIsAnswered(false);
  setScore(0);
  setResults([]);
  setTimeRemaining(0);
  setExamStartTime(0);
};

const scorePercentage = (score / examQuestions.length) * 100;

// Breakdown by subject
const breakdown = useMemo(() => {
    const breakdown: Record<Subject, { correct: number; total: number }> = {
      biologie: { correct: 0, total: 0 },
      chimie: { correct: 0, total: 0 },
    };

    examQuestions.forEach((q, idx) => {
      breakdown[q.subject].total += 1;
      if (results[idx]?.correct) {
        breakdown[q.subject].correct += 1;
      }
    });

    return breakdown;
  }, [examQuestions, results]);

  if (examState === 'config') {
    return (
      <div className="pt-24 pb-16 px-4 max-w-2xl mx-auto min-h-screen">
        <SEO title="Practice Exam" description="Full-length practice exam simulator" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-natural-green-dark mb-2">Practice Exam Simulator</h1>
            <p className="text-natural-gray">Test yourself with a full-length timed exam</p>
          </div>

          <div className="bg-natural-card rounded-2xl border border-natural-border p-8 space-y-6">
            {/* Number of Questions */}
            <div>
              <label className="block text-sm font-semibold text-natural-green-dark mb-3">Number of Questions</label>
              <div className="flex gap-2 flex-wrap">
                {[10, 20, 30, 50].map(num => (
                  <button
                    key={num}
                    onClick={() => setConfig(prev => ({ ...prev, numQuestions: num }))}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      config.numQuestions === num
                        ? 'bg-natural-green text-white'
                        : 'bg-natural-muted text-natural-gray hover:bg-natural-border'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-semibold text-natural-green-dark mb-3">Difficulty</label>
              <div className="flex gap-2 flex-wrap">
                {['easy', 'medium', 'hard'].map(level => (
                  <button
                    key={level}
                    onClick={() => setConfig(prev => ({ ...prev, difficulty: level as DifficultyLevel }))}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all capitalize ${
                      config.difficulty === level
                        ? 'bg-natural-green text-white'
                        : 'bg-natural-muted text-natural-gray hover:bg-natural-border'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-natural-green-dark mb-3">Subject</label>
              <div className="flex gap-2 flex-wrap">
                {['mixed', 'biologie', 'chimie'].map(subj => (
                  <button
                    key={subj}
                    onClick={() => setConfig(prev => ({ ...prev, subject: subj as any }))}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all capitalize ${
                      config.subject === subj
                        ? 'bg-natural-green text-white'
                        : 'bg-natural-muted text-natural-gray hover:bg-natural-border'
                    }`}
                  >
                    {subj === 'biologie' ? 'Biology' : subj === 'chimie' ? 'Chemistry' : 'Mixed'}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-natural-green/5 rounded-lg p-4 border border-natural-green/20">
              <p className="text-sm text-natural-gray">
                <span className="font-semibold text-natural-green-dark">
                  {config.numQuestions} {config.difficulty} {config.subject === 'mixed' ? 'mixed' : config.subject} questions
                </span>
                <br />
                ⏱️ Estimated time: ~{Math.ceil((config.numQuestions * 90) / 60)} minutes
              </p>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartExam}
              disabled={examQuestions.length === 0}
              className="w-full py-3 bg-natural-green text-white rounded-lg font-semibold hover:bg-natural-green-dark transition-all disabled:opacity-50"
            >
              Start Exam
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="w-full py-3 bg-natural-muted text-natural-gray rounded-lg font-semibold hover:bg-natural-border transition-all"
              >
                Cancel
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  if (examState === 'active' && currentQuestion) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-natural-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-natural-border">
            <div className="text-sm font-semibold text-natural-gray">
              Question {currentIndex + 1} of {examQuestions.length}
            </div>
            <motion.div
              animate={{ color: timeRemaining < 300 ? '#ef4444' : '#375531' }}
              className="flex items-center gap-2 font-bold"
            >
              <Clock className="w-4 h-4" />
              {minutesRemaining}:{String(secondsRemaining).padStart(2, '0')}
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-natural-border rounded-full mb-6 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / examQuestions.length) * 100}%` }}
              className="h-full bg-natural-green"
            />
          </div>

          {/* Question */}
          <div className="mb-8">
            <p className="text-sm text-natural-gray mb-2">
              {currentQuestion.subject === 'biologie' ? '🧬 Biology' : '⚗️ Chemistry'}
            </p>
            <h2 className="text-lg md:text-xl font-semibold text-natural-green-dark mb-6">{currentQuestion.question}</h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  whileHover={{ scale: isAnswered ? 1 : 1.02 }}
                  whileTap={{ scale: isAnswered ? 1 : 0.98 }}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                    selectedOption === idx
                      ? isAnswered && idx === currentQuestion.correctOption
                        ? 'bg-green-50 border-green-500 text-green-900'
                        : isAnswered
                        ? 'bg-red-50 border-red-500 text-red-900'
                        : 'bg-natural-green/10 border-natural-green'
                      : isAnswered && idx === currentQuestion.correctOption
                      ? 'bg-green-50 border-green-500 text-green-900'
                      : 'bg-natural-bg border-natural-border text-natural-gray hover:border-natural-green hover:bg-natural-muted'
                  } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                  disabled={isAnswered}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selectedOption === idx && isAnswered && (idx === currentQuestion.correctOption ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />)}
                    {isAnswered && idx === currentQuestion.correctOption && selectedOption !== idx && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-natural-green/5 border border-natural-green/20 rounded-lg text-sm text-natural-gray"
              >
                <p className="font-semibold text-natural-green-dark mb-1">Explanation:</p>
                <p>{currentQuestion.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Button */}
          {isAnswered && (
            <button
              onClick={handleNext}
              className="w-full py-3 bg-natural-green text-white rounded-lg font-semibold hover:bg-natural-green-dark transition-all flex items-center justify-center gap-2"
            >
              {currentIndex === examQuestions.length - 1 ? 'Finish Exam' : 'Next Question'}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      </div>
    );
  }

  if (examState === 'summary') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-natural-card rounded-2xl max-w-2xl w-full p-8 overflow-y-auto max-h-[90vh]"
        >
          <div className="text-center mb-8">
            <div className="text-6xl font-serif font-bold text-natural-green mb-2">{Math.round(scorePercentage)}%</div>
            <h2 className="text-2xl font-semibold text-natural-green-dark mb-2">
              {scorePercentage >= 80 ? '🎉 Excellent!' : scorePercentage >= 60 ? '👍 Good' : '💪 Keep improving'}
            </h2>
            <p className="text-lg text-natural-gray">
              {score} out of {examQuestions.length} correct
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-natural-green/5 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-natural-green">{score}</div>
              <div className="text-xs text-natural-gray">Correct</div>
            </div>
            <div className="bg-natural-red/5 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-natural-red">{examQuestions.length - score}</div>
              <div className="text-xs text-natural-gray">Incorrect</div>
            </div>
            <div className="bg-natural-blue/5 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-natural-blue">{Math.floor(timeSpentSeconds / 60)}m</div>
              <div className="text-xs text-natural-gray">Time</div>
            </div>
          </div>

          {/* Subject Breakdown */}
          <div className="mb-8 p-4 bg-natural-muted rounded-lg">
            <div className="flex items-center gap-2 mb-4 font-semibold text-natural-green-dark">
              <BarChart3 className="w-4 h-4" />
              Subject Breakdown
            </div>
            <div className="space-y-3">
              {Object.entries(breakdown).map(([subject, data]) => (
                <div key={subject}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-natural-gray">{subject === 'biologie' ? '🧬 Biology' : '⚗️ Chemistry'}</span>
                    <span className="font-semibold text-natural-green-dark">
                      {data.correct}/{data.total}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-natural-border rounded-full overflow-hidden">
                    <div className="h-full bg-natural-green" style={{ width: `${(data.correct / data.total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleRestart}
              className="flex-1 py-3 bg-natural-green text-white rounded-lg font-semibold hover:bg-natural-green-dark transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-natural-muted text-natural-gray rounded-lg font-semibold hover:bg-natural-border transition-all"
              >
                Close
              </button>
            )}
          </div>

          {onComplete && (
            <button
              onClick={() => {
                onComplete(score, examQuestions.length, timeSpentSeconds);
                onClose?.();
              }}
              className="w-full mt-3 py-2 text-sm text-natural-gray hover:text-natural-green-dark transition-all"
            >
              Save Results
            </button>
          )}
        </motion.div>
      </div>
    );
  }

  return null;
}
