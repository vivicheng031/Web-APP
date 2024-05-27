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
  unique,
} from "drizzle-orm/pg-core";

// 老師使用者資料表
export const teacherUserTable = pgTable(
  "teacher_users",
  {
    id: serial("id").primaryKey(), // Serial generates teacher id
    displayId: uuid("display_id").defaultRandom().notNull().unique(), // UUID generates unique teacher DisplayID
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    password: varchar("password", { length: 100 }), // 使用者密碼
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    emailIndex: index("email_index").on(table.email),
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
    displayIdIndex: index("display_id_index").on(table.displayId),
    nameIndex: index("name_index").on(table.name),
  }),
);

// 學生使用者資料表
export const studentUserTable = pgTable(
  "student_users",
  {
    id: serial("id").primaryKey(), // Serial generates student id
    displayId: uuid("display_id").defaultRandom().notNull().unique(), // UUID generates unique student DisplayID
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    password: varchar("password", { length: 100 }), // 使用者密碼
    parentEmail: varchar("parent_email", { length: 100 }).notNull(),
    classId: uuid("class_id")
      .notNull()
      .references(() => classTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }), 
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    emailIndex: index("email_index").on(table.email),
    nameIndex: index("name_index").on(table.name),
  }),
);

// 繪本主題資料表
export const taskTable = pgTable(
  "tasks",
  {
    id: serial("id").primaryKey(), // 使用serial生成主題id
    displayId: uuid("display_id").defaultRandom().notNull().unique(), // 使用uuid生成主題DisplayID
    task: varchar("task", { length: 100 }).notNull(),
    classId: uuid("class_id")
      .notNull()
      .references(() => classTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    startDate: timestamp("start_date").notNull().default(sql`now()`),
    endDate: timestamp("end_date").notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    endDateIndex: index("end_date_index").on(table.endDate)
  }),
);

// 圖片資料表
export const pictureTable = pgTable(
  "pictures",
  {
    id: serial("id").primaryKey(), // 使用serial生成圖片id
    displayId: uuid("display_id").defaultRandom().notNull().unique(), // 使用uuid生成圖片DisplayID
    image: varchar("image").notNull().default(""),
    description: text("description").notNull().default(""),
    studentId: uuid("student_id")
      .notNull()
      .references(() => studentUserTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    finishDate: timestamp("date").notNull().default(sql`now()`),
    taskId: uuid("task_id")
      .notNull()
      .references(() => taskTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    studentIdIndex: index("student_id_index").on(table.studentId),
    taskIdIndex: index("task_id_index").on(table.taskId),
    finishDateIndex: index("finish_date_index").on(table.finishDate),
  }),
);

// 繪本資料表
export const pictureBookTable = pgTable(
  "picture_books",
  {
    id: serial("id").primaryKey(), // 使用serial生成繪本id
    displayId: uuid("display_id").defaultRandom().notNull().unique(), // 使用uuid生成繪本DisplayID
    topic: varchar("topic", { length: 100 }).notNull(),
    studentId: uuid("student_id")
      .notNull()
      .references(() => studentUserTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    finishDate: timestamp("date").notNull().default(sql`now()`),
    sendEmail: boolean("send_email").notNull().default(false),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    studentIdIndex: index("student_id_index").on(table.studentId),
    finishDateIndex: index("finish_date_index").on(table.finishDate),
  }),
);

// 每頁繪本資料表
export const picturesToBookTable = pgTable(
  "pictures_to_book",
  {
    id: serial("id").primaryKey(), // 使用serial生成頁面id
    pictureBookId: uuid("picture_book_id")
      .notNull()
      .references(() => pictureBookTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    pictureId: uuid("picture_id")
      .notNull()
      .references(() => pictureTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    pictureAndBookIndex: index("picture_and_book_index").on(
      table.pictureId,
      table.pictureBookId,
    ),
    uniqCombination: unique().on(table.pictureBookId, table.pictureId),
  }),
);

export const teacherUserRelations = relations(teacherUserTable, ({ many }) => ({
  classes: many(classTable),
}));

export const classRelations = relations(classTable, ({ one, many }) => ({
  teacher: one(teacherUserTable, {
    fields: [classTable.teacherId],
    references: [teacherUserTable.displayId],
  }),
  students: many(studentUserTable),
  tasks: many(taskTable),
}));

export const studentUserRelations = relations(studentUserTable, ({ one, many }) => ({
  class: one(classTable, {
    fields: [studentUserTable.classId],
    references: [classTable.displayId],
  }),
  pictures: many(pictureTable),
  pictureBooks: many(pictureBookTable),
}));

export const taskRelations = relations(taskTable, ({ one, many }) => ({
  class: one(classTable, {
    fields: [taskTable.classId],
    references: [classTable.displayId],
  }),
  pictures: many(pictureTable),
}));

export const pictureRelations = relations(pictureTable, ({ one, many }) => ({
  student: one(studentUserTable, {
    fields: [pictureTable.studentId],
    references: [studentUserTable.displayId],
  }),
  task: one(taskTable, {
    fields: [pictureTable.taskId],
    references: [taskTable.displayId],
  }),
  picturesToBookTable: many(picturesToBookTable),
}));

export const pictureBookRelations = relations(pictureBookTable, ({ one, many }) => ({
  student: one(studentUserTable, {
    fields: [pictureBookTable.studentId],
    references: [studentUserTable.displayId],
  }),
  picturesToBookTable: many(picturesToBookTable),
}));

export const picturesToBookRelations = relations(picturesToBookTable, ({ one }) => ({
  pictureBook: one(pictureBookTable, {
    fields: [picturesToBookTable.pictureBookId],
    references: [pictureBookTable.displayId],
  }),
  picture: one(pictureTable, {
    fields: [picturesToBookTable.pictureId],
    references: [pictureTable.displayId],
  }),
}));
