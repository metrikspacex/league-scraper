import { Router } from "express";

import { SpellController } from "@/controllers";

const router = Router();
const controller = new SpellController();
router.get("/spell", controller.index);
export { router as spellRoutes };
