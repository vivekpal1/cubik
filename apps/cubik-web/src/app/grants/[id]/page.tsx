import SEO from "@/app/components/SEO";
import { prisma } from "@/utils/prisma";
import { Container } from "@/utils/chakra";
import React from "react";

const getGrant = async (id: string) => {
  return await prisma.round.findFirst({
    where: {
      id: id,
    },
    include: {
      ProjectJoinRound: {
        include: {
          project: {
            include: {
              owner: true,
            },
          },
        },
      },
    },
  });
};

const GrantPage = async ({ params }: { params: { id: string } }) => {
  const grant = await getGrant(params.id);
  return (
    <>
      <SEO
        title={`${grant?.roundName || "Grant"}`}
        description={`${grant?.short_description || "Grant Round on Cubik"}`}
        image={`https://res.cloudinary.com/demonicirfan/image/upload/v1687266944/Projects_ozybde.png`}
      />
      <main>
        <Container
          py={{ base: "32px", md: "80px" }}
          maxW="7xl"
          px="1rem"
          display={"flex"}
          flexDir={"column"}
          gap={{ base: "32px", md: "60px" }}
        >
          {JSON.stringify(grant)}
        </Container>
      </main>
    </>
  );
};

export default GrantPage;
