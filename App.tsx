import React, { useState, useMemo, lazy, Suspense } from 'react';
import { questions as allQuestions } from './data/questions';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoryFilter from './components/CategoryFilter';
import QuestionCard from './components/QuestionCard';
import QuizControls from './components/QuizControls';

const AIAssistant = lazy(() => import('./components/AIAssistant'));

type AppMode = 'quiz' | 'ai';

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center py-16">
    <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
  </div>
);


const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('quiz');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(allQuestions.map(q => q.category))];
    return uniqueCategories.sort();
  }, []);
  
  const filteredQuestions = useMemo(() => {
    if (currentCategory === 'All') {
      return allQuestions;
    }
    return allQuestions.filter(q => q.category === currentCategory);
  }, [currentCategory]);

  const handleSelectCategory = (category: string) => {
    setCurrentCategory(category);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const currentQuestion = filteredQuestions[currentIndex];

  return (
    <div className="flex flex-col min-h-screen">
      <Header mode={mode} setMode={setMode} />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {mode === 'quiz' ? (
          <>
            <CategoryFilter
              categories={categories}
              selectedCategory={currentCategory}
              onSelectCategory={handleSelectCategory}
            />
            
            {filteredQuestions.length > 0 ? (
              <div className="animate-fade-in">
                <QuestionCard
                  question={currentQuestion}
                  questionNumber={currentIndex + 1}
                  totalQuestions={filteredQuestions.length}
                />
                <QuizControls
                  onPrev={handlePrev}
                  onNext={handleNext}
                  currentIndex={currentIndex}
                  totalQuestions={filteredQuestions.length}
                />
              </div>
            ) : (
              <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-slate-700">No questions found!</h3>
                <p className="text-slate-500 mt-2">Please select another category or check back later.</p>
              </div>
            )}
          </>
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            <AIAssistant />
          </Suspense>
        )}
      </main>
      <Footer />
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;