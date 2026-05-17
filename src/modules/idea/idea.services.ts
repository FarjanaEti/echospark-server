import { prisma } from "../../lib/prisma";
import { IdeaStatus } from "@prisma/client";

export const createIdea = async (data: {
  title: string;
  problemStatement: string;
  proposedSolution: string;
  description: string;
  images: string[];
  isPaid: boolean;
  price?: number;
  categoryId: string;
  authorId: string;
}) => {
  return prisma.idea.create({ data });
};

export const submitIdea = async (id: string, authorId: string) => {
  return prisma.idea.update({
    where: { id, authorId, status: "DRAFT" },
    data: { status: "UNDER_REVIEW" },
  });
};

export const getAllApprovedIdeas = async (filters: {
  search?: string;
  categoryId?: string;
  isPaid?: boolean;
  sortBy?: string;
  page?: number;
  limit?: number;
}) => {
  const { search, categoryId, isPaid, sortBy, page = 1, limit = 10 } = filters;

  const where: any = { status: "APPROVED" };
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }
  if (categoryId) where.categoryId = categoryId;
  if (isPaid !== undefined) where.isPaid = isPaid;

  const orderBy: any =
    sortBy === "votes"
      ? { votes: { _count: "desc" } }
      : { createdAt: "desc" };

  const [ideas, total] = await Promise.all([
    prisma.idea.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        author: { select: { id: true, name: true, profileImage: true } },
        category: true,
        _count: { select: { votes: true, comments: true } },
      },
    }),
    prisma.idea.count({ where }),
  ]);

  return { ideas, total, page, limit };
};

export const getIdeaById = async (id: string) => {
  return prisma.idea.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true, profileImage: true } },
      category: true,
      votes: true,
      comments: {
        where: { parentId: null },
        include: {
          user: { select: { id: true, name: true, profileImage: true } },
          replies: {
            include: {
              user: { select: { id: true, name: true, profileImage: true } },
            },
          },
        },
      },
      _count: { select: { votes: true, comments: true } },
    },
  });
};

export const getMemberIdeas = async (authorId: string) => {
  return prisma.idea.findMany({
    where: { authorId },
    include: { category: true, _count: { select: { votes: true } } },
    orderBy: { createdAt: "desc" },
  });
};

export const updateIdea = async (
  id: string,
  authorId: string,
  data: Partial<{
    title: string;
    problemStatement: string;
    proposedSolution: string;
    description: string;
    images: string[];
    isPaid: boolean;
    price: number;
    categoryId: string;
  }>
) => {
  return prisma.idea.update({
    where: { id, authorId, status: { in: ["DRAFT", "REJECTED"] } },
    data,
  });
};

export const deleteIdea = async (id: string, authorId: string) => {
  return prisma.idea.delete({
    where: { id, authorId, status: { in: ["DRAFT", "REJECTED"] } },
  });
};

// Admin
export const getAllIdeasAdmin = async () => {
  return prisma.idea.findMany({
    include: {
      author: { select: { id: true, name: true, email: true } },
      category: true,
      _count: { select: { votes: true, comments: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const approveIdea = async (id: string) => {
  return prisma.idea.update({
    where: { id },
    data: { status: "APPROVED" },
  });
};

export const rejectIdea = async (id: string, rejectionFeedback: string) => {
  return prisma.idea.update({
    where: { id },
    data: { status: "REJECTED", rejectionFeedback },
  });
};

export const adminDeleteIdea = async (id: string) => {
  return prisma.idea.delete({ where: { id } });
};

export const ideaService={
  createIdea,
  submitIdea,
  adminDeleteIdea,
  rejectIdea,
  approveIdea,
  getAllApprovedIdeas,
  deleteIdea,
  getAllIdeasAdmin,
  updateIdea,
  getMemberIdeas,
  getIdeaById

}