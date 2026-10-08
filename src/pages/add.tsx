import { useRouter } from "next/router";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Layout from "~/components/Layout";
import { useExpenses } from "~/context/ExpenseContext";
import { CATEGORIES, type Category } from "~/types";
import { todayISO } from "~/utils/money";

type FormState = {
  description: string;
  amount: string;
  category: Category;
  date: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const validate = (form: FormState): FormErrors => {
  const errors: FormErrors = {};
  if (!form.description.trim()) errors.description = "Please enter a description.";
  const amount = Number(form.amount);
  if (!form.amount || Number.isNaN(amount) || amount <= 0) {
    errors.amount = "Amount must be a number greater than 0.";
  }
  if (!form.date) errors.date = "Please pick a date.";
  return errors;
};

const AddExpensePage = () => {
  const router = useRouter();
  const { dispatch } = useExpenses();
  const [form, setForm] = useState<FormState>({
    description: "",
    amount: "",
    category: "Food",
    date: todayISO(),
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    dispatch({
      type: "add",
      payload: {
        id: crypto.randomUUID(),
        description: form.description.trim(),
        amount: Math.round(Number(form.amount) * 100) / 100,
        category: form.category,
        date: form.date,
      },
    });
    router.push("/");
  };

  return (
    <Layout title="Add expense">
      <h1>Add expense</h1>
      <form className="card form" onSubmit={handleSubmit} noValidate>
        <label>
          Description
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="e.g. Groceries"
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </label>

        <label>
          Amount (AUD)
          <input
            name="amount"
            type="number"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
          />
          {errors.amount && <span className="error">{errors.amount}</span>}
        </label>

        <label>
          Category
          <select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label>
          Date
          <input name="date" type="date" value={form.date} onChange={handleChange} />
          {errors.date && <span className="error">{errors.date}</span>}
        </label>

        <div className="form-actions">
          <button type="button" className="btn secondary" onClick={() => router.back()}>
            Cancel
          </button>
          <button type="submit" className="btn">
            Save expense
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default AddExpensePage;
