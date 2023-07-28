import { Box, Center, HStack, VStack, Avatar, Button } from '@chakra-ui/layout';
import { Skeleton, SkeletonCircle } from '@chakra-ui/skeleton';
import { FC, memo } from 'react';
import Username from '~/components/common/username/Username';
import { WalletAddress } from '~/components/common/wallet/WalletAdd';
import { UserProof, UserWithProjectType } from '~/types/user';
import { HiSparkles } from 'react-icons/hi';
import ProfilePictureAvatar from '~/components/common/profile-picture/ProfilePicture';

type profileHeaderType = {
  admin: boolean | undefined;
  user: UserWithProjectType | null | undefined;
  isLoading: boolean;
};

const ProfileHeader: FC<profileHeaderType> = ({ admin, user, isLoading }: profileHeaderType) => {
  return (
    <HStack
      w="full"
      align={'center'}
      justify="start"
      gap={{ base: '12px', sm: '14px', md: '16px' }}
    >
      <Center
        width={{ base: '56px', sm: '72px', md: '84px' }}
        height={{ base: '56px', sm: '72px', md: '84px' }}
      >
        <SkeletonCircle
          fadeDuration={2}
          isLoaded={!isLoading}
          borderRadius="12px"
          size={{ base: '56px', sm: '72px', md: '84px' }}
        >
          <ProfilePictureAvatar
            asNFT={true}
            profilePicture={user?.profilePicture as string}
            username={user?.username as string}
            width={{ base: '56px', sm: '72px', md: '84px', lg: '84px', xl: '84px' }}
            height={{ base: '56px', sm: '72px', md: '84px', lg: '84px', xl: '84px' }}
          />
        </SkeletonCircle>
      </Center>
      <VStack
        m="0"
        marginInlineStart={'0 !important'}
        p={{ base: '0px', sm: '6px', md: '8px' }}
        gap={{ base: '12px', md: '16px' }}
        justifyContent={'center'}
        align={'start'}
      >
        <HStack gap="8px">
          <Username
            username={user?.username}
            isLoading={isLoading}
            proofs={(user?.proof as unknown as UserProof[]) ?? []}
            size="lg"
          />
          {/* <HStack>
            <Box as="p">Get Verified</Box>
          </HStack> */}
        </HStack>
        <Center marginInline={'0 !important'} margin="0 !important">
          <Skeleton
            w="6rem"
            h="18px"
            fadeDuration={3}
            opacity={isLoading ? '0.5' : '1'}
            isLoaded={!isLoading}
          >
            <WalletAddress walletAddress={user?.mainWallet || ''} size="sm" copy={true} />
          </Skeleton>
        </Center>
      </VStack>
    </HStack>
  );
};

export default memo(ProfileHeader);
