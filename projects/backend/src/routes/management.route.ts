import { Router } from "express";

import { ManagementController } from "@/controllers";

const router = Router();
const controller = new ManagementController();
router.get("/management", controller.index);
export { router as managementRoutes };
