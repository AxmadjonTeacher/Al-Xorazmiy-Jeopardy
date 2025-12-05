import React from 'react';
import { Plus, Play, LogOut } from 'lucide-react';
import { Quiz } from '../types';
import { Logo } from './Logo';

interface DashboardProps {
  quizzes: Quiz[];
  onSelectQuiz: (quiz: Quiz) => void;
  onCreateQuiz: () => void;
  isLoggedIn: boolean;
  userEmail?: string;
  onLogin: () => void;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  quizzes, 
  onSelectQuiz, 
  onCreateQuiz,
  isLoggedIn,
  userEmail,
  onLogin,
  onLogout
}) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="transform scale-75 origin-left">
              <Logo className="!items-start" />
            </div>
          </div>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
               <div className="hidden md:flex flex-col items-end">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Signed in as</span>
                 <span className="text-sm font-medium text-slate-700">{userEmail}</span>
               </div>
               <button 
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-all"
                title="Sign Out"
              >
                <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs select-none">
                  {userEmail ? userEmail[0].toUpperCase() : 'U'}
                </div>
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button 
              onClick={onLogin}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm group"
            >
              {/* Google G Icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.63c1.61 0 3.06.56 4.21 1.64l3.16-3.16C17.45 1.14 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-bold group-hover:text-slate-900">Sign in with Google</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-6 md:p-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 min-h-[500px] flex flex-col">
          
          {/* List Header */}
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800">Your Quizzes</h2>
            <div className="text-sm text-slate-400">
              {quizzes.length} Quiz{quizzes.length !== 1 ? 'zes' : ''}
            </div>
          </div>

          {/* Quiz List */}
          <div className="flex-1">
            {quizzes.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                <span className="text-lg font-medium">No Quiz Created yet</span>
                {!isLoggedIn && (
                  <p className="text-sm text-slate-400 mt-2">Sign in to save your quizzes to the cloud.</p>
                )}
              </div>
            ) : (
              <div className="grid gap-4">
                {quizzes.map((quiz) => (
                  <button
                    key={quiz.id}
                    onClick={() => onSelectQuiz(quiz)}
                    className="group w-full text-left bg-white border border-slate-200 hover:border-teal-400 hover:shadow-md rounded-xl p-4 transition-all flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                        {quiz.title}
                      </h3>
                      <p className="text-slate-400 text-xs mt-1">
                        {new Date(quiz.createdAt).toLocaleDateString()} • {quiz.categories.length} Categories
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 group-hover:bg-teal-600 group-hover:text-white flex items-center justify-center transition-all">
                      <Play size={20} className="ml-0.5" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Create Button Area */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={onCreateQuiz}
              className="group flex items-center gap-3 bg-white border-2 border-slate-800 text-slate-800 px-6 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all shadow-sm hover:shadow-lg"
            >
              <span className="font-bold text-lg">Create Quiz</span>
              <div className="w-6 h-6 border-2 border-current rounded flex items-center justify-center group-hover:bg-white group-hover:text-slate-800 transition-colors">
                <Plus size={16} strokeWidth={3} />
              </div>
            </button>
          </div>

        </div>
      </main>
      
      <div className="py-6 text-center">
        <Logo className="scale-75 opacity-70" />
      </div>
    </div>
  );
};