import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { authSchema } from "@/validators/auth";

export default CredentialsProvider({
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    username: { label: "Username", type: "text", optional: true },
    password: { label: "Password", type: "password" },
    student_or_teacher: { label: "Student or Teacher", type: "text" },
  },
  async authorize(credentials) {
    let validatedCredentials: {
      email: string;
      username?: string;
      password: string;
    };

    try {
      validatedCredentials = authSchema.parse(credentials);
    } catch (error) {
      console.log("Wrong credentials. Try again.");
      return null;
    }
    const { email, username, password } = validatedCredentials;

    const [existedUser] = await db
      .select({
        id: usersTable.displayId,
        username: usersTable.username,
        email: usersTable.email,
        student_or_teacher: usersTable.studentOrTeacher,
        hashedPassword: usersTable.hashedPassword,
      })
      .from(usersTable)
      .where(eq(usersTable.email, validatedCredentials.email.toLowerCase()))
      .execute();

    if (!existedUser.hashedPassword) {
      console.log("The email has already registered.");
      return null;
    }

    const isValid = await bcrypt.compare(password, existedUser.hashedPassword);
    if (!isValid) {
      console.log("Wrong password. Try again.");
      return null;
    }

    return {
      email: existedUser.email,
      name: existedUser.username,
      id: existedUser.id,
      student_or_teacher: existedUser.student_or_teacher,
    };
  },
});
