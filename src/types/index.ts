export const CATEGORIES = [
  "Food",
  "Transport",
  "Housing",
  "Entertainment",
  "Health",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Expense = {
  id: string;
  description: string;
  amount: number;
  category: Category;
  date: string; // YYYY-MM-DD
};

export type ExpenseAction =
  | { type: "add"; payload: Expense }
  | { type: "remove"; id: string }
  | { type: "clear" }
  | { type: "load"; payload: Expense[] };

export type Tip = {
  id: number;
  title: string;
  body: string;
};
