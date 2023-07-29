import {
  Box,
  Container,
  HStack,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@/utils/chakra";
import React from "react";

const GrantsPage = () => {
  return (
    <>
      <Container
        maxW={{ base: "full", md: "7xl" }}
        w="100vw"
        py={{ base: "32px", md: "64px" }}
        px={{ base: "16px" }}
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          gap="40px"
          w="full"
          align="start"
          justify="space-between"
          pb={{ base: "32px", md: "48px" }}
          position={"relative"}
          _after={{
            content: '""',
            zIndex: "0",
            position: "absolute",
            top: "-100%",
            right: { base: "20%", md: "5%" },
            transform: "translate(0%,0%) scale(12)",
            width: "2vw",
            maxW: "1rem",
            minW: "0.6rem",
            height: "full",
            maxH: "1.2rem",
            minH: "0.8rem",
            backgroundColor: "#FFE53D",
            filter: "blur(10px)",
            WebkitFilter: "blur(10px)",
            rounded: "full",
          }}
          _before={{
            content: '""',
            zIndex: "0",
            position: "absolute",
            top: "-100%",
            right: { base: "20%", md: "0%" },
            transform: {
              base: "translate(0%,0%) scale(8)",
              md: "translate(0%,0%) scale(16)",
            },
            width: "2vw",
            maxW: "2rem",
            minW: "1.2rem",
            height: "2vw",
            maxH: "2rem",
            minH: "1.2rem",
            backgroundColor: "#31F579",
            filter: "blur(25px)",
            WebkitFilter: "blur(25px)",
            rounded: "full",
          }}
        >
          <VStack align={"start"} gap={{ base: "6px", md: "8px" }}>
            <Box
              color="neutral.11"
              as="p"
              textStyle={{ base: "title1", md: "display3" }}
            >
              Quadratic Funding Grants
            </Box>{" "}
            <Box
              color="neutral.9"
              as="p"
              textStyle={{ base: "body5", md: "body3" }}
            >
              Participate in Community driven Grants
            </Box>
          </VStack>
        </Stack>
        <VStack
          py={{ base: "32px", md: "64px" }}
          w="full"
          align="start"
          spacing="32px"
        >
          <Tabs w="full" variant="unstyled" position={"relative"}>
            <HStack pb="1rem" w="full" justify="space-between">
              <Box
                color="neutral.11"
                as="p"
                textStyle={{ base: "title2", md: "title1" }}
              >
                Grant Rounds
              </Box>

              <TabList
                gap={{ base: "8px", md: "14px" }}
                border="1px solid"
                borderColor="neutral.4"
                bg="neutral.3"
                p="4px"
                rounded="12px"
              >
                <Tab
                  zIndex="1"
                  color="neutral.7"
                  _selected={{ color: "neutral.10" }}
                >
                  <Box as="p" textStyle={{ base: "title6", md: "title4" }}>
                    Upcoming
                  </Box>
                </Tab>
                <Tab
                  zIndex="1"
                  color="neutral.7"
                  _selected={{ color: "neutral.10" }}
                >
                  <Box as="p" textStyle={{ base: "title6", md: "title4" }}>
                    Past
                  </Box>
                </Tab>
              </TabList>
            </HStack>
            <TabIndicator
              zIndex={"0"}
              position={"absolute"}
              top="0"
              borderColor="neutral.4"
              bg="neutral.4"
              rounded="10px"
              h={{ base: "2.1rem", md: "2.5rem" }}
              mt="4px"
            />

            <TabPanels px="0" py={{ base: "12px", md: "16px" }}>
              <TabPanel p="0">up</TabPanel>
              <TabPanel p="0">old</TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </>
  );
};

export default GrantsPage;
