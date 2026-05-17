import { Request, Response } from "express";
import { categoryService } from "./category.services";


export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const category = await categoryService.createCategory(name);
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create category" });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch categories" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await categoryService.deleteCategory(id as string);
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete category" });
  }
};