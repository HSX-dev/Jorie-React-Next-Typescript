import Link from "next/link";
import { useMemo, useState } from "react";
import CategoryChart from "~/components/CategoryChart";
import ExpenseTable from "~/components/ExpenseTable";
import Layout from "~/components/Layout";
import SummaryCard from "~/components/SummaryCard";
import { useExpenses } from "~/context/ExpenseContext";
import { CATEGORIES, type Category } from "~/types";
import { formatMoney, isThisMonth, sumOf } from "~/utils/money";

type CategoryFilter = Category | "All";

const DashboardPage = () => {
  const { expenses, dispatch } = useExpenses();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");

  const monthExpenses = useMemo(
    () => expenses.filter((e) => isThisMonth(e.date)),
    [expenses]
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return expenses.filter(
      (e) =>
        (category === "All" || e.category === category) &&
        e.description.toLowerCase().includes(term)
    );
  }, [expenses, search, category]);

  const handleClear = () => {
    if (window.confirm("Delete all expenses?")) dispatch({ type: "clear" });
  };

  return (
    <Layout title="Dashboard">
      <h1>Dashboard</h1>

      <div className="grid">
        <SummaryCard label="Total spent" value={formatMoney(sumOf(expenses))} />
        <SummaryCard
          label="This month"
          value={formatMoney(sumOf(monthExpenses))}
          hint={`${monthExpenses.length} expense(s)`}
        />
        <SummaryCard label="Entries" value={String(expenses.length)} />
      </div>

      <section className="card">
        <h2>Spending by category</h2>
        <CategoryChart expenses={expenses} />
      </section>

      <section className="card">
        <div className="section-head">
          <h2>Expenses</h2>
          <Link href="/add" className="btn">
            + Add expense
          </Link>
        </div>

        <div className="toolbar">
          <input
            type="search"
            placeholder="Search description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoryFilter)}
          >
            <option value="All">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <ExpenseTable
          expenses={filtered}
          onRemove={(id) => dispatch({ type: "remove", id })}
        />

        {expenses.length > 0 && (
          <button type="button" className="link-button danger" onClick={handleClear}>
            Clear all
          </button>
        )}
      </section>
    </Layout>
  );
};

export default DashboardPage;
