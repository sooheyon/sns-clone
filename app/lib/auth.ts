import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prismaClient } from "./prismaClient";

export const authOptions:NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prismaClient),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, user, token }) {

      session.user.id = token.id;

      return session;
    },
    async jwt({ token, user }) {

      if (user) {
        token.id = user.id;
      }

      return token;
    },
  },
}