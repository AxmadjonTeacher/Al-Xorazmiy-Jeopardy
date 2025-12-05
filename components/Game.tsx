import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Quiz, Team } from '../types';
import { Logo } from './Logo';
import { ScoreBoard } from './ScoreBoard';
import { QuestionModal } from './QuestionModal';

interface GameProps {
  quiz: Quiz;
  onExit: () => void;
}

const getQuestionId = (catIdx: number, qIdx: number) => `${catIdx}-${qIdx}`;

export const Game: React.FC<GameProps> = ({ quiz, onExit }) => {
  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: 'Team 1', score: 0 },
    { id: 2, name: 'Team 2', score: 0 },
    { id: 3, name: 'Team 3', score: 0 },
    { id: 4, name: 'Team 4', score: 0 },
  ]);

  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [activeQuestion, setActiveQuestion] = useState<{ catIdx: number; qIdx: number } | null>(null);

  const handleScoreUpdate = (teamId: number, delta: number) => {
    setTeams(prev => prev.map(team => 
      team.id === teamId ? { ...team, score: team.score + delta } : team
    ));
  };

  const handleAddTeam = () => {
    const newId = teams.length > 0 ? Math.max(...teams.map(t => t.id)) + 1 : 1;
    setTeams([...teams, { id: newId, name: `Team ${newId}`, score: 0 }]);
  };

  const handleUpdateName = (teamId: number, newName: string) => {
    setTeams(prev => prev.map(team => 
      team.id === teamId ? { ...team, name: newName } : team
    ));
  };

  const handleRemoveTeam = (teamId: number) => {
    if (teams.length > 1) {
      setTeams(prev => prev.filter(team => team.id !== teamId));
    }
  };

  const handleCardClick = (catIdx: number, qIdx: number) => {
    const id = getQuestionId(catIdx, qIdx);
    if (!completedQuestions.has(id)) {
      setActiveQuestion({ catIdx, qIdx });
    }
  };

  const handleModalClose = () => {
    setActiveQuestion(null);
  };

  const handleQuestionComplete = () => {
    if (activeQuestion) {
      const id = getQuestionId(activeQuestion.catIdx, activeQuestion.qIdx);
      setCompletedQuestions(prev => new Set(prev).add(id));
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-50 overflow-hidden flex flex-col">
      {/* Header for Game Navigation */}
      <header className="bg-white border-b border-slate-200 px-4 py-2 flex items-center shrink-0">
        <button 
          onClick={onExit}
          className="flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors font-bold text-sm"
        >
          <ArrowLeft size={16} />
          Exit Game
        </button>
        <div className="mx-auto pr-24 font-bold text-slate-800 uppercase tracking-widest text-sm md:text-base">
          {quiz.title}
        </div>
      </header>

      {/* Main Game Grid */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto p-2 md:p-4 flex flex-col min-h-0">
        <div className="flex-1 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="h-full grid grid-cols-5 grid-rows-[auto_repeat(5,1fr)] divide-x divide-slate-200">
            {/* Category Headers */}
            {quiz.categories.map((category, idx) => (
              <div key={idx} className="bg-slate-800 p-2 flex items-center justify-center text-center border-b-4 border-teal-500">
                <h3 className="text-white font-bold text-[10px] sm:text-xs md:text-sm lg:text-lg uppercase tracking-tight leading-tight">
                  {category.title}
                </h3>
              </div>
            ))}

            {/* Questions Grid */}
            {Array.from({ length: 5 }).map((_, questionIdx) => (
              <React.Fragment key={`row-${questionIdx}`}>
                {quiz.categories.map((category, catIdx) => {
                  const question = category.questions[questionIdx];
                  const qId = getQuestionId(catIdx, questionIdx);
                  const isCompleted = completedQuestions.has(qId);
                  // Safety check if question exists (in case quiz data is sparse)
                  if (!question) return <div key={`${catIdx}-${questionIdx}`} className="bg-slate-100" />;

                  return (
                    <div 
                      key={`${catIdx}-${questionIdx}`}
                      className="w-full h-full border-b border-slate-200 last:border-b-0 relative"
                    >
                      <button
                        onClick={() => handleCardClick(catIdx, questionIdx)}
                        disabled={isCompleted}
                        className={`
                          w-full h-full flex items-center justify-center
                          text-2xl md:text-3xl lg:text-5xl font-bold font-mono transition-all duration-200
                          ${isCompleted 
                            ? 'text-slate-200 cursor-not-allowed bg-slate-50' 
                            : 'text-slate-700 hover:bg-teal-50 hover:text-teal-600 cursor-pointer hover:scale-110 active:scale-95'}
                        `}
                      >
                        {isCompleted ? '' : question.points}
                      </button>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="shrink-0 w-full max-w-[1920px] mx-auto px-4 pb-2">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
          <div className="hidden lg:block">
              <Logo />
          </div>
          <div className="flex-1 w-full max-w-4xl">
              <ScoreBoard 
                teams={teams} 
                onUpdateScore={handleScoreUpdate}
                onUpdateName={handleUpdateName}
                onAddTeam={handleAddTeam}
                onRemoveTeam={handleRemoveTeam}
              />
          </div>
          <div className="hidden lg:block">
              <Logo />
          </div>
          <div className="lg:hidden transform scale-75">
              <Logo />
          </div>
        </div>
      </footer>

      {activeQuestion && quiz.categories[activeQuestion.catIdx] && (
        <QuestionModal
          isOpen={!!activeQuestion}
          questionData={quiz.categories[activeQuestion.catIdx].questions[activeQuestion.qIdx]}
          categoryTitle={quiz.categories[activeQuestion.catIdx].title}
          onClose={handleModalClose}
          onComplete={handleQuestionComplete}
        />
      )}
    </div>
  );
};
