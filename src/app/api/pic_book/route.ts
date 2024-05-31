import { NextResponse, type NextRequest } from "next/server";

import { eq, asc } from "drizzle-orm";

import { db } from "@/db";
import { pictureBookTable, pictureTable, picturesToBookRelations, picturesToBookTable } from "@/db/schema";

// POST /api/pic_book
export async function POST(
  req: NextRequest,
) {
  try {
    const reqBody = await req.json();
    const { topicId, bookId } = reqBody;
    
    // GET all pages of the book
    const pages = await db
      .select({ picId: pictureTable.displayId })
      .from(pictureTable)
      .where(eq(pictureTable.topicId, topicId))
      .orderBy(asc(pictureTable.finishDate))
      .execute();

    // Post PicturesToBook
    pages.map(async (page) => {
      await db
      .insert(picturesToBookTable)
      .values({
        pictureBookId: bookId,
        pictureId: page.picId
      })
      .execute();
    })
    
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
