'use client';
import { useRef } from 'react';
// import CategoryTag from '~/components/common/tags/CategoryTags';
import CategoryTag from '~/components/common/tags/CategoryTags';
import { Center, HStack } from '~/utils/chakra';

type Category = {
  value:
    | 'all'
    | 'defi'
    | 'solana_infrastructure'
    | 'sdk'
    | 'consumer'
    | 'developer_tools';
  label: string;
};

const Categories = () => {
  const categories: Category[] = [
    { value: 'defi', label: 'defi' },
    { value: 'solana_infrastructure', label: 'Solana Infrastructure' },
    { value: 'sdk', label: 'SDK' },
    { value: 'consumer', label: 'Consumer' },
    { value: 'developer_tools', label: 'Developer Tools' },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const changeCategory = (category: Category['value']) => {
    
  };

  return (
    <HStack
      py="40px"
      ref={scrollRef}
      overflow="clip"
      w="full"
      justify="start"
      whiteSpace="nowrap"
      position={'relative'}
      _after={{
        content: '""',
        position: 'absolute',
        top: '45%',
        right: '0%',
        transform: 'translateY(-50%)',
        height: { base: '2.2rem', md: '3rem' },
        width: '3rem',
        background: 'linear-gradient(90deg, #0C0D0D00 0%, #000 80%)',
      }}
    >
      <Center as="button" color="#ADB8B6" onClick={() => changeCategory('all')}>
        <CategoryTag isSelected={true}>All Projects</CategoryTag>
      </Center>
      {categories.map(({ label, value }) => (
        <Center
          key={value}
          as="button"
          color="#ADB8B6"
          onClick={() => changeCategory(value)}
        >
          <CategoryTag>{label}</CategoryTag>
        </Center>
      ))}
    </HStack>
  );
};

export default Categories;
