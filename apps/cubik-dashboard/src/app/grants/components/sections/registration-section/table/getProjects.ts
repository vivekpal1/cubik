"use server";
import { AccessScope } from "@cubik/common-types/src/admin";
import { ProjectJoinRoundStatus, User, prisma } from "@cubik/database";

export interface GetProjectsReturnType {
  id: string;
  name: string;
  projectLink: string;
  logo: string;
  owner: {
    username: string;
    avatar: string;
  };
  status?: ProjectJoinRoundStatus;
  appliedTime: Date;
}

export const getProjects = async (
  scope: AccessScope | null
): Promise<GetProjectsReturnType[]> => {
  try {
    if (!scope) throw Error("Scope not found");
    const projects: GetProjectsReturnType[] = [];
    if (scope.event_type === "grant") {
      const data = await prisma.round.findFirst({
        where: {
          id: scope.event_id,
        },
        select: {
          projectJoinRound: {
            select: {
              status: true,
              createdAt: true,
              project: {
                select: {
                  id: true,
                  logo: true,
                  name: true,
                  projectLink: true,
                  owner: {
                    select: {
                      profilePicture: true,
                      username: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      data?.projectJoinRound.forEach((e) =>
        projects.push({
          appliedTime: e.createdAt,
          id: e.project.id,
          logo: e.project.logo,
          name: e.project.name,
          owner: {
            avatar: e.project.owner.profilePicture as string,
            username: e.project.owner.username as string,
          },
          projectLink: e.project.projectLink,
          status: e.status,
        })
      );
      return projects;
    } else if (scope.event_type === "hackathon") {
      const data = await prisma.hackathon.findFirst({
        where: {
          id: scope.event_id,
        },
        select: {
          projectJoinHackathon: {
            select: {
              createdAt: true,
              project: {
                select: {
                  id: true,
                  logo: true,
                  name: true,
                  projectLink: true,
                  owner: {
                    select: {
                      profilePicture: true,
                      username: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      data?.projectJoinHackathon.forEach((e) =>
        projects.push({
          appliedTime: e.createdAt,
          id: e.project.id,
          logo: e.project.logo,
          name: e.project.name,
          owner: {
            avatar: e.project.owner.profilePicture as string,
            username: e.project.owner.username as string,
          },
          projectLink: e.project.projectLink,
        })
      );
      return projects;
    } else {
      return projects;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};
