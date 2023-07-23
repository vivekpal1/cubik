'use client';
import { useRef } from 'react';
import CategoryTag from '~/components/common/tags/CategoryTags';
import { Center, HStack } from '~/utils/chakra';
import Categories from './categories';
import { Project } from '..';

const Filters = ({
  projects,
  setProjects,
}: {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}) => {
  return (
    <>
      <Categories projects={projects} setProjects={setProjects} />
    </>
  );
};

export default Filters;
