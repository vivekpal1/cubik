/* eslint-disable @typescript-eslint/no-misused-promises */
import { getSquadsTxs } from "controllers/squads.controller";
import { getSquadsTxs as v4GetSquadsTx } from "controllers/v4.squads.controller";

import { Router } from "express";

export const squadsRouter = Router();

squadsRouter.get("/", getSquadsTxs);
squadsRouter.get("/v4", v4GetSquadsTx);
