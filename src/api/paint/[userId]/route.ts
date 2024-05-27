import { NextResponse, type NextRequest } from "next/server";

import { and, eq, desc } from "drizzle-orm";

import { db } from "@/db";
import { pictureTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import type { Post } from "@/lib/types/db";
import { postSchema } from "@/validators/post";

// POST /api/paint/:userId
export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      userId: string;
      description: string;
      image: string;
    };
  },
) {
  try {
    // Get user from session
    const session = await auth();
    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body
    const reqBody = await req.json();
    let validatedReqBody: Pick<
      Post,
      "userId" | "description" | "image" | "topic"
    >;
    try {
      validatedReqBody = postSchema.parse(reqBody);
    } catch (error) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    // Post message
    await db
      .insert(pictureTable)
      .values({
        studentId: params.userId,  // 確認字段名稱與schema一致
        description: validatedReqBody.description,  // 確認字段名稱與schema一致
        image: validatedReqBody.image,
        taskId: validatedReqBody.topic,
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

// GET /api/paint/:userId
export async function GET(
  _: NextRequest,
  {
    params,
  }: {
    params: {
      userId: string;
    };
  },
) {
  try {
    // Get user from session
    const session = await auth();
    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the post, if any
    const post = await db.query.pictureTable.findFirst({
      where: and(eq(pictureTable.studentId, params.userId)),
      orderBy: [desc(pictureTable.date)],
    });

    if (!post) {
      return NextResponse.json(
        {
          firstPost: true,
          posted: false,
        },
        { status: 200 },
      );
    }

    if (Date.now() - post?.date.getTime() > 24 * 60 * 60 * 1000) {
      return NextResponse.json(
        {
          posted: false,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        posted: true,
        firstPost: false,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}