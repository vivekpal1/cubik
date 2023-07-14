import { VStack } from '@chakra-ui/layout';
import React from 'react';
import SettingsHeader from '~/components/pages/settings/settingsHeader';
import { useUserStore } from '~/store/userStore';

interface Props {
  children: React.ReactNode;
}

const SettingsLayout = (props: Props) => {
  const { user } = useUserStore();

  if (!user) return <></>;
  return (
    <>
      <VStack align={'start'} maxW={'7xl'} w="full" mx="auto" py={10}>
        <SettingsHeader />
        {props.children}
      </VStack>
    </>
  );
};

export default SettingsLayout;
