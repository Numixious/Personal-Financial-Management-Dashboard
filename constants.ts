import { Category, TransactionType } from './types';

export const expenseCategories: Category[] = [
  Category.FOOD,
  Category.TRANSPORT,
  Category.RENT,
  Category.UTILITIES,
  Category.ENTERTAINMENT,
  Category.HEALTHCARE,
  Category.SHOPPING,
  Category.EDUCATION,
  Category.TRAVEL,
  Category.OTHER_EXPENSE,
];

export const incomeCategories: Category[] = [
  Category.SALARY,
  Category.FREELANCE,
  Category.INVESTMENTS,
  Category.GIFTS,
  Category.OTHER_INCOME,
];

export const allCategories: Category[] = [...expenseCategories, ...incomeCategories];

export const categoryColors: { [key in Category]?: string } = {
    [Category.FOOD]: '#f97316',
    [Category.TRANSPORT]: '#a855f7',
    [Category.RENT]: '#ef4444',
    [Category.UTILITIES]: '#3b82f6',
    [Category.ENTERTAINMENT]: '#ec4899',
    [Category.HEALTHCARE]: '#14b8a6',
    [Category.SHOPPING]: '#84cc16',
    [Category.EDUCATION]: '#d97706',
    [Category.TRAVEL]: '#0ea5e9',
    [Category.OTHER_EXPENSE]: '#71717a',
    [Category.SALARY]: '#22c55e',
    [Category.FREELANCE]: '#10b981',
    [Category.INVESTMENTS]: '#06b6d4',
    [Category.GIFTS]: '#f59e0b',
    [Category.OTHER_INCOME]: '#65a30d',
};

// Generate some realistic mock data
const today = new Date();
const getPastDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
};

export const MOCK_TRANSACTIONS: import('./types').Transaction[] = [
    { id: '1', description: 'حقوق ماهانه', amount: 50000000, date: getPastDate(15), type: TransactionType.INCOME, category: Category.SALARY },
    { id: '2', description: 'خرید از سوپرمارکت', amount: 1500750, date: getPastDate(14), type: TransactionType.EXPENSE, category: Category.FOOD },
    { id: '3', description: 'اجاره آپارتمان', amount: 12000000, date: getPastDate(14), type: TransactionType.EXPENSE, category: Category.RENT },
    { id: '4', description: 'قبض اینترنت', amount: 600000, date: getPastDate(12), type: TransactionType.EXPENSE, category: Category.UTILITIES },
    { id: '5', description: 'پروژه فریلنس', amount: 7500000, date: getPastDate(10), type: TransactionType.INCOME, category: Category.FREELANCE },
    { id: '6', description: 'شام با دوستان', amount: 850500, date: getPastDate(9), type: TransactionType.EXPENSE, category: Category.FOOD },
    { id: '7', description: 'شارژ کارت حمل و نقل', amount: 700000, date: getPastDate(8), type: TransactionType.EXPENSE, category: Category.TRANSPORT },
    { id: '8', description: 'بلیط سینما', amount: 300000, date: getPastDate(5), type: TransactionType.EXPENSE, category: Category.ENTERTAINMENT },
    { id: '9', description: 'خرید هدفون جدید', amount: 2500000, date: getPastDate(3), type: TransactionType.EXPENSE, category: Category.SHOPPING },
    { id: '10', description: 'سود سهام', amount: 1200000, date: getPastDate(2), type: TransactionType.INCOME, category: Category.INVESTMENTS },
    { id: '11', description: 'قهوه', amount: 50250, date: getPastDate(1), type: TransactionType.EXPENSE, category: Category.FOOD },
];