import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/alert';
import { Button } from '@chakra-ui/button';
import { HStack, Center, VStack, Box } from '@chakra-ui/layout';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/modal';
import { publicKey } from '@coral-xyz/anchor/dist/cjs/utils';
import { disconnect } from 'process';
import React from 'react';
import { FailureToast } from '../common/toasts/Toasts';
import { WalletAddress } from '../common/wallet/WalletAdd';
import { useAuthStore } from '~/store/authStore';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export const MultiWalletModel = (props: Props) => {
  const { setPersist } = useAuthStore();
  const handleClose = () => {
    setPersist(false);
    props.onClose();
  };
  return (
    <>
      <Modal variant="cubik" isOpen={props.isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Box
                as="p"
                textStyle={{ base: 'title3', md: 'title2' }}
                color="neutral.11"
              >
                Link another wallet
              </Box>
            </HStack>
          </ModalHeader>
          <ModalBody>
            <WalletMultiButton />
          </ModalBody>

          <ModalFooter>footer</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
