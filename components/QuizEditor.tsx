import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Quiz, Category, Question } from '../types';
import { EditorModal } from './EditorModal';
import { Logo } from './Logo';

interface QuizEditorProps {
  onSave: (quiz: Quiz) => void;
  onCancel: () => void;
}

// Generate empty default structure
const createEmptyQuiz = (): Quiz => {
  return {
    id: `quiz-${Date.now()}`,
    title: '',
    createdAt: Date.now(),
    categories: Array.from({ length: 5 }).map((_, i) => ({
      title: '',
      questions: Array.from({ length: 5 }).map((_, j) => ({
        points: (j + 1) * 100,
        question: '',
        answer: '',
      }))
    }))
  };
};

export const QuizEditor: React.FC<QuizEditorProps> = ({ onSave, onCancel }) => {
  const [quiz, setQuiz] = useState<Quiz>(createEmptyQuiz());
  const [editingCell, setEditingCell] = useState<{catIdx: number, qIdx: number} | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuiz({ ...quiz, title: e.target.value });
  };

  const handleCategoryTitleChange = (idx: number, title: string) => {
    const newCategories = [...quiz.categories];
    newCategories[idx] = { ...newCategories[idx], title };
    setQuiz({ ...quiz, categories: newCategories });
  };

  const handleQuestionSave = (updatedQuestion: Question) => {
    if (editingCell) {
      const newCategories = [...quiz.categories];
      newCategories[editingCell.catIdx].questions[editingCell.qIdx] = updatedQuestion;
      setQuiz({ ...quiz, categories: newCategories });
      setEditingCell(null);
    }
  };

  const isFormValid = quiz.title.trim().length > 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
       {/* Header */}
       <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onCancel}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-bold text-sm"
          >
            <ArrowLeft size={16} />
            Cancel
          </button>
          <div className="h-6 w-px bg-slate-200"></div>
          <span className="font-bold text-slate-400 uppercase tracking-widest text-xs">Editor Mode</span>
        </div>
        
        <input 
          type="text"
          value={quiz.title}
          onChange={handleTitleChange}
          placeholder="Enter Quiz Name..."
          className="text-center font-serif-logo font-bold text-2xl outline-none placeholder:text-slate-300 bg-transparent"
        />

        <div className="w-24"></div> {/* Spacer for balance */}
      </header>

      {/* Editor Grid */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto p-4 flex flex-col min-h-0 overflow-auto">
        <div className="min-w-[1000px] flex-1 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
          
          {/* Grid Container */}
          <div className="flex-1 grid grid-cols-5 grid-rows-[auto_repeat(5,1fr)] divide-x divide-slate-200">
             
             {/* Category Headers (Editable) */}
             {quiz.categories.map((cat, idx) => (
               <div key={`head-${idx}`} className="bg-slate-50 p-2 border-b-4 border-slate-200">
                 <input 
                    type="text"
                    value={cat.title}
                    onChange={(e) => handleCategoryTitleChange(idx, e.target.value)}
                    placeholder="Enter Name Here"
                    className="w-full bg-transparent text-center font-bold text-slate-800 placeholder:text-slate-400 outline-none focus:border-b-2 focus:border-teal-500 transition-all uppercase text-sm"
                 />
               </div>
             ))}

             {/* Question Cells */}
             {Array.from({ length: 5 }).map((_, qIdx) => (
                <React.Fragment key={`row-${qIdx}`}>
                  {quiz.categories.map((cat, catIdx) => {
                    const q = cat.questions[qIdx];
                    const hasContent = q.question.trim().length > 0;
                    
                    return (
                      <div key={`cell-${catIdx}-${qIdx}`} className="border-b border-slate-200 last:border-b-0 p-2 relative group">
                        <button
                          onClick={() => setEditingCell({ catIdx, qIdx })}
                          className={`w-full h-full rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-all
                            ${hasContent 
                              ? 'border-teal-500/30 bg-teal-50/50 hover:bg-teal-100 hover:border-teal-500' 
                              : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
                            }
                          `}
                        >
                           <span className={`font-mono font-bold ${hasContent ? 'text-teal-700' : 'text-slate-300'}`}>
                             {hasContent ? `+ Q/A: ${q.points}` : `+ Q/A: ${q.points}`}
                           </span>
                           {hasContent && (
                             <span className="text-[10px] text-teal-600/70 max-w-[90%] truncate px-2">
                               {q.question}
                             </span>
                           )}
                        </button>
                      </div>
                    );
                  })}
                </React.Fragment>
             ))}
          </div>
        </div>

        {/* Save Footer */}
        <div className="mt-8 flex flex-col items-center gap-6">
           <button 
             onClick={() => isFormValid && onSave(quiz)}
             disabled={!isFormValid}
             className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all
               ${isFormValid 
                 ? 'bg-slate-800 text-white hover:bg-teal-600 hover:scale-105' 
                 : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
             `}
           >
             <Save size={20} />
             Save the Game and Have Fun
           </button>
           
           <Logo className="scale-75" />
        </div>
      </main>

      {/* Edit Modal */}
      {editingCell && (
        <EditorModal
          isOpen={!!editingCell}
          onClose={() => setEditingCell(null)}
          onSave={handleQuestionSave}
          initialQuestion={quiz.categories[editingCell.catIdx].questions[editingCell.qIdx]}
        />
      )}
    </div>
  );
};
