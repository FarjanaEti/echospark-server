import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { communityController } from "./community.controller";

const router = Router();

// Public routes
router.get("/", communityController.getAllPublicCommunities);
router.get("/:id", communityController.getCommunityById);

// Protected routes (members only)
router.post("/",auth(UserRole.MEMBER),  communityController.createCommunity);
router.post("/:id/join",  communityController.joinCommunity);
router.get("/me/communities", communityController.getMyCommunities);

export const communityRouter: Router = router;