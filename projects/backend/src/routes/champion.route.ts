import { Router } from "express";

import { ChampionController } from "@/controllers";

const router = Router();
const championController = new ChampionController();
router.get("/champion", championController.index);
router.get("/champion/:id", championController.champion);
export { router as championRoutes };
