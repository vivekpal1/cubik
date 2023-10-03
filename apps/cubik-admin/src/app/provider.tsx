"use client";
import React from 'react'
import WalletContext from "@/context/walletContext";
import { Provider } from "@/layouts/Provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
interface Props {
    children: React.JSX.Element
}
export const ProviderContext = ({children}:Props) => {
  const queryClient = new QueryClient();

  return (
    <>
       <QueryClientProvider client={queryClient}>
          <WalletContext>
            <Provider>{children}</Provider>
          </WalletContext>
        </QueryClientProvider>
    </>
  )
}
