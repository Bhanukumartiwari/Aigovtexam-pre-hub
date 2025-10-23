import React from 'react';

interface HeaderProps {
  mode: 'quiz' | 'ai';
  setMode: (mode: 'quiz' | 'ai') => void;
}

const Header: React.FC<HeaderProps> = ({ mode, setMode }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
          <span className="text-orange-500">GovExam</span> <span className="text-blue-800">Prep</span> <span className="text-green-600">India</span>
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          Your Ultimate Practice Hub for Indian Government Exams
        </p>
        <div className="mt-6 flex justify-center gap-2 rounded-lg bg-slate-100 p-1.5">
          <button
            onClick={() => setMode('quiz')}
            className={`w-full px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none ${
              mode === 'quiz' ? 'bg-white text-blue-600 shadow' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Practice Quiz
          </button>
          <button
            onClick={() => setMode('ai')}
            className={`w-full px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none ${
              mode === 'ai' ? 'bg-white text-blue-600 shadow' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            AI Assistant
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;