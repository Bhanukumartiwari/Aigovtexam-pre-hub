
import React, { useState, useEffect } from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, questionNumber, totalQuestions }) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  useEffect(() => {
    setIsAnswerVisible(false);
  }, [question.id]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-2xl mx-auto transform hover:shadow-2xl transition-shadow duration-300">
      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">{question.category}</span>
          <span className="text-sm font-medium text-slate-500">
            Question {questionNumber} / {totalQuestions}
          </span>
        </div>
        <p className="text-lg font-medium text-slate-800 mb-6 min-h-[6rem]">
          {question.question}
        </p>
        <div className="text-center">
            <button
            onClick={() => setIsAnswerVisible(!isAnswerVisible)}
            className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 transition-all"
            >
            {isAnswerVisible ? 'Hide Answer' : 'Show Answer'}
            </button>
        </div>

        {isAnswerVisible && (
          <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
            <p className="text-green-800">{question.answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
