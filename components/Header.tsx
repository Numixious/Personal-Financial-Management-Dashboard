import React from 'react';
import { PlusCircleIcon, SunIcon, MoonIcon, SparklesIcon, SpinnerIcon } from './shared/Icons';

interface HeaderProps {
    onAddTransaction: () => void;
    onGenerateReport: () => void;
    isGenerating: boolean;
    theme: string;
    setTheme: (theme: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTransaction, onGenerateReport, isGenerating, theme, setTheme }) => {
    
    const handleThemeToggle = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">
                    داشبورد مالی
                </h1>
                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        onClick={handleThemeToggle}
                        className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors"
                        aria-label="تغییر تم"
                    >
                        {theme === 'dark' ? (
                            <SunIcon className="w-6 h-6 text-yellow-400" />
                        ) : (
                            <MoonIcon className="w-6 h-6 text-slate-700" />
                        )}
                    </button>
                    <button
                        onClick={onGenerateReport}
                        disabled={isGenerating}
                        className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
                        aria-label="دریافت گزارش هوشمند"
                    >
                        {isGenerating ? <SpinnerIcon className="w-5 h-5" /> : <SparklesIcon className="w-5 h-5" />}
                        <span className="hidden sm:inline text-sm font-medium">{isGenerating ? 'در حال تولید...' : 'گزارش هوشمند'}</span>
                    </button>
                    <button
                        onClick={onAddTransaction}
                        className="flex items-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors"
                    >
                        <PlusCircleIcon className="w-5 h-5" />
                        <span className="hidden sm:inline text-sm font-medium">افزودن تراکنش</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;