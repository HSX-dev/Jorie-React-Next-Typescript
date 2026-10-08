import type { NextApiRequest, NextApiResponse } from "next";
import { tips } from "~/data/tips";
import type { Tip } from "~/types";

type ErrorResponse = { message: string };

const handler = (req: NextApiRequest, res: NextApiResponse<Tip[] | Tip | ErrorResponse>) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Optional ?id=2 returns a single tip.
  const { id } = req.query;
  if (typeof id === "string") {
    const tip = tips.find((t) => t.id === Number(id));
    return tip ? res.status(200).json(tip) : res.status(404).json({ message: "Tip not found" });
  }

  return res.status(200).json(tips);
};

export default handler;
