'use client';
import { Container, Box, Wrap } from '~/utils/chakra';
import Filters from './filters';
import ProjectCard from './card';
import { ProjectJoinRoundStatus } from '@cubik/database';
import { useState } from 'react';

export interface Project {
  id: string;
  projectId: string;
  owner: {
    username: string;
  };
  status: ProjectJoinRoundStatus;
  name: string;
  logo: string;
  description: string;
  amountRaised: string;
}

const Projects = ({ projects: _projects }: { projects: Project[] }) => {
  const [projects, setProjects] = useState<Project[]>(_projects);

  return (
    <Box bg={'black'} w="full" h="full">
      <Container
        px={{ base: '0.6rem', sm: '0.8rem', md: '2rem', xl: '0px' }}
        maxW="7xl"
        py={{ base: '24px', md: '40px' }}
      >
        <Filters />
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

export default Projects;
