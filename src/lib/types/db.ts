export type User = {
  id: string;
  username: string;
  email: string;
  provider: "credentials";
  role: "student" | "teacher";
};

export type Post = {
  id: string;
  userId: string;
  created_at: string;
  description: string;
  image: string;
  topic: string;
};

export type Book = {
  id: string;
  displayId: string;
  topic: string;
  description: string;
  teacherId: string;
  date: string;
};