import { z } from 'zod';
import { protectedProcedure } from '../../../trpc';
import { MultiWalletStruct } from '@cubik/types';
import { TRPCError } from '@trpc/server';

export const addWallet = protectedProcedure
  .input(
    z.object({
      wallet: z.string().nonempty(),
      sig: z.string().nonempty(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const checkUser = await ctx.prisma.userModel.findFirst({
      where: {
        OR: [
          {
            mainWallet: input.wallet,
          },
          {
            wallets: {
              path: '$[*].wallet',
              array_contains: input.wallet,
            },
          },
        ],
      },
    });
    if (checkUser)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'The wallet already exsist with a user',
      });

    const user = await ctx.prisma.userModel.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });

    const updateUser = await ctx.prisma.userModel.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        wallets: user?.wallets
          ? [
              ...(user.wallets as unknown as MultiWalletStruct[]),
              {
                wallet: input.wallet,
                sig: input.sig,
              },
            ]
          : [
              {
                wallet: input.wallet,
                sig: input.sig,
              },
            ],
      },
    });

    return updateUser;
  });
