import React, { useState } from 'react';
import { Plus, Play, LogOut, Mail, Lock, X, ArrowRight } from 'lucide-react';
import { Quiz } from '../types';
import { Logo } from './Logo';

interface DashboardProps {
  quizzes: Quiz[];
  onSelectQuiz: (quiz: Quiz) => void;
  onCreateQuiz: () => void;
  isLoggedIn: boolean;
  userEmail?: string;
  onAuth: (type: 'LOGIN' | 'SIGNUP', email: string, password: string) => Promise<void>;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  quizzes, 
  onSelectQuiz, 
  onCreateQuiz,
  isLoggedIn,
  userEmail,
  onAuth,
  onLogout
}) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    await onAuth(isSignUp ? 'SIGNUP' : 'LOGIN', email, password);
    setIsLoading(false);
    setShowAuthModal(false);
    // Reset fields
    setEmail('');
    setPassword('');
  };

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
              onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 text-white hover:bg-slate-900 transition-all shadow-sm hover:shadow-md font-bold text-sm"
            >
              <Mail size={16} />
              <span>Sign In with Email</span>
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

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative border border-slate-100">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={20} />
            </button>
            
            <div className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  {isSignUp ? 'Sign up to save your quizzes to the cloud' : 'Sign in to access your quizzes'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1 ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-transparent rounded-lg text-teal-300 placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all font-medium"
                      placeholder="teacher@school.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-transparent rounded-lg text-teal-300 placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all font-bold tracking-widest"
                      placeholder="••••••••"
                      minLength={6}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-black transition-colors flex items-center justify-center gap-2 mt-4 shadow-lg shadow-slate-200/50"
                >
                  {isLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                  {!isLoading && <ArrowRight size={18} />}
                </button>
              </form>

              <div className="mt-6 text-center pt-4 border-t border-slate-100">
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors"
                >
                  {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};