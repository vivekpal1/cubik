import {
  Avatar,
  Card,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import React from 'react';

const ProjectCardSkeleton = () => {
  return (
    <Card
      w="100%"
      p="24px"
      h="17.8rem"
      cursor="pointer"
      maxW={{
        base: '85vw',
        sm: '87vw',
        md: '44vw',
        lg: '29.5vw',
        xl: '25.5rem',
      }}
    >
      <VStack gap="18px" w="full" alignItems={'start'} justifyContent="start">
        <HStack justifyContent={'space-between'}>
          <Skeleton
            w={{ base: '3rem', md: '4rem' }}
            h={{ base: '3rem', md: '4rem' }}
          />
        </HStack>
        <VStack gap="0.8rem" spacing="0" w="full">
          <HStack align={'end'} w="full" justify="space-between">
            <Skeleton w="10rem" h="1.3rem" opacity={'0.6'} />
            <Skeleton w="4rem" h="2rem" opacity={'0.6'} />
          </HStack>
          <HStack w="full" justify="space-between">
            <Skeleton w="4rem" h="0.5rem" opacity={'0.6'} />
            <Skeleton w="4rem" h="0.5rem" opacity={'0.6'} />
          </HStack>{' '}
        </VStack>{' '}
        <VStack gap="8px" w="full" align={'start'}>
          <SkeletonText
            w={'full'}
            noOfLines={2}
            height="28px"
            opacity={'0.6'}
          />
          <Skeleton w="10rem" h="1.5rem" opacity={'0.4'} />
        </VStack>
      </VStack>
    </Card>
  );
};

const ProjectListLoadingSkeleton = () => {
  return (
    <Wrap
      spacing="1.5rem"
      w="100%"
      margin="0"
      justify={'center'}
      align="center"
      direction={{ base: 'column', sm: 'row', md: 'row' }}
    >
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
    </Wrap>
  );
};

export default ProjectListLoadingSkeleton;
