import { sql, relations } from "drizzle-orm";
import {
  index,
  text,
  pgTable,
  uuid,
  varchar,
  unique,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

// 學生使用者資料表
export const studentUserTable = pgTable(
  "student_users",
  {
    id: uuid("id").primaryKey(),  // 使用uuid生成學生ID
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    class: varchar("class_name", { length: 100 }).notNull(),
    parentEmail: varchar("parent_email", { length: 100 }).notNull(),
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
  }),
);

// 老師使用者資料表
export const teacherUserTable = pgTable(
  "teacher_users",
  {
    id: uuid("id").primaryKey(),  // 使用uuid生成教師ID
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
  }),
);

// 班級資料表
export const classTable = pgTable(
  "classes",
  {
    id: uuid("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    teacherId: uuid("teacher_id")
      .notNull()
      .references(() => teacherUserTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    teacherIndex: index("teacher_index").on(table.teacherId),
  }),
);

// 圖片資料表
export const pictureTable = pgTable(
  "pictures",
  {
    id: uuid("id").primaryKey(),
    image: varchar("image").notNull(),
    text: text("text").notNull(),
    date: timestamp("date")
      .notNull()
      .default(sql`now()`),
  },
  (table) => ({}),
);

// 繪本資料表
export const pictureBookTable = pgTable(
  "picture_books",
  {
    id: uuid("id").primaryKey(),
    pictureId: uuid("picture_id")
      .notNull()
      .references(() => pictureTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    sendEmail: boolean("send_email").notNull().default(false),
  },
  (table) => ({
    pictureIndex: index("picture_index").on(table.pictureId),
  }),
);

// 學生使用者關聯
export const studentUserRelations = relations(studentUserTable, ({ one }) => ({
  pictureBooks: one(pictureBookTable, {
    fields: [studentUserTable.id],
    references: [pictureBookTable.pictureId],
  }),
}));

// 老師使用者關聯
export const teacherUserRelations = relations(teacherUserTable, ({ one }) => ({
  classes: one(classTable, {
    fields: [teacherUserTable.id],
    references: [classTable.teacherId],
  }),
}));

// 繪本關聯
export const pictureBookRelations = relations(pictureTable, ({ one }) => ({
  book: one(pictureBookTable, {
    fields: [pictureTable.id],
    references: [pictureBookTable.pictureId],
  }),
}));
