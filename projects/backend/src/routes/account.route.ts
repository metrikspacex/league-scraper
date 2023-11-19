import { Router } from "express";

import { AccountController } from "@/controllers";

const router = Router();
const controller = new AccountController();
router.get("/api/v1/account", controller.index);
export { router as accountRoutes };
