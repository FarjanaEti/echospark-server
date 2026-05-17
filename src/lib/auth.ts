import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

const isProduction = process.env.NODE_ENV === "production";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL,

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  trustedOrigins: [
    process.env.APP_URL || "http://localhost:3000",
    "https://*.vercel.app",
  ],

  cookies: {
    sessionToken: {
      name: "better-auth.session_token",
      attributes: {
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
        path: "/",
      },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },

  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: isProduction,
    disableCSRFCheck: true,
  },

  user: {
    
  fields: {
    image: "profileImage", 
  },
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "MEMBER",
        required: false,
        input: true,
      },
     
      bio: {
        type: "string",
        required: false,
          input: true,
      },
      isActive: {
        type: "boolean",
        defaultValue: true,
        required: false,
          input: true,
      },
      phone: {
      type: "string",
      required: false,
      input: true,
    }
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
     requireEmailVerification: false,
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
               emailVerified: true,
            },
          };
        },
      },
    },
  },
});