import { Router } from "express";

import { ItemController } from "@/controllers";

const router = Router();
const controller = new ItemController();
router.get("/item", controller.index);
export { router as itemRoutes };
