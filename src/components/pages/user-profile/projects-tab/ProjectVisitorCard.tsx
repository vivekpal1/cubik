import { Card, CardHeader } from '@chakra-ui/react';
import { ProjectsModel } from '@prisma/client';
import ProjectBanner from './ProjectBanner';
import ProjectHeader from './ProjectHeader';

const ProjectVisitorCard = ({ project }: { project: ProjectsModel }) => {
  return (
    <Card
      px="0px"
      pt={{ base: '16px', sm: '20px', md: '24px' }}
      pb={{ base: '16px', sm: '20px', md: '24px' }}
      gap={{ base: '16px', sm: '20px', md: '24px' }}
      w="100%"
    >
      <ProjectBanner status={status} />
      <CardHeader>
        <ProjectHeader project={project} />
      </CardHeader>
    </Card>
  );
};

export default ProjectVisitorCard;