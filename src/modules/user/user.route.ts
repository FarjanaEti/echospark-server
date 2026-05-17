import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import {
  getAllUsers,
  toggleUserActive,
  changeUserRole,
  getMyProfile,
  updateMyProfile,
} from "./user.controller";

const router = Router();

// member
router.get("/me", auth(UserRole.MEMBER, UserRole.ADMIN), getMyProfile);
router.patch("/me", auth(UserRole.MEMBER, UserRole.ADMIN), updateMyProfile);

// admin
router.get("/", auth(UserRole.ADMIN), getAllUsers);
router.patch("/:id/toggle-active", auth(UserRole.ADMIN), toggleUserActive);
router.patch("/:id/role", auth(UserRole.ADMIN), changeUserRole);


export const userRouter: Router = router;