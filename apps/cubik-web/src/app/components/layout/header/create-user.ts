"use server";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

export const getOrCreateUser = async (publicKey: string) => {
  const user = await prisma.userModel.findUnique({
    where: {
      mainWallet: publicKey,
    },
    select: {
      username: true,
    },
  });
  console.log(user);

  if (!user) {
    await prisma.userModel.create({
      data: {
        mainWallet: publicKey,
      },
    });

    return false;
  } else if (!user.username) {
    return false;
  } else true;
};
