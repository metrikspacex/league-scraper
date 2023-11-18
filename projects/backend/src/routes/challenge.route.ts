import { Router } from "express";

import { ChallengeController } from "@/controllers";

const router = Router();
const controller = new ChallengeController();
router.get("/challenge", controller.index);
export { router as challengeRoutes };
