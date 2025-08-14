export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export enum Category {
  // Expenses
  FOOD = 'غذا',
  TRANSPORT = 'حمل‌ونقل',
  RENT = 'اجاره',
  UTILITIES = 'خدمات',
  ENTERTAINMENT = 'سرگرمی',
  HEALTHCARE = 'سلامت',
  SHOPPING = 'خرید',
  EDUCATION = 'آموزش',
  TRAVEL = 'سفر',
  OTHER_EXPENSE = 'سایر هزینه‌ها',
  // Incomes
  SALARY = 'حقوق',
  FREELANCE = 'پروژه آزاد',
  INVESTMENTS = 'سرمایه‌گذاری',
  GIFTS = 'هدایا',
  OTHER_INCOME = 'سایر درآمدها',
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string; // ISO 8601 format
  type: TransactionType;
  category: Category;
}

export interface Filters {
    category: Category | 'all';
    dateFrom: string;
    dateTo: string;
}