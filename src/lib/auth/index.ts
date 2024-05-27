import NextAuth from "next-auth";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { teacherUserTable, studentUserTable } from "@/db/schema";

import CredentialsProvider from "./CredentialsProvider";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [CredentialsProvider],
  callbacks: {
    async session({ session, token }) {
      const email = token.email || session?.user?.email;
      console.log("Email:", email);
      if (!email) return session;

      try {
        // Check teacherUserTable
        const [teacher] = await db
          .select({
            id: teacherUserTable.id,
            username: teacherUserTable.name,
            email: teacherUserTable.email,
          })
          .from(teacherUserTable)
          .where(eq(teacherUserTable.email, email.toLowerCase()))
          .execute();
        console.log("Teacher:", teacher);

        if (teacher) {
          console.log("Teacher yes:", teacher);
          return {
            ...session,
            user: {
              id: teacher.id.toString(),
              username: teacher.username,
              email: teacher.email,
              userType: "teacher",
              provider: "credentials",
            },
          };
          // session.user = {
          //   ...session.user,
          //   id: teacher.id.toString(),
          //   username: teacher.username,
          //   email: teacher.email,
          //   userType: 'teacher',
          //   provider: "credentials",
          // };
        } else {
          // Check studentUserTable
          const [student] = await db
            .select({
              id: studentUserTable.id,
              username: studentUserTable.name,
              email: studentUserTable.email,
            })
            .from(studentUserTable)
            .where(eq(studentUserTable.email, email.toLowerCase()))
            .execute();
          console.log("Student:", student);

          if (student) {
            console.log("Student yes:", student);
            return {
              ...session,
              user: {
                id: student.id.toString(),
                username: student.username,
                email: student.email,
                userType: "student",
                provider: "credentials",
              },
            };
            // session.user = {
            //   ...session.user,
            //   id: student.id.toString(),
            //   username: student.username,
            //   email: student.email,
            //   userType: 'student',
            //   provider: "credentials",
            // };
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        return session;
      }

      console.log("User Type:", session.user?.userType ?? "");
      return session;
    },
    async jwt({ token, account }) {
      // Sign in with social account, e.g., GitHub, Google, etc.
      if (!account) return token; // Ensure a token is returned if no account

      const { name, email } = token;
      const provider = account.provider;
      if (!name || !email || !provider) return token; // Return the existing token if required data is missing

      // Check if the email has been registered in either teacher or student tables
      const [existedTeacher] = await db
        .select({ id: teacherUserTable.id })
        .from(teacherUserTable)
        .where(eq(teacherUserTable.name, name))
        .execute();
      console.log("Existed Teacher:", existedTeacher);

      const [existedStudent] = await db
        .select({ id: studentUserTable.id })
        .from(studentUserTable)
        .where(eq(studentUserTable.name, name))
        .execute();

      if (
        existedTeacher ||
        existedStudent ||
        (provider !== "github" && provider !== "google")
      ) {
        console.log("User already exists:", existedTeacher, existedStudent);
        return token; // Return the existing token if any checks pass
      }

      // You can add any additional logic here to modify the token as necessary
      return token; // Always return a token, ensuring it's never undefined
    },

    // async redirect({ url, baseUrl, session }) {
    //   // Redirect based on user role
    //   if (session?.user?.userType === 'teacher') {
    //     return `${baseUrl}/teacher-dashboard`;
    //   } else if (session?.user?.userType === 'student') {
    //     return `${baseUrl}/student-dashboard`;
    //   }
    //   return baseUrl;
    // },
  },
  pages: {
    signIn: "/painting", // Assuming you have a proper login page at "/login"
  },
});
