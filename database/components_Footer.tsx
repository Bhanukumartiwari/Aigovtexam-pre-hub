
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-4 text-center">
        <p>&copy; {currentYear} GovExam Prep India. All Rights Reserved.</p>
        <p className="text-sm text-slate-400 mt-1">Made with dedication for aspiring candidates.</p>
      </div>
    </footer>
  );
};

export default Footer;
