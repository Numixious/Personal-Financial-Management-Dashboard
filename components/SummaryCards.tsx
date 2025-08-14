import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, ScaleIcon } from './shared/Icons';

interface SummaryCardsProps {
    income: number;
    expenses: number;
    balance: number;
}

const formatCurrency = (amount: number) => {
    return `${new Intl.NumberFormat('fa-IR').format(amount)} تومان`;
};

const SummaryCard: React.FC<{ title: string; amount: number; icon: React.ReactNode; colorClass: string }> = ({ title, amount, icon, colorClass }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg flex items-center gap-4">
        <div className={`p-3 rounded-full ${colorClass}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
            <p className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{formatCurrency(amount)}</p>
        </div>
    </div>
);


const SummaryCards: React.FC<SummaryCardsProps> = ({ income, expenses, balance }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SummaryCard 
                title="مجموع درآمد"
                amount={income}
                icon={<ArrowUpIcon className="w-6 h-6 text-white"/>}
                colorClass="bg-emerald-500"
            />
            <SummaryCard 
                title="مجموع هزینه‌ها"
                amount={expenses}
                icon={<ArrowDownIcon className="w-6 h-6 text-white"/>}
                colorClass="bg-red-500"
            />
            <SummaryCard 
                title="تراز نهایی"
                amount={balance}
                icon={<ScaleIcon className="w-6 h-6 text-white"/>}
                colorClass={balance >= 0 ? "bg-blue-500" : "bg-orange-500"}
            />
        </div>
    );
};

export default SummaryCards;