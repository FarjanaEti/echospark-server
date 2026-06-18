import { MembershipType } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";


interface CreateCommunityInput {
  name: string;
  location: string;
  description: string;
  membershipType: MembershipType;
}

export const createCommunity=async (
  creatorId: string,
  data: CreateCommunityInput
) => {
  // Create community and auto-add creator as CREATOR role member
  const community = await prisma.community.create({
    data: {
      name: data.name,
      location: data.location,
      description: data.description,
      membershipType: data.membershipType,
      creatorId,
      members: {
        create: {
          userId: creatorId,
          role: "CREATOR",
        },
      },
    },
    include: {
      creator: { select: { id: true, name: true, email: true } },
      _count: { select: { members: true } },
    },
  });

  return community;
}

export async function getUserCommunities(userId: string) {
  return prisma.community.findMany({
    where: {
      members: {
        some: { userId },
      },
    },
    include: {
      creator: { select: { id: true, name: true } },
      _count: { select: { members: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCommunityById(
  communityId: string,
  requestingUserId?: string
) {
  const community = await prisma.community.findUnique({
    where: { id: communityId },
    include: {
      creator: { select: { id: true, name: true } },
      members: {
        include: {
          user: { select: { id: true, name: true, email: true } },
        },
      },
      _count: { select: { members: true } },
    },
  });

  if (!community) return null;

  // For PRIVATE communities, only members can see full details
  if (community.privacy === "PRIVATE" && requestingUserId) {
    const isMember = community.members.some(
      (m) => m.userId === requestingUserId
    );
    if (!isMember) {
      // Return limited info only
      return {
        id: community.id,
        name: community.name,
        description: community.description,
        privacy: community.privacy,
        membershipType: community.membershipType,
        restricted: true,
      };
    }
  }

  return community;
}

export async function joinCommunity(communityId: string, userId: string) {
  const community = await prisma.community.findUnique({
    where: { id: communityId },
  });

  if (!community) throw new Error("Community not found");

  if (community.membershipType === "INVITE") {
    throw new Error("This community is invite-only.");
  }

  // Upsert prevents duplicate memberships
  const membership = await prisma.communityMember.upsert({
    where: {
      communityId_userId: { communityId, userId },
    },
    update: {},
    create: { communityId, userId, role: "MEMBER" },
  });

  return membership;
}

export async function getAllPublicCommunities() {
  return prisma.community.findMany({
    where: { privacy: "PUBLIC" },
    include: {
      creator: { select: { id: true, name: true } },
      _count: { select: { members: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export const communityService={
  createCommunity,
  getUserCommunities,
  getCommunityById,
  joinCommunity,
  getAllPublicCommunities
}