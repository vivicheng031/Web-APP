import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { studentUserTable, teacherUserTable } from "@/db/schema";
import { authSchema } from "@/validators/auth";

export default CredentialsProvider({
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    username: { label: "Username", type: "text", optional: true },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    let validatedCredentials: {
      email: string;
      username?: string;
      password: string;
    };
    try {
      validatedCredentials = authSchema.parse(credentials);
      console.log("Validated:", validatedCredentials);
    } catch (error) {
      console.log("Wrong credentials. Try again.");
      return null;
    }
    const { email, password } = validatedCredentials;

    // Attempt to authenticate as a teacher first
    const [teacher] = await db
      .select({
        id: teacherUserTable.id,
        email: teacherUserTable.email,
        password: teacherUserTable.password,
        username: teacherUserTable.name,
      })
      .from(teacherUserTable)
      .where(
        eq(teacherUserTable.email, validatedCredentials.email.toLowerCase()),
      )
      .execute();

    if (teacher) {
      if (!teacher.password) {
        console.log("User has no password. Please sign up.");
        return null;
      } else {
        const isTeacherPasswordValid = await bcrypt.compare(
          password,
          teacher.password,
        );
        if (isTeacherPasswordValid) {
          return {
            id: teacher.id.toString(),
            email: teacher.email,
            userType: "teacher",
          };
        } else {
          console.log("Wrong password. Try again.");
          return null;
        }
      }
    }
    // If not authenticated as teacher, attempt as a student
    const [student] = await db
      .select({
        id: studentUserTable.id,
        email: studentUserTable.email,
        password: studentUserTable.password,
        name: studentUserTable.name,
        // role: { value: 'teacher', as: 'userType' }
      })
      .from(studentUserTable)
      .where(eq(studentUserTable.email, email.toLowerCase()))
      .execute();

    if (student) {
      if (!student.password) {
        console.log("User has no password. Please sign up.");
        return null;
      } else {
        const isStudentPasswordValid = await bcrypt.compare(
          password,
          student.password,
        );
        if (isStudentPasswordValid) {
          return {
            id: student.id.toString(),
            email: student.email,
            userType: "student",
            name: student.name,
          };
        } else {
          console.log("Wrong password. Try again.");
          return null;
        }
      }
    }

    // If no record found in both tables
    console.log("No user found with this email.");
    return null;
  },
});
