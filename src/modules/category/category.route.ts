import { Router } from "express";
import * as categoryController from "./category.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

// public
router.get("/", categoryController.getAllCategories);

// admin only
router.post("/",  categoryController.createCategory);
router.delete("/:id", auth(UserRole.ADMIN), categoryController.deleteCategory);

export default router;

export const categoryRouter: Router = router;