import { Router } from "express";

import { SpellController } from "@/controllers";

const router = Router();
const controller = new SpellController();
router.get("/api/v1/spell", controller.index);
export { router as spellRoutes };
