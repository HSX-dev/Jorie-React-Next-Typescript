import { CATEGORIES, type Category, type Expense } from "~/types";
import { formatMoney, sumOf, totalsByCategory } from "~/utils/money";

const COLORS: Record<Category, string> = {
  Food: "#f97316",
  Transport: "#3b82f6",
  Housing: "#8b5cf6",
  Entertainment: "#ec4899",
  Health: "#10b981",
  Other: "#64748b",
};

type Props = {
  expenses: Expense[];
};

const CategoryChart = ({ expenses }: Props) => {
  const totals = totalsByCategory(expenses);
  const grandTotal = sumOf(expenses);
  const rows = CATEGORIES.filter((c) => totals[c]);

  if (rows.length === 0) {
    return <p className="muted">Add some expenses to see your spending by category.</p>;
  }

  return (
    <ul className="chart">
      {rows.map((category) => {
        const amount = totals[category] ?? 0;
        const percent = Math.round((amount / grandTotal) * 100);
        return (
          <li key={category} className="chart-row">
            <span className="chart-label">{category}</span>
            <div className="chart-track">
              <div
                className="chart-fill"
                style={{ width: `${percent}%`, background: COLORS[category] }}
              />
            </div>
            <span className="chart-amount">
              {formatMoney(amount)} <small>({percent}%)</small>
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default CategoryChart;
