import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/add", label: "Add expense" },
  { href: "/tips", label: "Tips" },
];

type Props = {
  title: string;
  children: ReactNode;
};

const Layout = ({ title, children }: Props) => {
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <title>{`${title} | Budget Buddy`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <nav className="nav">
        <span className="brand">💰 Budget Buddy</span>
        <div className="nav-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "nav-link active" : "nav-link"}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
      <main className="page">{children}</main>
      <footer className="footer">Made with React, Next.js &amp; TypeScript</footer>
    </>
  );
};

export default Layout;
