import { Router } from "express";

import { HealthController } from "@/controllers";

const router = Router();
const healthController = new HealthController();
router.get("/health", healthController.index);
export { router as healthRoutes };
