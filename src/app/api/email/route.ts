import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { pictureBookTable } from "@/db/schema";

// PUT /api/email
export async function PUT(req: NextRequest) {
  const reqBody = await req.json();
  const { bookId } = reqBody;

  try {
    // Update the topic status
    await db
      .update(pictureBookTable)
      .set({
        sendEmail: true,
      })
      .where(eq(pictureBookTable.displayId, bookId));

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
