import { prisma } from "../../lib/prisma";

export const addComment = async (data: {
  content: string;
  userId: string;
  ideaId: string;
  parentId?: string;
}) => {
  return prisma.comment.create({ data });
};

export const getCommentsByIdea = async (ideaId: string) => {
  return prisma.comment.findMany({
    where: { ideaId, parentId: null, isDeleted: false },
    include: {
      user: { select: { id: true, name: true, profileImage: true } },
      replies: {
        where: { isDeleted: false },
        include: {
          user: { select: { id: true, name: true, profileImage: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const deleteComment = async (id: string) => {
  return prisma.comment.update({
    where: { id },
    data: { isDeleted: true },
  });
};

export const commentService = {
  deleteComment,
  getCommentsByIdea,
  addComment
  
};
