'use client';

import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

interface TokenPriceResponse {
  price: number;
  token: string;
  icon: string;
  name: string;
}

// Global context setup
const initialState: {
  state: TokenPriceResponse[];
} | null = null;

const TokenPriceContext = createContext<
  | {
      state: TokenPriceResponse[];
      dispatch: React.Dispatch<{ type: string; payload: TokenPriceResponse[] }>;
    }
  | undefined
>(undefined);

const tokenPriceReducer = (
  state: any,
  action: { type: any; payload: TokenPriceResponse[] },
) => {
  switch (action.type) {
    case 'UPDATE_TOKEN_PRICE':
      return { ...state, tokenPrice: action.payload };
    default:
      return state;
  }
};

const TokenPriceProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(tokenPriceReducer, initialState);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TokenPriceContext.Provider value={{ state, dispatch }}>
        {children}
      </TokenPriceContext.Provider>
    </QueryClientProvider>
  );
};

const useTokenContext = () => {
  const context = useContext(TokenPriceContext);
  if (!context) {
    throw new Error('useTokenContext must be used within a TokenPriceProvider');
  }
  return context;
};

// Custom hook for fetching token price
const fetchTokenPrice = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/price/all`,
  );
  const { result } = await response.json();
  return result;
};

const useTokenPrice = () => {
  const { state, dispatch } = useTokenContext();

  const { error } = useQuery<TokenPriceResponse[]>({
    queryKey: ['tokenPrice'],
    queryFn: fetchTokenPrice,
    refetchInterval: 5000,
    onSuccess: (data) => {
      // Update the global context with the fetched token price
      dispatch({ type: 'UPDATE_TOKEN_PRICE', payload: data });
    },
  });

  return { data: state, error };
};

export { TokenPriceProvider, useTokenPrice };
