import { Router } from "express";
import * as ideaController from "./idea.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

// public
router.get("/", ideaController.getAllApprovedIdeas);
router.get("/:id", ideaController.getIdeaById);

// member
router.post("/", auth(UserRole.MEMBER, UserRole.ADMIN), ideaController.createIdea);
router.get("/my/idea", auth(UserRole.MEMBER, UserRole.ADMIN), ideaController.getMemberIdeas);
router.patch("/:id", auth(UserRole.MEMBER, UserRole.ADMIN), ideaController.updateIdea);
router.delete("/:id", auth(UserRole.MEMBER, UserRole.ADMIN), ideaController.deleteIdea);
router.patch("/:id/submit", auth(UserRole.MEMBER, UserRole.ADMIN), ideaController.submitIdea);

// admin
router.get("/admin/all", auth(UserRole.ADMIN), ideaController.getAllIdeasAdmin);
router.patch("/admin/:id/approve", auth(UserRole.ADMIN), ideaController.approveIdea);
router.patch("/admin/:id/reject", auth(UserRole.ADMIN), ideaController.rejectIdea);
router.delete("/admin/:id", auth(UserRole.ADMIN), ideaController.adminDeleteIdea);

export default router;

export const ideaRouter: Router = router;