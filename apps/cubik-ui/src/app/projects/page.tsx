import { formatNumberWithK } from '~/utils/formatWithK';
import { prisma } from '@cubik/database';
import Projects, { Project } from '../components/projects';
import { Category } from '../components/projects/filters/categories';

const getProjects = async () => {
  const projects = await prisma.projectJoinRound.findMany({
    where: {
      status: 'APPROVED',
    },
    orderBy: {
      amountRaise: 'desc',
    },
    select: {
      id: true,
      status: true,
      amountRaise: true,
      fundingRound: {
        select: {
          id: true,
          colorScheme: true,
          active: true,
          endTime: true,
          roundName: true,
          startTime: true,
        },
      },
      project: {
        select: {
          id: true,
          industry: true,
          logo: true,
          name: true,
          project_link: true,
          short_description: true,
          owner: {
            select: {
              username: true,
            },
          },
          isArchive: true,
        },
      },
    },
  });

  return projects.map(({ id, status, amountRaise, fundingRound, project }) => {
    return {
      id,
      projectId: project.id,
      owner: project.owner,
      status,
      name: project.name,
      logo: project.logo,
      description: project.short_description,
      amountRaised: amountRaise
        ? formatNumberWithK(parseInt(amountRaise.toFixed(2)))
        : '0',
      industry: JSON.parse(project.industry) as Project['industry'],
    };
  });
};

function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  shuffledArray.sort(() => Math.random() - 0.5);
  return shuffledArray;
}

export default async function () {
  const projects = await getProjects();

  return <Projects projects={projects} />;
}

export const revalidate = 3600;
