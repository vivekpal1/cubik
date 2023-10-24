import { Request, Response } from "express";
import {
  createFailureResponseData,
  createSuccessResponse,
} from "types/response";
import { utapi } from "utils/upload";


export const uploadFromURL = async (req: Request, res: Response) => {
  try {
    const { urls } = req.body as { urls: string[] };
    const uploadedFiles = await utapi.uploadFilesFromUrl(urls);
    const urlChanges: {
      oldLink: string;
      newLink: string;
    }[] = [];

    urls.forEach((url) => {
      let newUrl = new URL(url);
      const filename = newUrl.pathname.split("/").pop() ?? "unknown-filename";

      const newfile = uploadedFiles.find((e) => e.data?.name === filename);

      urlChanges.push({
        newLink: newfile?.data?.url || url,
        oldLink: url,
      });
    });

    return res.status(200).send(createSuccessResponse(200, urlChanges));
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .send(createFailureResponseData(500, "Error while uploading", null));
  }
};
