import { Box, Container } from "@/utils/chakra";
import React from "react";

interface Props {
  children: React.JSX.Element | React.JSX.Element[];
}
const ProfileLayout = ({ children }: Props) => {
  return (
    <>
      <Box mt={10}>{children}</Box>
    </>
  );
};

export default ProfileLayout;
