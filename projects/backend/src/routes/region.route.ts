import { Router } from "express";

import { RegionController } from "@/controllers";

const router = Router();
const controller = new RegionController();
router.get("/api/v1/region", controller.index);
export { router as regionRoutes };
