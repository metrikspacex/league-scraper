import { Router } from "express";

import { RegionController } from "@/controllers";

const router = Router();
const controller = new RegionController();
router.get("/region", controller.index);
export { router as regionRoutes };
