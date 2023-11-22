import { Router } from "express";

import { AccountController } from "@/controllers";

const router = Router();
const controller = new AccountController();
router.get("/api/v1/account", controller.index);
router.post("/api/v1/account/email/:id", controller.findByEmail);
router.post("/api/v1/account/username/:id", controller.findByUsername);
export { router as accountRoutes };
