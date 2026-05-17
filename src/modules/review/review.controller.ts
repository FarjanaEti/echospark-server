import { Request, Response } from "express";
import { reviewServices } from "./review.services";


export const addReview = async (req: Request, res: Response) => {
  try {
    const { rating, experience, ideaId } = req.body;
    const review = await reviewServices.addReview({
      rating,
      experience,
      ideaId,
      userId: req.user!.id,
    });
    res.status(201).json({ success: true, data: review });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to add review" });
  }
};

export const getReviewsByIdea = async (req: Request, res: Response) => {
  try {
    const { ideaId } = req.params;
    const reviews = await reviewServices.getReviewsByIdea(ideaId as string);
    res.status(200).json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch reviews" });
  }
};

export const reviewController={
       addReview,
       getReviewsByIdea                    
}