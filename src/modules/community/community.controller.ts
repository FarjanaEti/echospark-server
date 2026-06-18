import { Request, Response, NextFunction } from "express";
import { communityService } from "./community.service";


export const createCommunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id; // from your auth middleware
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, location, description, membershipType } = req.body;

    if (!name || !location || !description) {
      return res.status(400).json({ message: "name, location, and description are required." });
    }

    const community = await communityService.createCommunity(userId, {
      name,
      location,
      description,
      membershipType: membershipType ?? "OPEN",
    });

    return res.status(201).json(community);
  } catch (err) {
    next(err);
  }
}

export const getMyCommunities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const communities = await communityService.getUserCommunities(userId);
    return res.status(200).json(communities);
  } catch (err) {
    next(err);
  }
}

export const getCommunityById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const community = await communityService.getCommunityById(id as string, userId); 
    if (!community) return res.status(404).json({ message: "Community not found." });

    return res.status(200).json(community);
  } catch (err) {
    next(err);
  }
}

export const joinCommunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    const result = await communityService.joinCommunity(id as string, userId);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export const getAllPublicCommunities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const communities = await communityService.getAllPublicCommunities();
    return res.status(200).json(communities);
  } catch (err) {
    next(err);
  }
}

export const communityController={
  createCommunity,
  getMyCommunities,
  getCommunityById,
  joinCommunity,
  getAllPublicCommunities
}