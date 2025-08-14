import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType, Category } from '../types';
import { incomeCategories, expenseCategories } from '../constants';
import Modal from './shared/Modal';

interface TransactionFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (transaction: Omit<Transaction, 'id'>) => void;
    transaction: Transaction | null;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ isOpen, onClose, onSave, transaction }) => {
    const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState<string>('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [category, setCategory] = useState<Category>(expenseCategories[0]);

    useEffect(() => {
        if (transaction) {
            setType(transaction.type);
            setDescription(transaction.description);
            setAmount(String(transaction.amount));
            setDate(transaction.date);
            setCategory(transaction.category);
        } else {
            // Reset form
            setType(TransactionType.EXPENSE);
            setDescription('');
            setAmount('');
            setDate(new Date().toISOString().split('T')[0]);
            setCategory(expenseCategories[0]);
        }
    }, [transaction, isOpen]);
    
    useEffect(() => {
        // When type changes, reset category to the first one of the new list
        if (type === TransactionType.INCOME) {
            if (!incomeCategories.includes(category)) {
                setCategory(incomeCategories[0]);
            }
        } else {
            if (!expenseCategories.includes(category)) {
                setCategory(expenseCategories[0]);
            }
        }
    }, [type, category]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !amount || parseFloat(amount) <= 0) {
            alert('لطفاً تمام فیلدها را به درستی پر کنید.');
            return;
        }
        onSave({
            description,
            amount: parseFloat(amount),
            date,
            type,
            category,
        });
    };
    
    const categoryList = type === TransactionType.INCOME ? incomeCategories : expenseCategories;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={transaction ? 'ویرایش تراکنش' : 'افزودن تراکنش'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">نوع تراکنش</label>
                    <div className="mt-1 grid grid-cols-2 gap-2 rounded-md bg-slate-200 dark:bg-slate-700 p-1">
                        <button type="button" onClick={() => setType(TransactionType.EXPENSE)} className={`px-3 py-1 text-sm font-medium rounded ${type === TransactionType.EXPENSE ? 'bg-white dark:bg-slate-600 shadow' : 'text-slate-600 dark:text-slate-300'}`}>هزینه</button>
                        <button type="button" onClick={() => setType(TransactionType.INCOME)} className={`px-3 py-1 text-sm font-medium rounded ${type === TransactionType.INCOME ? 'bg-white dark:bg-slate-600 shadow' : 'text-slate-600 dark:text-slate-300'}`}>درآمد</button>
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">توضیحات</label>
                    <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                </div>
                
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">مبلغ</label>
                    <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} required min="0.01" step="0.01" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">دسته‌بندی</label>
                        <select id="category" value={category} onChange={e => setCategory(e.target.value as Category)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                            {categoryList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">تاریخ</label>
                        <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:focus:ring-offset-slate-900">انصراف</button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-slate-900">{transaction ? 'به‌روزرسانی' : 'ذخیره'}</button>
                </div>
            </form>
        </Modal>
    );
};

export default TransactionForm;