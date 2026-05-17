import { prisma } from "../../lib/prisma";

export const createCategory = async (name: string) => {
  return prisma.category.create({
    data: { name },
  });
};

export const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: { createdAt: "asc" },
  });
};

export const deleteCategory = async (id: string) => {
  return prisma.category.delete({
    where: { id },
  });
};

export const categoryService = {
  createCategory,
  getAllCategories,
  deleteCategory
};
