
import React from 'react';

interface QuizControlsProps {
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalQuestions: number;
}

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


const QuizControls: React.FC<QuizControlsProps> = ({ onPrev, onNext, currentIndex, totalQuestions }) => {
  return (
    <div className="flex justify-between items-center w-full max-w-2xl mx-auto mt-8">
      <button
        onClick={onPrev}
        disabled={currentIndex === 0}
        className="flex items-center px-5 py-2.5 font-medium bg-white border border-slate-300 rounded-lg shadow-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ArrowLeftIcon />
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={currentIndex === totalQuestions - 1}
        className="flex items-center px-5 py-2.5 font-medium bg-white border border-slate-300 rounded-lg shadow-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default QuizControls;
