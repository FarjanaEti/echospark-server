import { prisma } from "../../lib/prisma";

export const addReview = async (data: {
  rating: number;
  experience: string;
  userId: string;
  ideaId: string;
}) => {
  return prisma.review.upsert({
    where: { userId_ideaId: { userId: data.userId, ideaId: data.ideaId } },
    update: { rating: data.rating, experience: data.experience },
    create: data,
  });
};

export const getReviewsByIdea = async (ideaId: string) => {
  return prisma.review.findMany({
    where: { ideaId },
    include: {
      user: { select: { id: true, name: true, profileImage: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const reviewServices = {
 getReviewsByIdea,
 addReview
};
