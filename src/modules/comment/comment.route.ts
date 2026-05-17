import { Router } from "express";
import * as commentController from "./comment.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.get("/:ideaId", commentController.getCommentsByIdea);
router.post("/", auth(UserRole.MEMBER, UserRole.ADMIN), commentController.addComment);
router.delete("/:id", auth(UserRole.ADMIN), commentController.deleteComment);

export default router;
export const commentRouter: Router = router;
