import { Center, HStack, Skeleton, Spinner } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useUserStore } from '~/store/userStore';
import ComponentErrors from '../errors/ComponentErrors';
import UserNavMenu from './navbar-menu/UserNavMenu';
import { useAuthStore } from '~/store/authStore';

export interface UserContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  status: string;
}

export type AuthStateNavbar =
  | 'wallet-connet'
  | 'dontShow'
  | 'userIsReady'
  | 'loadingUser'
  | 'error'
  | 'skeleton';

const NavbarCTA = () => {
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUser, user } = useUserStore();
  const { publicKey, disconnect, connected, disconnecting, connecting } =
    useWallet();
  const router = useRouter();
  const { persist } = useAuthStore();

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        if (connected && publicKey && !disconnecting) {
          const { data, status } = await axios.post('/api/me/id', {
            publicKey: publicKey.toBase58(),
          });

          if (status === 200) {
            localStorage.setItem('anon_id', data.data.id);

            if (localStorage.getItem('wallet_auth')) {
              const { data: user, status } = await axios.post('/api/me', {
                id: data.data.id,
              });
              setUser(user);
            }
            setIsLoading(false);
            return;
          }
          if (status === 201) {
            localStorage.setItem('anon_id', data.data.id);
            localStorage.removeItem('wallet_auth');
            router.push('/create-profile');
            setIsLoading(false);
            return;
          }
        }
      } catch (error) {
        console.log(error);
        setError(true);
        setIsLoading(false);
        return null;
      }
    };
    fetch();
  }, [connected, publicKey]);

  // If on create-profile page, don't show anything
  if (router.isReady && router.pathname === '/create-profile') {
    return <></>;
  }
  if (error) return <ComponentErrors />;

    if (persist) {
      return (
        <HStack gap={{ base: '2px', md: '16px' }}>
          {/* <MemoizedIconButtonBadge /> */}
          <UserNavMenu />
        </HStack>
      );
    }


  if (connecting && !publicKey) {
    return (
      <Skeleton
        isLoaded
        fadeDuration={0.5}
        startColor="#121219"
        endColor="#37383E"
      />
    );
  }

  if (connected && publicKey && user) {
    return (
      <HStack gap={{ base: '2px', md: '16px' }}>
        {/* <MemoizedIconButtonBadge /> */}
        <UserNavMenu />
      </HStack>
    );
  }

  if (publicKey && !isLoading && !user) {
    return (
      <Center
        as="button"
        onClick={() => {
          disconnect();
          setUser(null);
          localStorage.removeItem('anon_sig');
          localStorage.removeItem('wallet_auth');
        }}
      >
        <Spinner size="sm" color="teal" />
      </Center>
    );
  }
  return (
    <Center>
      <WalletMultiButton>Connect Wallet</WalletMultiButton>
    </Center>
  );
};

export default NavbarCTA;
