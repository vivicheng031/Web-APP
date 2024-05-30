import { NextResponse, type NextRequest } from "next/server";

import { and, eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import {
  pictureTable,
  pictureBookTable,
  picturesToBookTable,
} from "@/db/schema";

// POST /api/pictureBook/
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const reqBody = await req.json();
    const { topicId, taskId } = reqBody;

    // Find all pictures for the task
    const pictures = await db.query.pictureTable.findMany({
      where: and(
        eq(pictureTable.topicId, topicId),
        eq(pictureTable.topicId, taskId),
      ),
    });

    if (pictures.length === 0) {
      console.log("No pictures found.");
      return NextResponse.json({ error: "No pictures found" }, { status: 404 });
    }

    // Create a new picture book
    const pictureBook = await db
      .insert(pictureBookTable)
      .values({
        displayId: topicId,
        topic: taskId, // 使用taskId作為topic
        finishDate: new Date(),
        sendEmail: false,
      })
      .returning({ displayId: pictureBookTable.displayId });

    const pictureBookId = pictureBook[0].displayId;
    console.log(`Created picture book with ID: ${pictureBookId}`);

    // Create entries in picturesToBookTable
    const picturesToBookEntries = pictures.map((picture) => ({
      pictureBookId: pictureBookId,
      pictureId: picture.displayId,
    }));

    await db
      .insert(picturesToBookTable)
      .values(picturesToBookEntries)
      .execute();
    console.log(
      `Inserted ${picturesToBookEntries.length} entries in picturesToBookTable`,
    );

    return NextResponse.json({ status: 200, pictureBookId });
  } catch (error) {
    console.log("Error occurred while creating picture book:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// GET /api/pictureBook/:pictureBookId
export async function GET(
  req: NextRequest,
  { params }: { params: { pictureBookId: string } },
) {
  try {
    const { pictureBookId } = params;
    console.log(`Fetching pictures for pictureBookId: ${pictureBookId}`);

    // Fetch picture-to-book entries for the specified pictureBookId
    const pictureBookEntries = await db.query.picturesToBookTable.findMany({
      where: eq(picturesToBookTable.pictureBookId, pictureBookId),
    });

    console.log(
      `Found ${pictureBookEntries.length} entries in picturesToBookTable.`,
    );

    if (pictureBookEntries.length === 0) {
      console.log("No pictures found for this picture book.");
      return NextResponse.json(
        { error: "No pictures found for this picture book" },
        { status: 404 },
      );
    }

    const pictureIds = pictureBookEntries.map((entry) => entry.pictureId);

    // Fetch pictures from pictureTable
    const pictures = await db.query.pictureTable.findMany({
      where: inArray(pictureTable.displayId, pictureIds),
    });

    console.log(`Found ${pictures.length} pictures in pictureTable.`);
    return NextResponse.json(pictures, { status: 200 });
  } catch (error) {
    console.log("Error occurred while fetching pictures:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
