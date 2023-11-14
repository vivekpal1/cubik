import axios from 'axios';
import type { TokenPriceResponse } from 'types';

export const tokenPrice = async (token: string) => {
  try {
    const response = await axios.get<TokenPriceResponse>(
      `https://price.jup.ag/v4/price?ids=${token}`,
    );
    console.log(response.data);
    return response.data.data[token];
  } catch (error) {
    console.error(error);
    return null;
  }
};
