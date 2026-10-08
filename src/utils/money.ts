import type { Category, Expense } from "~/types";

const currency = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

export const formatMoney = (value: number): string => currency.format(value);

export const sumOf = (expenses: Expense[]): number =>
  expenses.reduce((total, e) => total + e.amount, 0);

export const totalsByCategory = (
  expenses: Expense[]
): Partial<Record<Category, number>> =>
  expenses.reduce<Partial<Record<Category, number>>>((acc, e) => {
    acc[e.category] = (acc[e.category] ?? 0) + e.amount;
    return acc;
  }, {});

export const isThisMonth = (isoDate: string): boolean => {
  const now = new Date();
  const [year, month] = isoDate.split("-").map(Number);
  return year === now.getFullYear() && month === now.getMonth() + 1;
};

export const todayISO = (): string => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
