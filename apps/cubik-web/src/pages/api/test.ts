import type { NextApiResponse } from "next";
import { prisma } from "@cubik/database";

export default async function handler(req: any, res: NextApiResponse) {
  const ress = await prisma.hackathon.findFirst({
    where: {
      id: "8e23ade0-0dae-4c4b-83aa-67867749029c",
    },
    select: {
      projectJoinHackathon: {
        where: {
          isArchive: false,
        },
        select: {
          amount: true,
          project: {
            select: {
              name: true,
              mutliSigAddress: true,
              createKey: true,
            },
          },
        },
      },
    },
  });
  const total = 2000;
  const blazeToken = 3250000;
  const usdc = 1000;
  const ss = ress?.projectJoinHackathon.map((e) => {
    const p = (e.amount / total) * 100;
    return {
      blze: parseFloat(((p * blazeToken) / 100).toFixed(2)),
      usdc: parseFloat(((p * usdc) / 100).toFixed(2)),
      name: e.project.name,
      mutliSigAddress: e.project.mutliSigAddress,
      createKey: e.project.createKey,
      amount: e.amount,
    };
  });

  res.status(200).json({
    totalBlze: ss?.reduce((a, b) => a + b.blze, 0),
    totalUSD: ss?.reduce((a, b) => a + b.usdc, 0),
    data: ss,
  });
}
