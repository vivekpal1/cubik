'use client';
import {
  Box,
  Center,
  HStack,
  useDisclosure,
  useMediaQuery,
} from '~/utils/chakra';
import { RxHamburgerMenu } from 'react-icons/rx';

const Header = () => {
  const [isDesktop] = useMediaQuery('(min-width: 768px)');
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Center
      h={{ base: '2rem', md: '2.6rem' }}
      justifyContent="flex-end"
      alignItems="end"
      w="full"
      zIndex="99"
    >
      {isDesktop ? (
        <Center w="fit-content"></Center>
      ) : (
        <HStack justify="end" align="center" w="full" gap="12px">
          <Center display={{ base: 'flex', md: 'none' }} gap="12px">
            <Box
              as={RxHamburgerMenu}
              boxSize={'26px'}
              color="white"
              onClick={onToggle}
            />{' '}
          </Center>
        </HStack>
      )}
    </Center>
  );
};

export default Header;
