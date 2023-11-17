import { Router } from "express";

import { ManagementController } from "@/controllers";

const router = Router();
const managementController = new ManagementController();
router.get("/management", managementController.index);
export { router as managementRoutes };
