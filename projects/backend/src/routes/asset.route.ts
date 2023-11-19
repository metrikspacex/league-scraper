import { Router } from "express";

import { AssetController } from "@/controllers";

const router = Router();
const controller = new AssetController();
router.get("/api/v1/asset", controller.index);
export { router as assetRoutes };
