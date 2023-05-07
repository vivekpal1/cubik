import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { Prisma, UserModel } from '@prisma/client';
import { NextApiRequest } from 'next';
import { type DefaultSession, type NextAuthOptions } from 'next-auth';
import credentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma';
import { verifyMessage } from '~/utils/getsignMessage';
import * as anchor from '@coral-xyz/anchor';
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      mainWallet: string;
      username: string;
      profilePicture: string;
      count: Prisma.UserModelCountOutputType;
    } & DefaultSession['user'];
  }
}
type UserSession = Prisma.UserModelGetPayload<{
  include: {
    _count: true;
  };
}>;

export const authOptions = (req: NextApiRequest): NextAuthOptions => {
  return {
    callbacks: {
      jwt: async ({ token, user }) => {
        if (typeof user !== typeof undefined) token.user = user;

        return token;
      },
      session: async ({ session, token }) => {
        const userData = token.user as UserSession;
        console.log(userData);

        session.user.id = userData.id;
        session.user.mainWallet = userData.mainWallet;
        session.user.username = userData.username;
        session.user.profilePicture = userData.profilePicture;
        session.user.count = userData._count;
        return session;
      },
    },
    secret: process.env.SECRET,
    session: {
      strategy: 'jwt',
      maxAge: 15 * 24 * 60 * 60,
    },
    adapter: PrismaAdapter(prisma),
    providers: [
      credentialsProvider({
        async authorize(credentials, _req) {
          if (!credentials) {
            throw new Error('User Cannot be authenticated');
          }
          const user = credentials as {
            wallet: string;
            signature: string;
          };
          const availableTokens =
            req.cookies['next-auth.csrf-token']?.split('|');

          const final = await verifyMessage(
            user.signature,
            new anchor.web3.PublicKey(user.wallet),
            availableTokens![0]
          );

          if (!final) {
            return null;
          }
          const res = await prisma.userModel.findUnique({
            where: {
              mainWallet: user.wallet,
            },
            include: {
              _count: true,
            },
          });
          console.log(res?._count.project, '0');

          if (!res) {
            return null;
          }

          return res;
        },
        credentials: {},
        type: 'credentials',
      }),
    ],
    pages: {
      signIn: '/',
      signOut: '/',
      error: '/',
      verifyRequest: '/',
      newUser: '/',
    },
  };
};
// export const getServerAuthSession = (ctx: {
//   req: GetServerSidePropsContext['req'];
//   res: GetServerSidePropsContext['res'];
// }) => {
//   return getServerSession(ctx.req, ctx.res, authOptions(ctx.req));
// };
