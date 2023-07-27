import { prisma } from "@/utils/prisma";
import Details from "./components/details";
import { Center, Flex, HStack, SkeletonCircle, VStack } from "@/utils/chakra";

const getProfile = async (username: string) => {
  return await prisma.userModel.findUnique({
    where: {
      username: username,
    },
    select: {
      profilePicture: true,
      mainWallet: true,
    },
  });
};

const Profile = async ({
  params: { username },
}: {
  params: { username: string };
}) => {
  console.log(username);
  const profile = await getProfile(username);

  console.log("profile", profile);

  return (
    <div>
      <HStack
        w="full"
        align={"center"}
        justify="start"
        gap={{ base: "12px", sm: "14px", md: "16px" }}
      >
        <Center
          width={{ base: "56px", sm: "72px", md: "84px" }}
          height={{ base: "56px", sm: "72px", md: "84px" }}
        >
          <SkeletonCircle
            fadeDuration={2}
            isLoaded={!isLoading}
            borderRadius="12px"
            size={{ base: "56px", sm: "72px", md: "84px" }}
          >
            <ProfilePictureAvatar
              asNFT={true}
              profilePicture={user?.profilePicture as string}
              username={user?.username as string}
              width={{
                base: "56px",
                sm: "72px",
                md: "84px",
                lg: "84px",
                xl: "84px",
              }}
              height={{
                base: "56px",
                sm: "72px",
                md: "84px",
                lg: "84px",
                xl: "84px",
              }}
            />
          </SkeletonCircle>
        </Center>
        <VStack
          m="0"
          marginInlineStart={"0 !important"}
          p={{ base: "0px", sm: "6px", md: "8px" }}
          gap={{ base: "12px", md: "16px" }}
          justifyContent={"center"}
          align={"start"}
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
          <Center marginInline={"0 !important"} margin="0 !important">
            <Skeleton
              w="6rem"
              h="18px"
              fadeDuration={3}
              opacity={isLoading ? "0.5" : "1"}
              isLoaded={!isLoading}
            >
              <WalletAddress
                walletAddress={user?.mainWallet || ""}
                size="sm"
                copy={true}
              />
            </Skeleton>
          </Center>
        </VStack>
      </HStack>
    </div>
  );
};

export default Profile;
