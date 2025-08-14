import React from 'react';
import { Filters, Category } from '../types';

interface FilterControlsProps {
    filters: Filters;
    onFilterChange: React.Dispatch<React.SetStateAction<Filters>>;
    categories: Category[];
}

const FilterControls: React.FC<FilterControlsProps> = ({ filters, onFilterChange, categories }) => {
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onFilterChange(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">دسته‌بندی</label>
                <select 
                    id="category" 
                    name="category"
                    value={filters.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                    <option value="all">همه دسته‌بندی‌ها</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="dateFrom" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">از تاریخ</label>
                <input 
                    type="date" 
                    id="dateFrom" 
                    name="dateFrom"
                    value={filters.dateFrom}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="dateTo" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">تا تاریخ</label>
                <input 
                    type="date" 
                    id="dateTo"
                    name="dateTo"
                    value={filters.dateTo}
                    onChange={handleInputChange} 
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
            </div>
        </div>
    );
};

export default FilterControls;