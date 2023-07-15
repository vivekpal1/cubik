import { useDisclosure } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import jwt from 'jsonwebtoken';
import { useEffect } from 'react';
import { MultiWalletModel } from '~/components/app/MultiWalletModel';
import WalletVerifyModal from '~/components/app/WalletVerifyWalletModal';
import { useAuthStore } from '~/store/authStore';
import { verifyMessage } from '~/utils/getsignMessage';

interface SignatureData {
  signature: string;
  wallet: string;
}

interface Props {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<Props> = ({ children }) => {
  const { publicKey, connected } = useWallet();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: multiWalletisOpen,
    onOpen: multiWalletOpen,
    onClose: multiWalletClose,
  } = useDisclosure();
  const { persist } = useAuthStore();

  const checkAndVerifySignature = async () => {
    if (!publicKey || !connected) {
      return;
    }
    console.log(persist, 'persist');
    // presist will be true if the user wants to persist the session and disconnect the wallet
    if (!persist) {
      // check the jwt for expire or wallet address
      if (localStorage.getItem('wallet_auth')) {
        const walletAuth = localStorage.getItem('wallet_auth') as string;

        const payload = jwt.decode(walletAuth) as jwt.JwtPayload;
        if (
          payload.wallet !== publicKey.toBase58() ||
          payload.exp! * 1000 < Date.now()
        ) {
          onOpen();
          return;
        }
        return null;
      }

      if (!localStorage.getItem('anon_sig')) {
        onOpen();
      }
      if (localStorage.getItem('anon_sig')) {
        const sigCheck = await verifyMessage(
          localStorage.getItem('anon_sig') as string,
          publicKey
        );
        if (!sigCheck) {
          onOpen();
        }
      }
    } else {
      multiWalletOpen();
    }
  };
  useEffect(() => {
    checkAndVerifySignature();
  }, [publicKey, persist]);

  return (
    <>
      {children}
      <WalletVerifyModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
