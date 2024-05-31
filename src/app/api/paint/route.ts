import { NextResponse, type NextRequest } from "next/server";

import { db } from "@/db";
import { pictureTable } from "@/db/schema";
import type { Post } from "@/lib/types/db";
import { postSchema } from "@/validators/post";

// POST /api/paint
export async function POST(
  req: NextRequest,
) {
  try {
    // Parse the request body
    const reqBody = await req.json();
    let validatedReqBody: Pick<
      Post,
      "image" | "description" | "topicId"
    >;
    try {
      validatedReqBody = postSchema.parse(reqBody);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    // Post picture
    await db
      .insert(pictureTable)
      .values({
        image: validatedReqBody.image,
        description: validatedReqBody.description,  // 確認字段名稱與schema一致
        topicId: validatedReqBody.topicId,
      })
      .execute();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}