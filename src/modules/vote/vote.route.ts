import { Router } from "express";
import * as voteController from "./vote.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.get("/:ideaId", voteController.getVotesByIdea);
router.post("/", auth(UserRole.MEMBER, UserRole.ADMIN), voteController.castVote);
router.delete("/:ideaId", auth(UserRole.MEMBER, UserRole.ADMIN), voteController.removeVote);

export default router;
export const VoteRouter: Router = router;