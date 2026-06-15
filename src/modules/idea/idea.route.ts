import { Router } from "express";
import * as ideaController from "./idea.controller";
import auth, { UserRole } from "../../middleware/auth";

type IdeaIdParams = { id: string };

const router = Router();

// public
router.get("/", ideaController.getAllApprovedIdeas);
router.get<IdeaIdParams>("/:id", ideaController.getIdeaById);

// member
router.post("/", auth(UserRole.MEMBER, UserRole.ADMIN), ideaController.createIdea);
router.get("/my/idea", auth(UserRole.MEMBER, UserRole.ADMIN), ideaController.getMemberIdeas);
router.patch<IdeaIdParams>("/:id", auth(UserRole.MEMBER, UserRole.ADMIN), ideaController.updateIdea);
router.delete<IdeaIdParams>("/:id", auth(UserRole.MEMBER, UserRole.ADMIN), ideaController.deleteIdea);
router.patch<IdeaIdParams>("/:id/submit", auth(UserRole.MEMBER, UserRole.ADMIN), ideaController.submitIdea);

// admin
router.get("/admin/all", auth(UserRole.ADMIN), ideaController.getAllIdeasAdmin);
router.patch<IdeaIdParams>("/admin/:id/approve", auth(UserRole.ADMIN), ideaController.approveIdea);
router.patch<IdeaIdParams>("/admin/:id/reject", auth(UserRole.ADMIN), ideaController.rejectIdea);
router.delete<IdeaIdParams>("/admin/:id", auth(UserRole.ADMIN), ideaController.adminDeleteIdea);

export default router;

export const ideaRouter: Router = router;