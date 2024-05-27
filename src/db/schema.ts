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

// // 所有使用者列表 (Column: id, displayId, email, student_or_teacher, name)
// export const usersTable = pgTable(
//   "users",
//   {
//     id: serial("id").primaryKey(),
//     displayId: uuid("display_id").defaultRandom().notNull().unique(),
//     username: varchar("username", { length: 100 }).notNull(),
//     email: varchar("email", { length: 100 }).notNull().unique(),
//     hashedPassword: varchar("hashed_password", { length: 100 }), // 使用者密碼
//     studentOrTeacher: varchar("student_or_teacher", { length: 100 }).notNull(),
//     photo: varchar("photo")
//       .notNull()
//       .default(
//         "https://drive.google.com/file/d/1Gizl9jq8m8BYRCwzNOa3Qs82zr7Zkoty/preview",
//       ),
//   },
//   (table) => ({
//     emailIndex: index("email_index").on(table.email),
//     displayIdIndex: index("display_id_index").on(table.displayId),
//   }),
// );

// 學生使用者資料表
export const studentUserTable = pgTable(
  "student_users",
  {
    id: serial("id").primaryKey(), // Serial generates student id
    displayId: uuid("display_id").defaultRandom().notNull().unique(), // UUID generates unique student DisplayID
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    parentEmail: varchar("parent_email", { length: 100 }).notNull(),
    class: uuid("class_id")
      .notNull()
      .references(() => classTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    hashedPassword: varchar("hashed_password", { length: 100 }), // 使用者密碼
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
    displayIdIndex: index("display_id_index").on(table.displayId),
    parentEmailIndex: index("parent_email_index").on(table.parentEmail),
  }),
);

// 老師使用者資料表
export const teacherUserTable = pgTable(
  "teacher_users",
  {
    id: serial("id").primaryKey(), // Serial generates teacher id
    displayId: uuid("display_id").defaultRandom().notNull().unique(), // UUID generates unique teacher DisplayID
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    hashedPassword: varchar("hashed_password", { length: 100 }), // 使用者密碼
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
    description: text("description").notNull(),
    studentId: uuid("student_id")
      .notNull()
      .references(() => studentUserTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    date: timestamp("date")
      .notNull()
      .default(sql`now()`),
    taskId: uuid("task_id")
      .notNull()
      .references(() => tasksTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    studentIdIndex: index("student_id_index").on(table.studentId),
    taskIdIndex: index("task_id_index").on(table.taskId),
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
    sendEmail: boolean("send_email").notNull().default(false),
  },
  (table) => ({
    // 建立索引 index 以加速查詢
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);
// 每頁繪本資料表
export const pageTable = pgTable(
  "pages",
  {
    id: serial("id").primaryKey(), // 使用serial生成頁面id
    displayId: uuid("display_id").defaultRandom().notNull().unique(), // 使用uuid生成頁面DisplayID
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
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

//每日繪畫主題資料表
export const tasksTable = pgTable(
  "tasks",
  {
    id: serial("id").primaryKey(), // 使用serial生成主題id
    displayId: uuid("display_id").defaultRandom().notNull().unique(), // 使用uuid生成主題DisplayID
    task: varchar("task", { length: 100 }).notNull(),
    studentId: uuid("student_id")
      .notNull()
      .references(() => studentUserTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    startDate: timestamp("start_date")
      .notNull()
      .default(sql`now()`),

    endDate: timestamp("end_date").notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

// 學生使用者關聯
export const studentUserRelations = relations(studentUserTable, ({ one }) => ({
  pictureBooks: one(pictureBookTable, {
    fields: [studentUserTable.id],
    references: [pictureBookTable.studentId],
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

// 每日繪畫主題資料表關聯
export const taskRelations = relations(tasksTable, ({ one }) => ({
  student: one(studentUserTable, {
    fields: [tasksTable.studentId],
    references: [studentUserTable.displayId],
  }),
}));

// 每日繪畫主題與圖片資料表關聯
export const taskPictureRelations = relations(tasksTable, ({ one }) => ({
  picture: one(pictureTable, {
    fields: [tasksTable.id],
    references: [pictureTable.taskId],
  }),
}));

// 繪本資料表關聯
export const pictureBookRelations = relations(pictureBookTable, ({ one }) => ({
  student: one(studentUserTable, {
    fields: [pictureBookTable.studentId],
    references: [studentUserTable.displayId],
  }),
}));

// 每頁繪本資料表關聯
export const pageRelations = relations(pageTable, ({ one }) => ({
  pictureBook: one(pictureBookTable, {
    fields: [pageTable.pictureBookId],
    references: [pictureBookTable.displayId],
  }),
  picture: one(pictureTable, {
    fields: [pageTable.pictureId],
    references: [pictureTable.displayId],
  }),
}));