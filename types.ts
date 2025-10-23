export enum Category {
  HISTORY = "History",
  GEOGRAPHY = "Geography",
  POLITY = "Polity",
  SCIENCE = "Science",
  GENERAL_KNOWLEDGE = "General Knowledge",
  RAILWAY = "Railway",
  ECONOMICS = "Economics",
}

export interface Question {
  id: number;
  question: string;
  answer: string;
  category: Category;
}