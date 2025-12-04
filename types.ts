export interface Question {
  points: number;
  question: string;
  subtext?: string; // For instructions like "So'roqqa aylantiring"
  answer: string;
}

export interface Category {
  title: string;
  questions: Question[];
}

export interface Team {
  id: number;
  name: string;
  score: number;
}
