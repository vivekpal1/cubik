"use server";
import { prisma } from "@/utils/prisma";

const getContributors = async (projectId: string) => {
  await prisma.contribution.findMany({
    where: {
      projectId,
    },
    select: {
      count: true,
      user: {
        select: {
          profilePicture: true,
        },
      },
    },
    distinct: ["userId"],
    take: 3,
  });
};

const Contributors = async ({ projectId }: { projectId: string }) => {
  const contributors = await getContributors(projectId);

  return <div>Enter</div>;
};

export default Contributors;
