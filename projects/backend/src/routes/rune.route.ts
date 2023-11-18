import { Router } from "express";

import { RuneController } from "@/controllers";

const router = Router();
const controller = new RuneController();
router.get("/rune", controller.index);
export { router as runeRoutes };
