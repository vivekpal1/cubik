import type { Request, Response } from 'express';
import { tokenPrice } from 'utils/price';

const tokens = ['SOL', 'USDC', 'ETH'];

export const tokenPriceController = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    if (tokens.includes(token) === false) {
      return res.status(400).json({ error: 'Invalid token' });
    }
    const data = await tokenPrice(token);

    res.status(200).json({
      token: data?.mintSymbol,
      name: '',
      price: data?.price,
      icon: '',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};
export const tokenPriceMultiple = async (req: Request, res: Response) => {
  try {
    const prices = await Promise.all(
      tokens.map(async (token: string) => {
        const data = await tokenPrice(token);
        return { token: token, price: data?.price, name: '', icon: '' };
      }),
    );

    res.status(200).json({ result: prices });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};
