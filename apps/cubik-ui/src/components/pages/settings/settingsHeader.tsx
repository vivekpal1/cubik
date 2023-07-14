import { Box, HStack, Text, VStack } from '@chakra-ui/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const SettingsHeader = () => {
  const router = useRouter();
  return (
    <>
      <VStack
        px={{
          base: 5,
          sm: 0,
        }}
        align={'start'}
        gap={10}
      >
        <VStack align={'start'}>
          <Text
            fontSize={{
              base: 'lg',
              sm: '3xl',
            }}
            fontWeight={800}
          >
            Account Settings
          </Text>
          <Text>Manage your Cubik profile</Text>
        </VStack>
        <HStack w={'full'} gap={5}>
          <Box
            borderBottom={
              router.pathname === '/settings/profile' ? '2px solid' : 0
            }
            p={2}
            fontWeight={700}
            color={
              router.pathname === '/settings/profile'
                ? 'brand.teal6'
                : 'neutral.7'
            }
            fontSize={20}
          >
            <Link href={'/settings/profile'}>Profile</Link>
          </Box>
          <Box
            borderBottom={
              router.pathname === '/settings/wallet' ? '2px solid' : 0
            }
            p={2}
            color={
              router.pathname === '/settings/wallet'
                ? 'brand.teal6'
                : 'neutral.7'
            }
            fontWeight={700}
            fontSize={20}
          >
            <Link href={'/settings/wallet'}>Wallets</Link>
          </Box>
        </HStack>
      </VStack>
    </>
  );
};

export default SettingsHeader;
