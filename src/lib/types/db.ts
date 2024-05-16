export type User = {
  id: string;
  username: string;
  email: string;
  provider:"credentials";
  role: "student" | "teacher";
};

export type Post = {
  id: string;
  userId: string;
  topic: string;
  created_at: string;
  description: string;
  image: string;
};

export type Settings = {
  userId: string;
  subject: string;
  lastingDays: number;
  isNotified: boolean;
  paintingTime: string;
};
