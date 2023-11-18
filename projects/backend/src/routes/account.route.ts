import { Router } from "express";

import { AccountController } from "@/controllers";

const router = Router();
const controller = new AccountController();
router.get("/account", controller.index);
export { router as accountRoutes };
