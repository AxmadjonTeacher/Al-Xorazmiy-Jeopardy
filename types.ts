export interface Question {
  id?: string;
  points: number | string; // Points can be number or text
  question: string;
  subtext?: string;
  answer: string;
  timerDuration?: number; // Custom timer in seconds
}

export interface Category {
  id?: string;
  title: string;
  questions: Question[];
}

export interface Quiz {
  id: string;
  title: string;
  categories: Category[];
  createdAt: number;
}

export interface Team {
  id: number;
  name: string;
  score: number;
}
