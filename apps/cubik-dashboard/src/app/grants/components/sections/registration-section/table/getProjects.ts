"use server";
import { AccessScope } from "@cubik/common-types/src/admin";
import { ProjectJoinRoundStatus, User, prisma } from "@cubik/database";

export interface GetProjectsReturnType {
  id: string;
  name: string;
  projectLink: string;
  logo: string;
  owner: User;
  status: ProjectJoinRoundStatus;
  appliedTime: Date;
}

export const getProjects = async (
  scope: AccessScope
): Promise<GetProjectsReturnType[]> => {
  try {
    if (scope.event_type === "grant") {
      const data = await prisma.round.findFirst({
        where: {
          id: scope.event_id,
        },
        select: {
          projectJoinRound: {
            select: {
              project: true,
            },
          },
        },
      });
      return [];
    } else if (scope.event_type === "hackathon") {
      return [];
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};
