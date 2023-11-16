import { Router } from "express";

import { RootController } from "@/controllers";

const router = Router();
const rootController = new RootController();
router.get("/", rootController.index);

export { router as rootRoutes };
