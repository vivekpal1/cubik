"use client";
import React from "react";
import theme from "@/config/chakra.config";
import { ChakraProvider } from "@/utils/chakra";
interface Props {
  children: React.JSX.Element;
}
export const Provider = ({ children }: Props) => {
  return <ChakraProvider theme={theme}> <CacheProvider>
    
    {children}
    </CacheProvider>
    </ChakraProvider>;
};
