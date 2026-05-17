import { prisma } from "../../lib/prisma";

export const subscribe = async (email: string) => {
                              return prisma.newsletter.upsert({
                                                            where: { email },
                                                            update: {},
                                                            create: { email },
                              });
};

export const newsletterService = {
                              subscribe
}