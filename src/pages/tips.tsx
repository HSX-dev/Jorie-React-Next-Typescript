import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from "~/components/Layout";
import { tips } from "~/data/tips";
import type { Tip } from "~/types";

type Props = {
  tips: Tip[];
  generatedAt: string;
};

// Static generation: this page is built once at build time.
export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    tips,
    generatedAt: new Date().toISOString().slice(0, 10),
  },
});

const TipsPage = ({ tips, generatedAt }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title="Tips">
    <h1>Budgeting tips</h1>
    <p className="muted">
      Statically generated with <code>getStaticProps</code> on {generatedAt}. Also
      available as JSON at <code>/api/tips</code>.
    </p>
    <div className="grid">
      {tips.map((tip) => (
        <article key={tip.id} className="card">
          <h3>{tip.title}</h3>
          <p>{tip.body}</p>
        </article>
      ))}
    </div>
  </Layout>
);

export default TipsPage;
