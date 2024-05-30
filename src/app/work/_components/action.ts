import { eq, desc } from "drizzle-orm";

import { db } from "@/db";
import { pictureBookTable, picturesToBookTable } from "@/db/schema";

export const sendEmail = async (bookId: string) => {
  "use server";
  // console.log("[sendEmail]");

  await db
    .update(pictureBookTable)
    .set({ sendEmail: true })
    .where(eq(pictureBookTable.displayId, bookId))
    .execute();
};

export const getBooks = async () => {
  "use server";
  // console.log("[getBooks]");

  const books = await db
    .select({
      id: pictureBookTable.displayId,
      topic: pictureBookTable.topic,
      finishDate: pictureBookTable.finishDate,
    })
    .from(pictureBookTable)
    .orderBy(desc(pictureBookTable.displayId))
    .execute();

  return books;
};

export const getBook = async (bookId: string) => {
  "use server";
  // console.log("[getBook]");

  const book = await db
    .select({
      topic: pictureBookTable.topic,
      finishDate: pictureBookTable.finishDate,
      emailStatus: pictureBookTable.sendEmail,
    })
    .from(pictureBookTable)
    .where(eq(pictureBookTable.displayId, bookId))
    .execute();

  return book[0];
};

export const getContent = async (bookId: string) => {
  "use server";
  // console.log("[getContent]");

  const pages = await db.query.picturesToBookTable.findMany({
    where: eq(picturesToBookTable.pictureBookId, bookId),
    with: {
      picture: {
        columns: {
          displayId: true,
          image: true,
          description: true,
          finishDate: true,
        },
      },
    },
  });

  const order_pages = pages.sort((a, b) => {
    const dateA = new Date(a.picture.finishDate);
    const dateB = new Date(b.picture.finishDate);
    return dateA.getTime() - dateB.getTime(); // ascending order
  });

  return order_pages.map((page) => ({
    displayId: page.picture.displayId,
    image: page.picture.image,
    description: page.picture.description,
    finishDate: page.picture.finishDate.toISOString().split("T")[0],
  }));
};

export const getCover = async (bookId: string) => {
  "use server";
  // console.log("[getCover]");

  const cover = await db.query.picturesToBookTable.findFirst({
    where: eq(picturesToBookTable.pictureBookId, bookId),
    with: {
      picture: {
        columns: {
          image: true,
        },
      },
    },
  });

  return cover;
};
