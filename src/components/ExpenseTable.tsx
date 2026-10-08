import type { Expense } from "~/types";
import { formatMoney } from "~/utils/money";

type Props = {
  expenses: Expense[];
  onRemove: (id: string) => void;
};

const ExpenseTable = ({ expenses, onRemove }: Props) => {
  if (expenses.length === 0) {
    return <p className="muted">No expenses match.</p>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th className="right">Amount</th>
          <th aria-label="Actions" />
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.date}</td>
            <td>{expense.description}</td>
            <td>
              <span className="tag">{expense.category}</span>
            </td>
            <td className="right">{formatMoney(expense.amount)}</td>
            <td className="right">
              <button
                type="button"
                className="link-button"
                onClick={() => onRemove(expense.id)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;
