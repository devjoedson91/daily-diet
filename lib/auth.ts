import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { db } from "./prisma";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, user, token }) {
      if (session.user) {
        session.user.id = user.id;
      }

      // session.user = {
      //   ...session.user,
      //   id: user.id,
      // } as any;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/statistic";
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
