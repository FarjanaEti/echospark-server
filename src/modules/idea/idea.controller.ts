import { Request, Response } from "express";
import { ideaService } from "./idea.services";



export const createIdea = async (req: Request, res: Response) => {
  try {
    const idea = await ideaService.createIdea({
      ...req.body,
      authorId: req.user!.id,
    });
    res.status(201).json({ success: true, data: idea });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create idea" });
  }
};

export const submitIdea = async (req: Request, res: Response) => {
  try {
    const idea = await ideaService.submitIdea(req.params.id, req.user!.id);
    res.status(200).json({ success: true, data: idea });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to submit idea" });
  }
};

export const getAllApprovedIdeas = async (req: Request, res: Response) => {
  try {
    const { search, categoryId, isPaid, sortBy, page, limit } = req.query;
    const result = await ideaService.getAllApprovedIdeas({
      search: search as string,
      categoryId: categoryId as string,
      isPaid: isPaid === "true" ? true : isPaid === "false" ? false : undefined,
      sortBy: sortBy as string,
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 10,
    });
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch ideas" });
  }
};

export const getIdeaById = async (req: Request, res: Response) => {
  try {
    const idea = await ideaService.getIdeaById(req.params.id);
    if (!idea) return res.status(404).json({ success: false, message: "Idea not found" });
    res.status(200).json({ success: true, data: idea });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch idea" });
  }
};

export const getMemberIdeas = async (req: Request, res: Response) => {
  try {
    const ideas = await ideaService.getMemberIdeas(req.user!.id);
    res.status(200).json({ success: true, data: ideas });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch ideas" });
  }
};

export const updateIdea = async (req: Request, res: Response) => {
  try {
    const idea = await ideaService.updateIdea(req.params.id, req.user!.id, req.body);
    res.status(200).json({ success: true, data: idea });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update idea" });
  }
};

export const deleteIdea = async (req: Request, res: Response) => {
  try {
    await ideaService.deleteIdea(req.params.id, req.user!.id);
    res.status(200).json({ success: true, message: "Idea deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete idea" });
  }
};

// Admin
export const getAllIdeasAdmin = async (req: Request, res: Response) => {
  try {
    const ideas = await ideaService.getAllIdeasAdmin();
    res.status(200).json({ success: true, data: ideas });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch ideas" });
  }
};

export const approveIdea = async (req: Request, res: Response) => {
  try {
    const idea = await ideaService.approveIdea(req.params.id);
    res.status(200).json({ success: true, data: idea });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to approve idea" });
  }
};

export const rejectIdea = async (req: Request, res: Response) => {
  try {
    const { rejectionFeedback } = req.body;
    const idea = await ideaService.rejectIdea(req.params.id, rejectionFeedback);
    res.status(200).json({ success: true, data: idea });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to reject idea" });
  }
};

export const adminDeleteIdea = async (req: Request, res: Response) => {
  try {
    await ideaService.adminDeleteIdea(req.params.id);
    res.status(200).json({ success: true, message: "Idea deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete idea" });
  }
};
export const cartController={
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