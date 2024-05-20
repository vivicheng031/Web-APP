import NextAuth from "next-auth";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

import CredentialsProvider from "./CredentialsProvider";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [CredentialsProvider],
  callbacks: {
    async session({ session, token }) {
      const email = token.email || session?.user?.email;
      if (!email) return session;

      const [user] = await db
        .select({
          id: usersTable.displayId,
          username: usersTable.username,
          email: usersTable.email,
          student_or_teacher: usersTable.studentOrTeacher,
        })
        .from(usersTable)
        .where(eq(usersTable.email, email.toLowerCase()))
        .execute();

      if (user) {
        session.user = {
          ...session.user,
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.student_or_teacher === "student" ? "student" : "teacher",
          provider: "credentials",
        };
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const email = user.email;
        if (email) {
          const [dbUser] = await db
            .select({
              id: usersTable.displayId,
              student_or_teacher: usersTable.studentOrTeacher,
            })
            .from(usersTable)
            .where(eq(usersTable.email, email.toLowerCase()))
            .execute();

          if (dbUser) {
            token.id = dbUser.id;
            token.role =
              dbUser.student_or_teacher === "student" ? "student" : "teacher";
          }
        }
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Redirect based on user role
      if (url === "/personal") {
        return baseUrl;
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: "/personal",
  },
});
