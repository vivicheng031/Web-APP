import { sql, relations } from "drizzle-orm";
import {
  index,
  text,
  pgTable,
  serial,
  uuid,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
// 所有使用者列表 (Column: id, displayId, email, student_or_teacher, name)
export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    username: varchar("username", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    hashedPassword: varchar("hashed_password", { length: 100 }),  // 使用者密碼 
    studentOrTeacher: varchar("student_or_teacher", { length: 100 }).notNull(),
    photo: varchar("photo")
      .notNull()
      .default(
        "https://drive.google.com/file/d/1Gizl9jq8m8BYRCwzNOa3Qs82zr7Zkoty/preview",
      ),
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

// 學生使用者資料表
export const studentUserTable = pgTable(
  "student_users",
  {
    id: serial("id").primaryKey(), // 使用serial生成學生id
    displayId: uuid("display_id").defaultRandom().notNull().unique(), // 使用uuid生成學生DisplayID
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    class: varchar("class_name", { length: 100 }).notNull(),
    // password: varchar("password", { length: 100 }).notNull(),
    date: timestamp("date")
      .notNull()
      .default(sql`now()`),
    
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

// 老師使用者資料表
export const teacherUserTable = pgTable(
  "teacher_users",
  {
    id: serial("id").primaryKey(), // 使用serial生成教師id
    displayId: uuid("display_id").defaultRandom().notNull().unique(), // 使用uuid生成教師DisplayID
    name: varchar("name", { length: 100 }).notNull(),
    // password: varchar("password", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

// 班級資料表
export const classTable = pgTable(
  "classes",
  {
    id: serial("id").primaryKey(), // 使用serial生成班級id
    displayId: uuid("display_id").defaultRandom().notNull().unique(), // 使用uuid生成班級DisplayID
    name: varchar("name", { length: 100 }).notNull(),
    teacherId: uuid("teacher_id")
      .notNull()
      .references(() => teacherUserTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    teacherIndex: index("teacher_index").on(table.teacherId),
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

// 圖片資料表
export const pictureTable = pgTable(
  "pictures",
  {
    id: serial("id").primaryKey(), // 使用serial生成圖片id
    displayId: uuid("display_id").defaultRandom().notNull().unique(), // 使用uuid生成圖片DisplayID
    image: varchar("image").notNull(),
    text: text("text").notNull(),
    studentId: uuid("student_id")
      .notNull()
      .references(() => studentUserTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    date: timestamp("date")
      .notNull()
      .default(sql`now()`),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

// 繪本資料表
export const pictureBookTable = pgTable(
  "picture_books",
  {
    id: serial("id").primaryKey(), // 使用serial生成繪本id
    displayId: uuid("display_id").defaultRandom().notNull().unique(), // 使用uuid生成繪本DisplayID
    studentId: uuid("student_id")
      .notNull()
      .references(() => studentUserTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    sendEmail: boolean("send_email").notNull().default(false),
  },
  (table) => ({
    // 建立索引 index 以加速查詢
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

// 學生使用者關聯
export const studentUserRelations = relations(studentUserTable, ({ one }) => ({
  pictureBooks: one(pictureBookTable, {
    fields: [studentUserTable.id],
    references: [pictureBookTable.displayId],
  }),
}));

// 老師使用者關聯
export const teacherUserRelations = relations(teacherUserTable, ({ one }) => ({
  classes: one(classTable, {
    fields: [teacherUserTable.displayId],
    references: [classTable.teacherId],
  }),
}));

// 班級關聯
export const classRelations = relations(classTable, ({ one }) => ({
  teacher: one(teacherUserTable, {
    fields: [classTable.teacherId],
    references: [teacherUserTable.displayId],
  }),
}));

// 圖片資料表關聯
export const pictureRelations = relations(pictureTable, ({ one }) => ({
  student: one(studentUserTable, {
    fields: [pictureTable.studentId],
    references: [studentUserTable.displayId],
  }),
}));

// 繪本資料表關聯
export const pictureBookRelations = relations(pictureBookTable, ({ one }) => ({
  student: one(studentUserTable, {
    fields: [pictureBookTable.studentId],
    references: [studentUserTable.displayId],
  }),
}));