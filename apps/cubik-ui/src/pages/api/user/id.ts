import { prisma } from '@cubik/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { wallet } = req.query as { wallet: string };
    if (!wallet) {
      return res.status(400).json({ message: 'Missing wallet' });
    }
    const user = await prisma.userModel.findFirst({
      where: {
        mainWallet: wallet,
      },
    });

    // If user found
    if (user?.username) {
      return res.status(200).json({ username: user.username });
    }

    // If partial user found
    if (user && !user?.username) {
      return res.status(200).json({ id: user.id, wallet: user.mainWallet });
    }

    // create user
    const createUser = await prisma.userModel.create({
      data: {
        mainWallet: wallet,
      },
    });

    return res.status(201).json({ id: createUser.id, wallet: createUser.mainWallet });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
