import { Router } from "express";

import { ItemController } from "@/controllers";

const router = Router();
const itemController = new ItemController();
router.get("/item", itemController.index);
export { router as itemRoutes };
