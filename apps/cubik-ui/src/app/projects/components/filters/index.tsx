'use client';
import { useRef } from 'react';
import CategoryTag from '~/components/common/tags/CategoryTags';
import { Center, HStack } from '~/utils/chakra';
import Categories from './categories';

const Filters = () => {
  return (
    <>
      <Categories />
    </>
  );
};

export default Filters;
