export type ExpenseCategory =
  | "Food"
  | "Coffee"
  | "Groceries"
  | "Shopping"
  | "Transport"
  | "Bills"
  | "Health"
  | "Fitness"
  | "Education"
  | "Entertainment"
  | "Travel"
  | "Subscription"
  | "Investment"
  | "Savings"
  | "Insurance"
  | "Salary"
  | "Gift"
  | "Other";

export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
};