import { Request, Response } from "express";
import { userService } from "./user.services";


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

export const toggleUserActive = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.body;
    const { id } = req.params;
    const user = await userService.toggleUserActive(id as string, isActive);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

export const changeUserRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.body;
    const { id } = req.params;
    const user = await userService.changeUserRole(id as string, role);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to change role" });
  }
};

export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserProfile(id as string);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch profile" });
  }
};

export const updateMyProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.updateUserProfile(id as string, req.body);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update profile" });
  }
};

export const userController = {
getMyProfile,
updateMyProfile,
changeUserRole,
toggleUserActive,
getAllUsers
}