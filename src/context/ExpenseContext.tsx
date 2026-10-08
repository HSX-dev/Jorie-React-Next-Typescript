import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type Dispatch,
  type ReactNode,
} from "react";
import type { Expense, ExpenseAction } from "~/types";

const STORAGE_KEY = "budget-buddy:expenses";

type ExpenseContextValue = {
  expenses: Expense[];
  dispatch: Dispatch<ExpenseAction>;
};

const ExpenseContext = createContext<ExpenseContextValue | undefined>(undefined);

const expenseReducer = (state: Expense[], action: ExpenseAction): Expense[] => {
  switch (action.type) {
    case "add":
      return [action.payload, ...state];
    case "remove":
      return state.filter((e) => e.id !== action.id);
    case "clear":
      return [];
    case "load":
      return action.payload;
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, dispatch] = useReducer(expenseReducer, []);
  const [hydrated, setHydrated] = useState(false);

  // Load saved expenses once on the client.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: "load", payload: JSON.parse(saved) as Expense[] });
    } catch {
      // ignore broken or unavailable storage
    }
    setHydrated(true);
  }, []);

  // Save whenever the list changes (only after the saved data was loaded).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch {
      // storage might be full or blocked
    }
  }, [expenses, hydrated]);

  return (
    <ExpenseContext.Provider value={{ expenses, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = (): ExpenseContextValue => {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error("useExpenses must be used inside <ExpenseProvider>");
  return ctx;
};
