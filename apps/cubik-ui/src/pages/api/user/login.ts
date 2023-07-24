import { web3 } from '@coral-xyz/anchor';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { env } from '~/env.mjs';
import { verifyMessage } from '~/utils/getsignMessage';
import cookie from 'cookie';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, sig, wallet } = req.body as {
      id: string;
      sig: string;
      wallet: string;
    };

    if (!id || !sig || !wallet) {
      return res.status(400).json({
        message: 'Missing' + (!id ? ' id' : '') + (!sig ? ' sig' : '') + (!wallet ? ' wallet' : ''),
      });
    }
    // check if user exists
    const user = await prisma.userModel.findUnique({
      where: {
        id,
      },
    });
    // if user not found or wallet missmatch
    if (!user || user.mainWallet !== wallet) {
      return res.status(204).send({
        data: null,
        code: 204,
        error: 'User not found',
      });
    }
    // verify signature
    const final = await verifyMessage(sig, new web3.PublicKey(user.mainWallet), id);

    if (!final) {
      return res.status(401).send({
        data: null,
        code: 401,
        error: 'Invalid signature',
      });
    }
    // get token
    const token = sign(
      {
        id: user.id,
        wallet: user.mainWallet,
      },
      env.NEXT_PUBLIC_SECRET as string,
      {
        expiresIn: '6h', // expire
      },
    );

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('', JSON.stringify(token), {
        httpOnly: true,
        secure: env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 6, //6h
        sameSite: 'strict',
        path: '/',
      }),
    );
    return res.end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
