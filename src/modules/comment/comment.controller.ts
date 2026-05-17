import { Request, Response } from "express";
import { commentService } from "./comment.services";


export const addComment = async (req: Request, res: Response) => {
  try {
    const { content, ideaId, parentId } = req.body;
    const comment = await commentService.addComment({
      content,
      ideaId,
      parentId,
      userId: req.user!.id,
    });
    res.status(201).json({ success: true, data: comment });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to add comment" });
  }
};

export const getCommentsByIdea = async (req: Request, res: Response) => {
  try {
    const { ideaId } = req.params;
    const comments = await commentService.getCommentsByIdea(ideaId as string);
    res.status(200).json({ success: true, data: comments });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch comments" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await commentService.deleteComment(id as string);
    res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete comment" });
  }
};


export const commentController = {
  deleteComment,
  getCommentsByIdea,
  addComment
  
};
