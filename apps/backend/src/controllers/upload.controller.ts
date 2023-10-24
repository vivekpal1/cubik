import { Request, Response } from "express";
import {
  createFailureResponseData,
  createSuccessResponse,
} from "types/response";
import { UploadURLs } from "utils/upload";
import { prisma } from "@cubik/database";
export const uploadFromURL = async (req: Request, res: Response) => {
  try {
    const data = await prisma.user.findMany({
      where: {
        profilePicture: {
          not: {
            equals: null,
          },
        },
      },
    });
    const logos: string[] = [];

    data.forEach((e) => {
      if (e.profilePicture) {
        logos.push(e.profilePicture);
      }
    });

    const urlChanges = await UploadURLs(logos);

    urlChanges?.forEach(async (changes) => {
      const userInfo = data.find((e) => e.profilePicture === changes.oldLink);
      if (!userInfo) return;
      await prisma.user.update({
        where: {
          id: userInfo?.id,
        },
        data: {
          profilePicture: changes.newLink,
        },
      });
    });

    return res.status(200).send(createSuccessResponse(200, data));
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .send(createFailureResponseData(500, "Error while uploading", null));
  }
};
