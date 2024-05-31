export type User = {
  id: string;
  username: string;
  email: string;
  provider: "credentials";
  role: "student" | "teacher";
};

export type Post = {
  id: string;
  image: string;
  description: string;
  date: string;
  topicId: string;
};

export type Book = {
  id: string;
  date: string;
  topic: string;
};
