/* eslint-disable @typescript-eslint/no-misused-promises */
import { getSquadsTxs } from "controllers/squads.controller";
import { Router } from "express";

export const squadsRouter = Router();

squadsRouter.get("/", getSquadsTxs);
