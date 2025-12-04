import React, { useState, useEffect } from 'react';
import { X, Eye, CheckCircle, Clock } from 'lucide-react';
import { Question } from '../types';

interface QuestionModalProps {
  isOpen: boolean;
  questionData: Question | null;
  categoryTitle: string;
  onClose: () => void;
  onComplete: () => void;
}

const getTimerDuration = (points: number) => {
  switch (points) {
    case 100: return 30;
    case 200: return 45;
    case 300: return 50;
    case 400: return 55;
    case 500: return 60;
    default: return 30;
  }
};

export const QuestionModal: React.FC<QuestionModalProps> = ({ 
  isOpen, 
  questionData, 
  categoryTitle,
  onClose,
  onComplete
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  // Initialize with a safe default (e.g. 30) to prevent "Time Up" triggering immediately on mount
  // because the effect that sets the real time runs after the first render.
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen && questionData) {
      setIsRevealed(false);
      setIsTimeUp(false);
      setTimeLeft(getTimerDuration(questionData.points));
    }
  }, [isOpen, questionData]);

  // Timer Logic
  useEffect(() => {
    if (!isOpen || isRevealed) return;

    if (timeLeft === 0) {
      setIsTimeUp(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isRevealed, timeLeft]);

  if (!isOpen || !questionData) return null;

  const handleClose = () => {
    // Only mark as complete if the answer was revealed.
    // If closed before revealing, it remains available.
    if (isRevealed) {
      onComplete();
    }
    onClose();
  };

  // Styles based on timer state
  const borderColor = isTimeUp && !isRevealed ? 'border-red-500' : 'border-slate-800';
  const headerBg = isTimeUp && !isRevealed ? 'bg-red-50' : 'bg-slate-100';
  const timerColor = isTimeUp ? 'text-red-600' : (timeLeft <= 10 ? 'text-orange-500' : 'text-slate-500');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border-4 flex flex-col min-h-[400px] animate-in fade-in zoom-in duration-200 ${borderColor} transition-colors duration-300`}>
        
        {/* Header */}
        <div className={`p-4 border-b-2 border-slate-200 flex justify-between items-center ${headerBg} transition-colors duration-300`}>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-teal-brand text-white text-xs font-bold rounded-full uppercase tracking-wider">
              {categoryTitle}
            </span>
            <span className="font-mono font-bold text-slate-500">
              {questionData.points} PTS
            </span>
          </div>

          {/* Timer Display */}
          <div className={`flex items-center gap-2 font-mono font-bold text-2xl ${timerColor}`}>
            <Clock size={24} className={timeLeft <= 10 && !isRevealed ? "animate-pulse" : ""} />
            <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </div>

          <button 
            onClick={handleClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X size={24} className="text-slate-600" />
          </button>
        </div>

        {/* Question Section */}
        <div className={`flex-1 flex flex-col items-center justify-center p-8 text-center bg-white ${isTimeUp && !isRevealed ? 'bg-red-50/30' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
            "{questionData.question}"
          </h2>
          {questionData.subtext && (
            <p className="text-xl md:text-2xl text-teal-600 font-medium italic mb-8">
              {questionData.subtext}
            </p>
          )}

          {/* Answer Section (Hidden/Revealed) */}
          <div className="w-full mt-4">
             {isRevealed ? (
               <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
                 <div className="h-0.5 w-2/3 bg-slate-800 mx-auto mb-8"></div>
                 <p className="text-3xl md:text-4xl font-bold text-teal-700">
                   {questionData.answer}
                 </p>
               </div>
             ) : (
               <div className="h-24 flex items-center justify-center">
                  {isTimeUp ? (
                     <p className="text-red-500 font-bold tracking-widest uppercase animate-pulse">Time's Up!</p>
                  ) : (
                     <p className="text-slate-300 font-bold tracking-widest uppercase">Waiting to reveal...</p>
                  )}
               </div>
             )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className={`p-4 border-t border-slate-200 flex justify-between items-center ${isTimeUp && !isRevealed ? 'bg-red-50' : 'bg-slate-50'} transition-colors duration-300`}>
          <div className="text-slate-400 text-sm font-medium">
             Points: {questionData.points}
          </div>
          
          {!isRevealed ? (
            <button 
              onClick={() => setIsRevealed(true)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105 ${
                isTimeUp 
                  ? 'bg-red-600 hover:bg-red-700 text-white animate-shake shadow-lg shadow-red-200' 
                  : 'bg-slate-800 hover:bg-slate-900 text-white'
              }`}
            >
              <Eye size={20} />
              Reveal Answer
            </button>
          ) : (
             <button 
              onClick={handleClose}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-bold text-lg transition-all"
            >
              <CheckCircle size={20} />
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};