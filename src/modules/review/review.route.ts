import { Router } from "express";
import * as reviewController from "./review.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.get("/:ideaId", reviewController.getReviewsByIdea);
router.post("/", auth(UserRole.MEMBER, UserRole.ADMIN), reviewController.addReview);

export default router;

export const reviewRouter: Router = router;