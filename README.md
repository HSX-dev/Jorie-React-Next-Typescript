# Budget Buddy 💰

A personal expense tracker made with React, Next.js and TypeScript.

## What it does

- **Dashboard**: total spent, this month's spending, number of entries, a bar chart by category, and a searchable/filterable expense table
- **Add expense**: a form with validation (description, amount, category, date)
- **Tips**: a statically generated page of budgeting tips
- Expenses are saved in the browser (localStorage), so they're still there after a refresh

## Tech used

- **React**: function components, `useState`, `useMemo`, `useReducer` and the Context API (`src/context/ExpenseContext.tsx`)
- **Next.js**: Pages Router (`src/pages`), client navigation with `next/link` and `next/router`, `getStaticProps` (static generation) on `/tips`, and an API route at `/api/tips`
- **TypeScript**: strict mode, a discriminated union for reducer actions, `as const` category list with derived types, and typed Next.js helpers (`AppProps`, `GetStaticProps`, `NextApiRequest`)

## Project structure

```
src/
  components/   UI pieces (Layout, SummaryCard, CategoryChart, ExpenseTable)
  context/      Expense state (Context + useReducer + localStorage)
  data/         Static tips content
  pages/        Routes: /, /add, /tips and /api/tips
  styles/       Global CSS
  types/        Shared TypeScript types
  utils/        Money formatting and calculations
```

## Running it

```bash
npm install
npm run dev
```

Then go to http://localhost:3001

Other scripts:

- `npm run build`: production build
- `npm run start`: run the production build
- `npm run typecheck`: run the TypeScript compiler
