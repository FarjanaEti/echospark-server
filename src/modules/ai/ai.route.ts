import { Router } from "express";

import auth, { UserRole } from "../../middleware/auth";
import { chatWithAI } from "./ai.controller";

const router = Router();

router.post("/chat", auth(UserRole.MEMBER, UserRole.ADMIN), chatWithAI);

export const aiRouter: Router = router;
