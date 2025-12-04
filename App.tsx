import React, { useState } from 'react';
import { GAME_DATA } from './constants';
import { Logo } from './components/Logo';
import { ScoreBoard } from './components/ScoreBoard';
import { QuestionModal } from './components/QuestionModal';
import { Team } from './types';

// Helper to generate unique ID for questions based on index
const getQuestionId = (catIdx: number, qIdx: number) => `${catIdx}-${qIdx}`;

const App: React.FC = () => {
  // State
  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: 'Team 1', score: 0 },
    { id: 2, name: 'Team 2', score: 0 },
    { id: 3, name: 'Team 3', score: 0 },
    { id: 4, name: 'Team 4', score: 0 },
  ]);

  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [activeQuestion, setActiveQuestion] = useState<{ catIdx: number; qIdx: number } | null>(null);

  // Handlers
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
      
      {/* Main Game Grid - Takes available space */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto p-2 md:p-4 flex flex-col min-h-0">
        <div className="flex-1 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
          
          {/* Grid Layout: Auto header row + 5 equal fraction rows */}
          <div className="h-full grid grid-cols-5 grid-rows-[auto_repeat(5,1fr)] divide-x divide-slate-200">
            
            {/* Category Headers */}
            {GAME_DATA.map((category, idx) => (
              <div key={idx} className="bg-slate-800 p-2 flex items-center justify-center text-center border-b-4 border-teal-500">
                <h3 className="text-white font-bold text-[10px] sm:text-xs md:text-sm lg:text-lg uppercase tracking-tight leading-tight">
                  {category.title}
                </h3>
              </div>
            ))}

            {/* Questions Grid */}
            {Array.from({ length: 5 }).map((_, questionIdx) => (
              <React.Fragment key={`row-${questionIdx}`}>
                {GAME_DATA.map((category, catIdx) => {
                  const question = category.questions[questionIdx];
                  const qId = getQuestionId(catIdx, questionIdx);
                  const isCompleted = completedQuestions.has(qId);
                  // const isActive = activeQuestion?.catIdx === catIdx && activeQuestion?.qIdx === questionIdx;

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
        </main>

        {/* Footer Area: Scoreboard and Logos */}
        <footer className="shrink-0 w-full max-w-[1920px] mx-auto px-4 pb-2">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
            {/* Left Logo - Hidden on mobile, visible on large screens */}
            <div className="hidden lg:block">
               <Logo />
            </div>

            {/* Scoreboard - Centered */}
            <div className="flex-1 w-full max-w-4xl">
               <ScoreBoard 
                 teams={teams} 
                 onUpdateScore={handleScoreUpdate}
                 onUpdateName={handleUpdateName}
                 onAddTeam={handleAddTeam}
                 onRemoveTeam={handleRemoveTeam}
               />
            </div>

            {/* Right Logo - Hidden on mobile, visible on large screens */}
            <div className="hidden lg:block">
               <Logo />
            </div>

            {/* Mobile Logo (shown below scoreboard on small screens) */}
            <div className="lg:hidden transform scale-75">
               <Logo />
            </div>
          </div>
          
          <div className="text-center text-slate-400 text-[10px] mt-1">
            <p>© {new Date().getFullYear()} Al-Xorazmiy School. English Grammar Game.</p>
          </div>
        </footer>

      {/* Modals */}
      {activeQuestion && (
        <QuestionModal
          isOpen={!!activeQuestion}
          questionData={GAME_DATA[activeQuestion.catIdx].questions[activeQuestion.qIdx]}
          categoryTitle={GAME_DATA[activeQuestion.catIdx].title}
          onClose={handleModalClose}
          onComplete={handleQuestionComplete}
        />
      )}
    </div>
  );
};

export default App;