import { VoteType } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";


export const castVote = async (userId: string, ideaId: string, type: VoteType) => {
  return prisma.vote.upsert({
    where: { userId_ideaId: { userId, ideaId } },
    update: { type },
    create: { userId, ideaId, type },
  });
};

export const removeVote = async (userId: string, ideaId: string) => {
  return prisma.vote.delete({
    where: { userId_ideaId: { userId, ideaId } },
  });
};

export const getVotesByIdea = async (ideaId: string) => {
  return prisma.vote.findMany({ where: { ideaId } });
};

export const voteService = {
    getVotesByIdea,
    removeVote,
    castVote
}