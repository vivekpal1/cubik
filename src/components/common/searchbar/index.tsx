import {
  Avatar,
  Box,
  Center,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { searchProjectsType } from '~/types/projects';
import { trpc } from '~/utils/trpc';

type SearchBarProps = {
  display?: any;
  width: any;
};
export const SearchBar = ({ display, width }: SearchBarProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

  const [searchInput, setSearchInput] = useState('');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [filteredProjects, setFilterdProjects] = useState<searchProjectsType[]>(
    []
  );
  const searchProjectMutation = trpc.project.searchProjects.useMutation({
    onSuccess: async (data) => {
      setFilterdProjects(data as searchProjectsType[]);
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setSearchInput('');
    }
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();

      //  else if (filteredPeople.length > 0) {
      //   setSelectedPeopleIndex(prevIndex => prevIndex + 1 >= filteredPeople.length ? 0 : prevIndex + 1);
      // } else if (filteredGrants.length > 0) {
      //   setSelectedGrantIndex(prevIndex => prevIndex + 1 >= filteredGrants.length ? 0 : prevIndex + 1);
      // } else if (filteredHackathons.length > 0) {
      //   setSelectedHackathonIndex(prevIndex => prevIndex + 1 >= filteredHackathons.length ? 0 : prevIndex + 1);
      // }
    }

    if (event.key === 'Enter') {
      // Modify this part to handle navigation to different routes depending on the selected type
      // else if (filteredPeople.length > 0) {
      //   router.prefetch(`/people/${filteredPeople[selectedPeopleIndex].id}`);
      // } else if (filteredGrants.length > 0) {
      //   router.prefetch(`/grants/${filteredGrants[selectedGrantIndex].id}`);
      // } else if (filteredHackathons.length > 0) {
      //   router.prefetch(`/hackathons/${filteredHackathons[selectedHackathonIndex].id}`);
      // }
    }
  };

  const handleClose = () => {
    setSearchInput('');
    onClose();
  };

  return (
    <>
      {!searchProjectMutation.isError && (
        <Modal
          initialFocusRef={initialRef}
          //variant={'cubik'}
          isOpen={isOpen}
          size="lg"
          onClose={handleClose}
        >
          <ModalOverlay backdropFilter="blur(10px)" bg="rgba(0, 0, 0, 0.40)" />
          <ModalContent h="0" rounded="8px" w={'full'} p="0" px="1rem">
            <ModalBody
              w={'full'}
              rounded="8px"
              border="1px solid #1B181A"
              p="0"
            >
              <VStack rounded="8px" gap="0" spacing="0" background={'#0F0F0F'}>
                <InputGroup
                  rounded="8px"
                  display={display}
                  h="3.2rem"
                  background={'transparent'}
                  w={'full'}
                  zIndex="1"
                  onClick={onOpen}
                >
                  <InputLeftElement
                    w="3.2rem"
                    h="full"
                    pointerEvents="none"
                    bg="transparent"
                  >
                    <BiSearch size={22} color="#75757530" />
                  </InputLeftElement>
                  <Input
                    variant={'unstyled'}
                    pl="3.2rem"
                    h="3.2rem"
                    fontSize={'sm'}
                    background="#05060F"
                    bg="transparent"
                    placeholder="Search Projects, Grants, Hackathons & People... "
                    onChange={(e) => {
                      if (e.target.value.length > 3) return;

                      searchProjectMutation.mutate({
                        name: e.target.value,
                      });
                    }}
                    onKeyDown={handleKeyDown}
                    _placeholder={{
                      color: '#75757550',
                      fontSize: 'sm',
                      fontWeight: '400',
                    }}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                      rounded: '8px',
                    }}
                  />
                </InputGroup>
                <VStack p="12px" pt="0px" w="full" rounded="8px">
                  <Box w="full" h="1px" bg="neutral.4" />

                  {searchProjectMutation.isLoading ? (
                    <Spinner color="purple.500" size="xl" />
                  ) : searchProjectMutation.isError ? (
                    <Box p="16px">Error: {'Something went wrong.'}</Box>
                  ) : filteredProjects.length === 0 &&
                    searchInput.trim() !== '' ? (
                    <Box p="16px">No results found for {searchInput}.</Box>
                  ) : (
                    <VStack align="start" w="full" spacing="8px">
                      <Box as="p" textStyle={'body5'} color="neutral.8">
                        Projects
                      </Box>
                      {filteredProjects.map((projectjoinround, index) => (
                        <HStack
                          key={projectjoinround?.id}
                          as={Link}
                          gap="8px"
                          rounded="8px"
                          w="full"
                          p="8px"
                          bg={
                            index === selectedProjectIndex
                              ? 'neutral.5'
                              : 'transparent'
                          }
                          href={`/project/${projectjoinround?.id}`} // @irfan check if the route is correct once
                        >
                          <Avatar
                            src={projectjoinround.logo}
                            name={projectjoinround.name}
                            width={{ base: '20px', md: '28px' }}
                            height={{ base: '20px', md: '28px' }}
                            rounded="full"
                          />
                          <HStack justify={'start'} gap="0" align={'center'}>
                            <Box as="p" color="white" textStyle="title5">
                              {projectjoinround.name}
                            </Box>
                            <Box
                              as="p"
                              color="neutral.8"
                              fontSize={'11px'}
                              lineHeight="12px"
                            >
                              by @{projectjoinround.owner.username}
                            </Box>
                          </HStack>
                        </HStack>
                      ))}
                    </VStack>
                  )}
                  {/* Grants */}
                  {/* Hackathons */}
                  {/* People */}
                </VStack>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      <InputGroup
        display={display}
        rounded="8px"
        h="fit-content"
        background={'#FFFFFF10'}
        border="1px solid #1B181A10"
        w={width}
        zIndex="1"
        sx={{
          backdropFilter: 'blur(120px)',
          margin: '0px !important',
          marginTop: '0px !important',
        }}
        onClick={() => {
          onOpen();
        }}
      >
        <InputLeftElement
          w="3.5rem"
          h="full"
          pointerEvents="none"
          bg="transparent"
        >
          <Box
            as={BiSearch}
            boxSize={{ base: '1.2rem', md: '1.4rem' }}
            color="#ffffff50"
          />
        </InputLeftElement>

        <Center alignItems="center" h="2.5rem">
          <Box
            as="p"
            pl="3rem"
            fontSize={'md'}
            background="#05060F"
            bg="transparent"
            color="#ffffff50"
            //opacity="0.3"
            fontWeight="400"
            pb={'3px'}
          >
            Search
          </Box>
        </Center>
      </InputGroup>
    </>
  );
};
