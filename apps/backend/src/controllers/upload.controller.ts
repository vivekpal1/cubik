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

    return res.status(200).send(createSuccessResponse(200, uploadedFiles));
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .send(createFailureResponseData(500, "Error while uploading", null));
  }
};
