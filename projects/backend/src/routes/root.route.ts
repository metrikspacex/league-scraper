import { Router } from "express";

import { RootController } from "@/controllers";

const router = Router();
const controller = new RootController();
router.get("/api/v1/", controller.index);
router.post("/api/v1/", controller.incoming);
export { router as rootRoutes };
