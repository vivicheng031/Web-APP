import { NextResponse, type NextRequest } from "next/server";

import { db } from "@/db";
import { pictureBookTable } from "@/db/schema";
import type { Book } from "@/lib/types/db";
import { bookSchema } from "@/validators/post";

// POST /api/book
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const reqBody = await req.json();
    let validatedReqBody: Pick<Book, "topic">;
    try {
      validatedReqBody = bookSchema.parse(reqBody);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    // Post book
    const bookId = await db
      .insert(pictureBookTable)
      .values({
        topic: validatedReqBody.topic,
      })
      .returning({ id: pictureBookTable.displayId })
      .execute();

    return NextResponse.json({ bookId: bookId[0].id }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
