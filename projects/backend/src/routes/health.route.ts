import { Router } from "express";

import { HealthController } from "@/controllers";

const router = Router();
const controller = new HealthController();
router.get("/health", controller.index);
export { router as healthRoutes };
