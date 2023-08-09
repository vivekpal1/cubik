import { prisma } from "@cubik/database";
import { NextApiResponse } from "next";

export default async function handler(
  req: NextApiResponse,
  res: NextApiResponse
) {
  const result = await prisma.projectJoinHackathons.findMany({});
  res.status(200).json(result);
}
