import { z } from 'zod';
import { protectedProcedure } from '../../../trpc';

export const update = protectedProcedure
  .input(
    z.object({
      avatar: z.string().nonempty(),
    })
  )
  .mutation(({ ctx, input }) => {
    try {
      const updateUser = ctx.prisma.userModel.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          profilePicture: input.avatar,
        },
      });
      return updateUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  });
