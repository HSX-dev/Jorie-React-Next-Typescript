import type { AppProps } from "next/app";
import { ExpenseProvider } from "~/context/ExpenseContext";
import "~/styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => (
  <ExpenseProvider>
    <Component {...pageProps} />
  </ExpenseProvider>
);

export default App;
