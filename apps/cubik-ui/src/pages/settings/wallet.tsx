import React from 'react';
import SettingsLayout from '~/context/settings.layout';
import { useUserStore } from '~/store/userStore';
import { Box, HStack, Text, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useAuthStore } from '~/store/authStore';
import { MultiWalletModel } from '~/components/app/MultiWalletModel';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
const EditWallet = () => {
  const { user } = useUserStore();
  const { persist, setPersist } = useAuthStore();
  const anchorWallet = useAnchorWallet();
  return (
    <>
      <SettingsLayout>
        <VStack mt={5}>
          <HStack borderRadius={10} gap={5} px={5} py={4}>
            <Box borderRadius={10} bg={'#111212'} p={3}>
              <Text>{user?.mainWallet}</Text>
            </Box>
            <Button
              px={6}
              borderRadius={10}
              borderColor={'brand.teal5'}
              fontWeight={500}
              border="1px solid"
              bg={'brand.teal2'}
              variant={'unstyled'}
              isDisabled
              disabled
            >
              Primary
            </Button>
          </HStack>
          <HStack borderRadius={10} gap={5} px={5} py={4}>
            <Box borderRadius={10} bg={'#111212'} p={3}>
              <Text>{anchorWallet?.publicKey.toBase58()}</Text>
            </Box>
            <Button
              px={6}
              borderRadius={10}
              borderColor={'brand.teal5'}
              fontWeight={500}
              border="1px solid"
              bg={'brand.teal2'}
              variant={'unstyled'}
            >
              Remove
            </Button>
          </HStack>
          <VStack px={5} align={'end'} justify={'center'} w={'full'}>
            {persist && (
              <>
                {user?.mainWallet === anchorWallet?.publicKey.toBase58() ? (
                  <WalletMultiButton />
                ) : (
                  <>
                    <Button>Sign a message</Button>
                  </>
                )}
              </>
            )}
            {!persist ? (
              <Button
                px={6}
                borderRadius={10}
                borderColor={'brand.teal5'}
                fontWeight={500}
                border="1px solid"
                bg={'brand.teal2'}
                variant={'unstyled'}
                onClick={() => {
                  setPersist(true);
                }}
              >
                Begin Linking
              </Button>
            ) : (
              <Button
                px={6}
                borderRadius={10}
                borderColor={'brand.teal5'}
                fontWeight={500}
                border="1px solid"
                bg={'brand.teal2'}
                variant={'unstyled'}
                isLoading={true}
                alignItems={'center'}
                justifyContent={'center'}
                display={'flex'}
              >
                Linking..
              </Button>
            )}
          </VStack>
        </VStack>
      </SettingsLayout>
    </>
  );
};

export default EditWallet;
