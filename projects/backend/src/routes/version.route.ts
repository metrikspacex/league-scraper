import { Router } from "express";

import { VersionController } from "@/controllers";

const router = Router();
const controller = new VersionController();
router.get("/api/v1/version", controller.index);
export { router as versionRoutes };
