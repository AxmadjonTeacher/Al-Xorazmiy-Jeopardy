import React, { useState, useEffect } from 'react';
import { X, Clock, HelpCircle } from 'lucide-react';
import { Question } from '../types';

interface EditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: Question) => void;
  initialQuestion: Question;
}

export const EditorModal: React.FC<EditorModalProps> = ({ isOpen, onClose, onSave, initialQuestion }) => {
  const [question, setQuestion] = useState(initialQuestion.question);
  const [answer, setAnswer] = useState(initialQuestion.answer);
  const [points, setPoints] = useState<string | number>(initialQuestion.points);
  const [timer, setTimer] = useState(initialQuestion.timerDuration || 30);
  const [subtext, setSubtext] = useState(initialQuestion.subtext || '');

  useEffect(() => {
    if (isOpen) {
      setQuestion(initialQuestion.question);
      setAnswer(initialQuestion.answer);
      setPoints(initialQuestion.points);
      setTimer(initialQuestion.timerDuration || (
        typeof initialQuestion.points === 'number' && initialQuestion.points < 200 ? 30 :
        typeof initialQuestion.points === 'number' && initialQuestion.points < 300 ? 45 :
        typeof initialQuestion.points === 'number' && initialQuestion.points < 400 ? 50 :
        typeof initialQuestion.points === 'number' && initialQuestion.points < 500 ? 55 : 60
      ));
      setSubtext(initialQuestion.subtext || '');
    }
  }, [isOpen, initialQuestion]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      ...initialQuestion,
      question,
      answer,
      points,
      subtext,
      timerDuration: timer
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-serif-logo text-slate-800 font-bold text-lg">Easily Create Interactive Questions</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          
          {/* Question Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Question
            </label>
            <input 
              type="text" 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border-b-2 border-slate-300 focus:border-teal-500 outline-none py-2 text-lg font-medium bg-transparent transition-colors placeholder:text-slate-300"
              placeholder="Enter the Question here"
            />
          </div>

          {/* Subtext Input */}
          <div>
             <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Subtext / Hint (Optional)
            </label>
             <input 
              type="text" 
              value={subtext}
              onChange={(e) => setSubtext(e.target.value)}
              className="w-full border-b-2 border-slate-300 focus:border-teal-500 outline-none py-2 text-sm text-teal-600 bg-transparent transition-colors placeholder:text-slate-300"
              placeholder="(e.g. Translate this sentence)"
            />
          </div>

          {/* Answer Input */}
           <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Answer
            </label>
            <input 
              type="text" 
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full border-b-2 border-slate-300 focus:border-teal-500 outline-none py-2 text-lg font-medium bg-transparent transition-colors placeholder:text-slate-300"
              placeholder="Enter the answer here"
            />
          </div>

          <div className="grid grid-cols-2 gap-6 pt-2">
            {/* Points Input */}
            <div>
               <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Points (or Text)
              </label>
              <div className="flex items-center gap-2 border-b-2 border-slate-300 focus-within:border-teal-500 transition-colors">
                <span className="text-slate-400 font-bold text-sm">PTS:</span>
                <input 
                  type="text" 
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  className="w-full outline-none py-2 font-mono font-bold text-slate-700 bg-transparent"
                  maxLength={5}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Number or max 5 letters</p>
            </div>

            {/* Timer Input */}
            <div>
               <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Timer
              </label>
              <div className="flex items-center gap-2 border-b-2 border-slate-300 focus-within:border-teal-500 transition-colors">
                <Clock size={16} className="text-slate-400" />
                <input 
                  type="range" 
                  min="5" 
                  max="120" 
                  step="5"
                  value={timer}
                  onChange={(e) => setTimer(Number(e.target.value))}
                  className="w-24 accent-teal-600"
                />
                <span className="font-mono font-bold text-slate-700 min-w-[3rem] text-right">{timer}s</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">5 seconds to 2 minutes</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 flex justify-end">
          <button 
            onClick={handleSave}
            className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2 rounded-lg font-bold transition-colors shadow-lg shadow-slate-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
