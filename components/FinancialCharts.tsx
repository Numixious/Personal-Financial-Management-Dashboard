import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Transaction, TransactionType, Category } from '../types';
import { categoryColors } from '../constants';

interface FinancialChartsProps {
    transactions: Transaction[];
}

const formatCurrency = (amount: number) => {
    return `${new Intl.NumberFormat('fa-IR').format(amount)} تومان`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        if (payload[0].name) { // Pie chart tooltip
            return (
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-2 border border-slate-200 dark:border-slate-600 rounded shadow-lg">
                    <p className="label text-sm text-slate-700 dark:text-slate-200">{`${payload[0].name} : ${formatCurrency(payload[0].value)}`}</p>
                </div>
            );
        } else { // Bar chart tooltip
             return (
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-2 border border-slate-200 dark:border-slate-600 rounded shadow-lg">
                    <p className="label text-sm font-bold text-slate-700 dark:text-slate-200">{label}</p>
                    {payload.map((pld: any, index: number) => (
                         <p key={index} style={{ color: pld.color }} className="text-xs">{`${pld.name}: ${formatCurrency(pld.value)}`}</p>
                    ))}
                </div>
            );
        }
    }
    return null;
};

const FinancialCharts: React.FC<FinancialChartsProps> = ({ transactions }) => {
    const { expenseData, incomeVsExpenseData } = useMemo(() => {
        const expenseSummary: { [key in Category]?: number } = {};
        const incomeVsExpenseSummary: { [key: string]: { name: string; income: number; expense: number } } = {};

        transactions.forEach(t => {
            const monthKey = t.date.substring(0, 7); // Group by YYYY-MM for sorting
            if (!incomeVsExpenseSummary[monthKey]) {
                incomeVsExpenseSummary[monthKey] = { 
                    name: new Date(t.date).toLocaleString('fa-IR', { month: 'short', year: '2-digit' }),
                    income: 0, 
                    expense: 0 
                };
            }

            if (t.type === TransactionType.EXPENSE) {
                expenseSummary[t.category] = (expenseSummary[t.category] || 0) + t.amount;
                incomeVsExpenseSummary[monthKey].expense += t.amount;
            } else {
                incomeVsExpenseSummary[monthKey].income += t.amount;
            }
        });

        const expenseData = Object.entries(expenseSummary).map(([name, value]) => ({ name: name as Category, value }));
        
        const incomeVsExpenseData = Object.keys(incomeVsExpenseSummary)
            .sort() // Sort by YYYY-MM key
            .map(key => incomeVsExpenseSummary[key]);

        return { expenseData, incomeVsExpenseData };
    }, [transactions]);

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg h-80">
                <h3 className="text-lg font-bold mb-4 text-slate-700 dark:text-slate-200">پراکندگی هزینه‌ها</h3>
                {expenseData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={expenseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" labelLine={false}>
                                {expenseData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={categoryColors[entry.name] || '#71717a'} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                ) : <p className="text-center text-slate-500 dark:text-slate-400 pt-16">داده‌ای برای نمایش هزینه‌ها وجود ندارد.</p>}
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg h-80">
                <h3 className="text-lg font-bold mb-4 text-slate-700 dark:text-slate-200">درآمد در مقابل هزینه</h3>
                 {incomeVsExpenseData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={incomeVsExpenseData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis orientation="right" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${new Intl.NumberFormat('fa-IR').format(Number(value) / 1000000)}م`} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }}/>
                            <Legend wrapperStyle={{fontSize: "12px", direction: 'rtl'}}/>
                            <Bar name="درآمد" dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} />
                            <Bar name="هزینه" dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : <p className="text-center text-slate-500 dark:text-slate-400 pt-16">داده‌ای برای نمایش وجود ندارد.</p>}
            </div>
        </div>
    );
};

export default FinancialCharts;