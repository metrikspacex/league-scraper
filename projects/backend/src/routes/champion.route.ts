import { Router } from "express";

import { ChampionController } from "@/controllers";

const router = Router();
const controller = new ChampionController();
router.get("/champion", controller.index);
export { router as championRoutes };
