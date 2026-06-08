import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, HelpCircle, Trophy } from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
  topicTitle: string;
}

export default function Quiz({ questions, topicTitle }: QuizProps) {
  const [currentStep, setCurrentStep] = useState<'intro' | 'active' | 'summary'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);

  // Shuffle questions and select max 10
  const shuffledQuestions = useMemo(() => {
    return [...questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
  }, [questions, currentStep === 'intro']);

  const currentQuestion = shuffledQuestions[currentIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const correct = index === currentQuestion.correctOption;
    if (correct) setScore(s => s + 1);
    setResults(prev => [...prev, correct]);
  };

  const handleNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCurrentStep('summary');
    }
  };

  const resetQuiz = () => {
    setCurrentStep('intro');
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setResults([]);
  };

  if (currentStep === 'intro') {
    return (
      <div className="bg-natural-card rounded-[32px] border border-natural-border p-8 text-center shadow-sm">
        <div className="w-16 h-16 bg-natural-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-natural-green">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-natural-green-dark mb-3">Testează-ți cunoștințele</h3>
        <p className="text-natural-gray mb-8 max-w-md mx-auto">
          Ești gata să verifici ce ai învățat despre <strong>{topicTitle}</strong>? Testul conține întrebări tip grilă similare cu cele de la examen.
        </p>
        <button
          onClick={() => setCurrentStep('active')}
          className="px-8 py-4 bg-natural-green text-white rounded-2xl font-bold hover:bg-natural-green-dark transition-all transform hover:scale-105 shadow-lg shadow-natural-green/20"
        >
          Începe Testul Grilă
        </button>
      </div>
    );
  }

  if (currentStep === 'summary') {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    return (
      <div className="bg-natural-card rounded-[32px] border border-natural-border p-10 text-center shadow-sm">
        <motion.div
           initial={{ scale: 0.5, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="w-20 h-20 bg-natural-earth/10 rounded-full flex items-center justify-center mx-auto mb-6 text-natural-earth"
        >
          <Trophy className="w-10 h-10" />
        </motion.div>
        <h3 className="text-3xl font-serif font-bold text-natural-green-dark mb-2">Felicitări!</h3>
        <p className="text-natural-gray mb-8">Ai finalizat testul pentru {topicTitle}.</p>
        
        <div className="flex justify-center gap-12 mb-10">
          <div className="text-center">
             <p className="text-4xl font-serif font-bold text-natural-green">{score}/{shuffledQuestions.length}</p>
             <p className="text-xs font-bold text-natural-gray uppercase tracking-widest mt-1">Scor Final</p>
          </div>
          <div className="text-center">
             <p className="text-4xl font-serif font-bold text-natural-earth">{percentage}%</p>
             <p className="text-xs font-bold text-natural-gray uppercase tracking-widest mt-1">Precizie</p>
          </div>
        </div>

        <button
          onClick={resetQuiz}
          className="flex items-center gap-2 px-8 py-4 bg-natural-muted text-natural-green-dark rounded-2xl font-bold hover:bg-natural-border transition-all mx-auto"
        >
          <RotateCcw className="w-5 h-5" /> Reia Testul
        </button>
      </div>
    );
  }

  return (
    <div className="bg-natural-card rounded-[32px] border border-natural-border p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8 border-b border-natural-border/50 pb-4">
        <div className="flex items-center gap-3">
           <span className="text-xs font-mono font-bold text-natural-green bg-natural-green/10 px-3 py-1 rounded-full">
             Întrebarea {currentIndex + 1} / {shuffledQuestions.length}
           </span>
        </div>
        <div className="flex gap-1">
          {results.map((res, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${res ? 'bg-natural-green' : 'bg-natural-earth'}`} />
          ))}
          {Array.from({ length: shuffledQuestions.length - results.length }).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-natural-muted" />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
        >
          <h4 className="text-xl md:text-2xl font-serif font-bold text-natural-green-dark mb-8">
            {currentQuestion.question}
          </h4>

          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctOption;
              
              let variantClasses = "border-natural-border hover:border-natural-green/50 bg-natural-muted/30";
              if (isAnswered) {
                if (isCorrect) variantClasses = "border-natural-green bg-natural-green/5 text-natural-green";
                else if (isSelected) variantClasses = "border-natural-earth bg-natural-earth/5 text-natural-earth";
                else variantClasses = "opacity-40 border-natural-border";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ${variantClasses}`}
                >
                  <span className="font-medium">{option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 shrink-0" />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="overflow-hidden"
              >
                <div className="p-5 bg-natural-muted/50 rounded-2xl border border-natural-border/50 mb-8">
                  <div className="flex items-center gap-2 mb-2 text-natural-green-dark font-bold text-sm">
                    <HelpCircle className="w-4 h-4" /> Explicație
                  </div>
                  <p className="text-sm text-natural-gray leading-relaxed italic">
                    {currentQuestion.explanation}
                  </p>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full md:w-auto ml-auto px-10 py-4 bg-natural-green text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-natural-green-dark transition-all shadow-lg shadow-natural-green/20"
                >
                  {currentIndex === shuffledQuestions.length - 1 ? 'Vezi Rezultatul' : 'Următoarea Întrebare'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
