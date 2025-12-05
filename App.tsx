import React, { useState, useEffect } from 'react';
import { SAMPLE_QUIZ } from './constants';
import { Quiz } from './types';
import { Dashboard } from './components/Dashboard';
import { Game } from './components/Game';
import { QuizEditor } from './components/QuizEditor';
import { supabase } from './supabaseClient';
import { User } from '@supabase/supabase-js';

type ViewState = 'DASHBOARD' | 'GAME' | 'EDITOR';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('DASHBOARD');
  const [quizzes, setQuizzes] = useState<Quiz[]>([SAMPLE_QUIZ]);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Initialize Auth Listener
  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes (sign in, sign out, refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load Quizzes (Local + Cloud)
  useEffect(() => {
    const loadQuizzes = async () => {
      let localQuizzes: Quiz[] = [];
      const savedLocal = localStorage.getItem('al_jeopardy_quizzes');
      if (savedLocal) {
        try {
          const parsed = JSON.parse(savedLocal);
          localQuizzes = parsed;
        } catch (e) {
          console.error("Failed to parse local quizzes", e);
        }
      }

      // If logged in, fetch from Supabase
      if (user) {
        try {
          const { data, error } = await supabase
            .from('quizzes')
            .select('id, title, categories, created_at')
            .order('created_at', { ascending: false });

          if (!error && data) {
            const cloudQuizzes = data.map((q: any) => ({
              id: q.id,
              title: q.title,
              categories: q.categories,
              createdAt: q.created_at,
            })) as Quiz[];
            
            setQuizzes([...cloudQuizzes]);
          } else {
             // Fallback to local if DB fails or empty
             setQuizzes(localQuizzes.length > 0 ? localQuizzes : [SAMPLE_QUIZ]);
          }
        } catch (err) {
          console.error("Supabase fetch error:", err);
          setQuizzes(localQuizzes.length > 0 ? localQuizzes : [SAMPLE_QUIZ]);
        }
      } else {
        // Not logged in: Use Local Storage
        const hasSample = localQuizzes.some(q => q.id === SAMPLE_QUIZ.id);
        if (!hasSample && localQuizzes.length === 0) {
           setQuizzes([SAMPLE_QUIZ]);
        } else if (!hasSample) {
           setQuizzes([SAMPLE_QUIZ, ...localQuizzes]);
        } else {
           setQuizzes(localQuizzes);
        }
      }
    };

    loadQuizzes();
  }, [user]);

  // Persist Quizzes Local Storage (Backup/Guest)
  useEffect(() => {
    if (quizzes.length > 0) {
      localStorage.setItem('al_jeopardy_quizzes', JSON.stringify(quizzes));
    }
  }, [quizzes]);

  const handleCreateQuiz = () => {
    setView('EDITOR');
  };

  const handleSaveQuiz = async (newQuiz: Quiz) => {
    // Optimistic Update
    setQuizzes((prev) => [newQuiz, ...prev]);
    setView('DASHBOARD');

    if (user) {
      // Save to Supabase
      try {
        const { error } = await supabase
          .from('quizzes')
          .upsert({
            id: newQuiz.id,
            title: newQuiz.title,
            categories: newQuiz.categories,
            created_at: newQuiz.createdAt,
            user_id: user.id
          });
        
        if (error) {
          console.error("Error saving quiz to Supabase:", error);
          alert("Failed to save to cloud. Quiz is saved locally.");
        }
      } catch (err) {
        console.error("Error saving quiz:", err);
      }
    }
  };

  const handleSelectQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setView('GAME');
  };

  const handleExitGame = () => {
    setActiveQuiz(null);
    setView('DASHBOARD');
  };

  const handleAuth = async (type: 'LOGIN' | 'SIGNUP', email: string, password: string) => {
    try {
      if (type === 'SIGNUP') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        // Supabase auto-signs in after signup unless email confirmation is enabled and required
        alert("Account created! You are now signed in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      alert(error.message || "Authentication failed");
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error);
    }
    // Clear quizzes to force re-fetch or reset to local
    setQuizzes([SAMPLE_QUIZ]);
    setView('DASHBOARD');
  };

  if (view === 'GAME' && activeQuiz) {
    return <Game quiz={activeQuiz} onExit={handleExitGame} />;
  }

  if (view === 'EDITOR') {
    return (
      <QuizEditor 
        onSave={handleSaveQuiz} 
        onCancel={() => setView('DASHBOARD')} 
      />
    );
  }

  return (
    <Dashboard 
      quizzes={quizzes}
      onSelectQuiz={handleSelectQuiz}
      onCreateQuiz={handleCreateQuiz}
      isLoggedIn={!!user}
      userEmail={user?.email}
      onAuth={handleAuth}
      onLogout={handleLogout}
    />
  );
};

export default App;