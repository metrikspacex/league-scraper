import { Router } from "express";

import { ChampionController } from "@/controllers";

const router = Router();
const controller = new ChampionController();
router.get("/api/v1/champion", controller.index);
export { router as championRoutes };
