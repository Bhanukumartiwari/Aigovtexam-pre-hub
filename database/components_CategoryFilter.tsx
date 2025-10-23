
import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-slate-700 mb-4 text-center">Select a Category</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {['All', ...categories].map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              selectedCategory === category
                ? 'bg-blue-600 text-white shadow-lg transform -translate-y-1'
                : 'bg-white text-slate-700 hover:bg-slate-100 shadow'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
