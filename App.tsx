import React, { useState, useMemo, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Transaction, TransactionType, Category, Filters } from './types';
import { MOCK_TRANSACTIONS, allCategories } from './constants';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import FinancialCharts from './components/FinancialCharts';
import FilterControls from './components/FilterControls';
import ReportModal from './components/ReportModal';

const App: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const savedTransactions = localStorage.getItem('transactions');
        return savedTransactions ? JSON.parse(savedTransactions) : MOCK_TRANSACTIONS;
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [generatedReport, setGeneratedReport] = useState('');
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const [filters, setFilters] = useState<Filters>({
        category: 'all',
        dateFrom: thirtyDaysAgo.toISOString().split('T')[0],
        dateTo: new Date().toISOString().split('T')[0],
    });
    
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleOpenModal = (transaction: Transaction | null = null) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTransaction(null);
    };

    const handleSaveTransaction = (transaction: Omit<Transaction, 'id'>) => {
        if (editingTransaction) {
            setTransactions(transactions.map(t => t.id === editingTransaction.id ? { ...transaction, id: t.id } : t));
        } else {
            setTransactions([...transactions, { ...transaction, id: Date.now().toString() }]);
        }
        handleCloseModal();
    };

    const handleDeleteTransaction = (id: string) => {
        if (window.confirm('آیا از حذف این تراکنش اطمینان دارید؟')) {
            setTransactions(transactions.filter(t => t.id !== id));
        }
    };

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            const transactionDate = new Date(t.date);
            const fromDate = new Date(filters.dateFrom);
            const toDate = new Date(filters.dateTo);
            toDate.setHours(23, 59, 59, 999); // Include the whole end day

            const isDateInRange = transactionDate >= fromDate && transactionDate <= toDate;
            const isCategoryMatch = filters.category === 'all' || t.category === filters.category;
            
            return isDateInRange && isCategoryMatch;
        }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [transactions, filters]);

    const handleGenerateReport = async () => {
        if (!filteredTransactions.length) {
            alert('برای تولید گزارش، ابتدا باید تراکنشی در بازه زمانی انتخاب شده وجود داشته باشد.');
            return;
        }
    
        setIsGeneratingReport(true);
        setGeneratedReport('');
    
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
            const prompt = `
            شما یک مشاور مالی متخصص هستید. لطفاً بر اساس داده‌های تراکنش زیر، یک تحلیل جامع و گزارش مالی به زبان فارسی ارائه دهید.
            گزارش شما باید شامل موارد زیر باشد:
            1.  **خلاصه وضعیت مالی:** یک نگاه کلی به درآمد، هزینه و مانده حساب در بازه زمانی انتخاب شده.
            2.  **تحلیل هزینه‌ها:** شناسایی بزرگترین دسته‌های هزینه و ارائه دیدگاه در مورد عادات خرج کردن.
            3.  **تحلیل درآمدها:** بررسی منابع اصلی درآمد.
            4.  **نکات و پیشنهادات:** ارائه توصیه‌های عملی برای بهبود وضعیت مالی، مانند راه‌های پس‌انداز یا بهینه‌سازی بودجه.
    
            پاسخ باید به صورت متنی و با قالب‌بندی مناسب (استفاده از عنوان‌ها و لیست‌ها) باشد.
    
            داده‌های تراکنش (JSON):
            ${JSON.stringify(filteredTransactions, null, 2)}
            `;
    
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
    
            setGeneratedReport(response.text);
            setIsReportModalOpen(true);
    
        } catch (error) {
            console.error("Error generating report:", error);
            alert('خطا در ارتباط با سرویس هوش مصنوعی. لطفاً دوباره تلاش کنید.');
        } finally {
            setIsGeneratingReport(false);
        }
    };

    const handleCloseReportModal = () => {
        setIsReportModalOpen(false);
        setGeneratedReport('');
    };

    const { totalIncome, totalExpenses, balance } = useMemo(() => {
        let income = 0;
        let expenses = 0;
        filteredTransactions.forEach(t => {
            if (t.type === TransactionType.INCOME) {
                income += t.amount;
            } else {
                expenses += t.amount;
            }
        });
        return { totalIncome: income, totalExpenses: expenses, balance: income - expenses };
    }, [filteredTransactions]);

    return (
        <div className="min-h-screen text-slate-800 dark:text-slate-200">
            <Header 
                onAddTransaction={() => handleOpenModal()} 
                theme={theme} 
                setTheme={setTheme}
                onGenerateReport={handleGenerateReport}
                isGenerating={isGeneratingReport}
            />
            <main className="container mx-auto p-4 md:p-6 lg:p-8">
                <div className="grid grid-cols-1 gap-6">
                    <SummaryCards income={totalIncome} expenses={totalExpenses} balance={balance} />
                    
                    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
                       <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-200">فیلترها</h2>
                       <FilterControls filters={filters} onFilterChange={setFilters} categories={allCategories} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <TransactionList 
                                transactions={filteredTransactions} 
                                onEdit={handleOpenModal} 
                                onDelete={handleDeleteTransaction} 
                            />
                        </div>
                        <div className="lg:col-span-1">
                            <FinancialCharts transactions={filteredTransactions} />
                        </div>
                    </div>
                </div>
            </main>

            {isModalOpen && (
                <TransactionForm
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSaveTransaction}
                    transaction={editingTransaction}
                />
            )}

            {isReportModalOpen && (
                <ReportModal
                    isOpen={isReportModalOpen}
                    onClose={handleCloseReportModal}
                    reportContent={generatedReport}
                />
            )}
        </div>
    );
};

export default App;