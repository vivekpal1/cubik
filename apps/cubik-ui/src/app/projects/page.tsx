import { formatNumberWithK } from '~/utils/formatWithK';
import { Container, Box, Wrap } from '~/utils/chakra';
import ProjectCard from './components/card';
import { prisma } from '@cubik/database';

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
    };
  });
};

function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  shuffledArray.sort(() => Math.random() - 0.5);
  return shuffledArray;
}

const Projects = async () => {
  const projects = await shuffle(await getProjects());

  return (
    <Box bg={'black'} w="full" h="full">
      <Container
        px={{ base: '0.6rem', sm: '0.8rem', md: '2rem', xl: '0px' }}
        maxW="7xl"
        py={{ base: '24px', md: '40px' }}
      >
        <Wrap
          overflow={'visible'}
          py="8px"
          spacing={{ base: '1.8rem', md: '1.5rem' }}
          w="100%"
          margin="0"
          justify={'center'}
          align="center"
          direction={{ base: 'column', sm: 'row', md: 'row' }}
        >
          {projects.map((project, key) => (
            <ProjectCard {...project} key={key} />
          ))}
        </Wrap>
      </Container>
    </Box>
  );
};

export const revalidate = 3600;

export default Projects;
