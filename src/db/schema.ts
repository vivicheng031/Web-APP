import { sql, relations } from "drizzle-orm";
import {
  index,
  text,
  pgTable,
  serial,
  uuid,
  varchar,
  unique,
  boolean,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const studentUserTable = pgTable(
  "student_users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    class: varchar("class_name", { length: 100 }).notNull(),
    parentEmail: varchar("parent_email", { length: 100 }).notNull(),
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
  }),
);

export const teacherUserTable = pgTable(
  "teacher_users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
  }),
);

export const classTable = pgTable(
  "classes",
  {
    id: serial("id").primaryKey(),
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

export const pictureTable = pgTable(
  "pictures",
  {
    id: serial("id").primaryKey(),
    image: varchar("image").notNull(),
    text: text("text").notNull(),
    date: timestamp("date")
      .notNull()
      .default(sql`now()`),
  },
  (table) => ({}),
);

export const pictureBookTable = pgTable(
  "picture_books",
  {
    id: serial("id").primaryKey(),
    studentId: uuid("student_id")
      .notNull()
      .references(() => studentUserTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    pictureId: uuid("picture_id")
      .notNull()
      .references(() => pictureTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    sendEmail: boolean("send_email").notNull().default(false),
  },
  (table) => ({
    studentIndex: index("student_index").on(table.studentId),
    pictureIndex: index("picture_index").on(table.pictureId),
  }),
);

export const studentUserRelations = relations(studentUserTable, ({ one }) => ({
  pictureBooks: one(pictureBookTable, {
    fields: [studentUserTable.id],
    references: [pictureBookTable.studentId],
  }),
}));

export const teacherUserRelations = relations(teacherUserTable, ({ one }) => ({
  classes: one(classTable, {
    fields: [teacherUserTable.id],
    references: [classTable.teacherId],
  }),
}));

export const pictureBookRelations = relations(pictureBookTable, ({ one }) => ({
  student: one(studentUserTable, {
    fields: [pictureBookTable.studentId],
    references: [studentUserTable.id],
  }),
  picture: one(pictureTable, {
    fields: [pictureBookTable.pictureId],
    references: [pictureTable.id],
  }),
}));
