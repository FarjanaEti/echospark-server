import { string } from "better-auth";
import { prisma } from "../../lib/prisma";
import { Role } from "../../../generated/prisma/enums";

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      profileImage: true,
      isActive: true,
      createdAt: true,
    },
  });
};

export const toggleUserActive = async (id: string, isActive: boolean) => {
  return prisma.user.update({ where: { id }, data: { isActive } });
};

export const changeUserRole = async (id: string, role: Role) => {
  return prisma.user.update({ where: { id }, data: { role  } });
};

export const getUserProfile = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      profileImage: true,
      bio: true,
      isActive: true,
      createdAt: true,
    },
  });
};

export const updateUserProfile = async (
  id: string,
  data: { name?: string; profileImage?: string; bio?: string }
) => {
  return prisma.user.update({ where: { id }, data });
};

export const userService={
  getAllUsers,
  toggleUserActive,
  changeUserRole,
  getUserProfile,
  updateUserProfile
}