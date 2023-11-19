import { Router } from "express";

import { LanguageController } from "@/controllers";

const router = Router();
const controller = new LanguageController();
router.get("/api/v1/language", controller.index);
export { router as languageRoutes };
