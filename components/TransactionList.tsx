import React from 'react';
import { Transaction, TransactionType } from '../types';
import { PencilIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from './shared/Icons';
import { categoryColors } from '../constants';

interface TransactionListProps {
    transactions: Transaction[];
    onEdit: (transaction: Transaction) => void;
    onDelete: (id: string) => void;
}

const formatCurrency = (amount: number) => {
    return `${new Intl.NumberFormat('fa-IR').format(amount)} تومان`;
};

const TransactionItem: React.FC<{ transaction: Transaction; onEdit: (transaction: Transaction) => void; onDelete: (id: string) => void }> = ({ transaction, onEdit, onDelete }) => {
    const isIncome = transaction.type === TransactionType.INCOME;
    const amountColor = isIncome ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400';
    const Icon = isIncome ? ArrowUpIcon : ArrowDownIcon;
    const categoryColor = categoryColors[transaction.category] || '#71717a';

    return (
        <li className="flex items-center p-4 space-x-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150">
            <div className="flex-shrink-0 p-3 rounded-full bg-slate-100 dark:bg-slate-700">
                <Icon className={`w-6 h-6 ${isIncome ? 'text-emerald-500' : 'text-red-500'}`} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{transaction.description}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span style={{backgroundColor: categoryColor}} className="w-2 h-2 rounded-full"></span>
                    <span>{transaction.category}</span>
                </div>
            </div>
            <div className="text-right">
                <p className={`text-sm font-bold ${amountColor}`}>{formatCurrency(transaction.amount)}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(transaction.date).toLocaleDateString('fa-IR')}</p>
            </div>
            <div className="flex items-center space-x-2 ml-4">
                <button onClick={() => onEdit(transaction)} className="p-2 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <PencilIcon className="w-5 h-5" />
                </button>
                <button onClick={() => onDelete(transaction.id)} className="p-2 text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
        </li>
    );
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
            <h2 className="text-xl font-bold p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200">
                تراکنش‌های اخیر
            </h2>
            {transactions.length > 0 ? (
                <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                    {transactions.map(t => (
                        <TransactionItem key={t.id} transaction={t} onEdit={onEdit} onDelete={onDelete} />
                    ))}
                </ul>
            ) : (
                <div className="text-center p-10">
                    <p className="text-slate-500 dark:text-slate-400">تراکنشی یافت نشد.</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500">فیلترها را تغییر دهید یا یک تراکنش جدید اضافه کنید.</p>
                </div>
            )}
        </div>
    );
};

export default TransactionList;