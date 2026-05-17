import { Request, Response } from "express";
import { voteService } from "./vote.services";


export const castVote = async (req: Request, res: Response) => {
  try {
    const { ideaId, type } = req.body;
    const vote = await voteService.castVote(req.user!.id, ideaId, type);
    res.status(200).json({ success: true, data: vote });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to cast vote" });
  }
};

export const removeVote = async (req: Request, res: Response) => {
  try {
    const { ideaId } = req.params;
    await voteService.removeVote(req.user!.id, ideaId as string);
    res.status(200).json({ success: true, message: "Vote removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to remove vote" });
  }
};

export const getVotesByIdea = async (req: Request, res: Response) => {
  try {
    const { ideaId } = req.params;
    const votes = await voteService.getVotesByIdea(ideaId as string);
    res.status(200).json({ success: true, data: votes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch votes" });
  }
};
export const VoteController = {
 getVotesByIdea,
 removeVote,
 castVote
};
