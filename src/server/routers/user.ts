import { z } from 'zod';
import { procedure, router } from '../trpc';
import { prisma } from '../utils/prisma';

export const userRouter = router({
  create: procedure
    .input(
      z.object({
        id: z.string().uuid(),
        username: z.string().nonempty(),
        mainWallet: z.string().nonempty(),
        profilePicture: z.string(),
        tx: z.string().nonempty(),
      })
    )
    .mutation(async ({ input }) => {
      /*
            A check for signature is missing 
        */
      const res = prisma.userModel.create({
        data: {
          id: input.id,
          mainWallet: input.mainWallet,
          profilePicture: input.profilePicture,
          username: input.username,
          tx: input.tx,
        },
      });
      return res;
    }),
  findOne: procedure
    .input(
      z.object({
        username: z.string().nonempty(),
      })
    )
    .query(async ({ input }) => {
      const res = await prisma.userModel.findUnique({
        where: {
          username: input.username,
        },
        include: {
          project: true,
        },
      });
      console.log('response find one - ', res);
      return res;
    }),

  checkUsername: procedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ input }) => {
      if (input.username.length < 3) return false;
      const res = await prisma.userModel.findUnique({
        where: {
          username: input.username,
        },
      });

      if (!res) {
        return false;
      }

      return true;
    }),
});