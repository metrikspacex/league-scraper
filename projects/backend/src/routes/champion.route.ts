import { Router } from "express";

import { ChampionController } from "@/controllers";

const router = Router();
const championController = new ChampionController();
router.get("/champion", championController.index);
router.get("/champion/name/:id", championController.index);
router.post("/champion/name/:id", championController.index);
export { router as championRoutes };
