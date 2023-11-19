import { Router } from "express";

import { PublicController } from "@/controllers";

const router = Router();
const controller = new PublicController();
router.get("/public", controller.access);
export { router as publicRoutes };
