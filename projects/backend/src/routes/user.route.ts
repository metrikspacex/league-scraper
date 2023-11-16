import { Router } from "express";

import { UserController } from "@/controllers";

const router = Router();
const userController = new UserController();
router.get("/", userController.index);

export { router as userRoutes };