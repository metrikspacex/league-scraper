import { Router } from "express";

import { RootController } from "@/controllers";

const router = Router();
const controller = new RootController();
router.get("/", controller.index);
export { router as rootRoutes };
