import { Router } from "express";

import { MasteryController } from "@/controllers";

const router = Router();
const controller = new MasteryController();
router.get("/api/v1/mastery", controller.index);
export { router as masteryRoutes };
