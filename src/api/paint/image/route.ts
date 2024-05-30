import { NextResponse, type NextRequest } from "next/server";

import { eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import { pictureTable, picturesToBookTable } from "@/db/schema";

// POST api/paint/image
export async function POST(req: NextRequest) {
  const fd = new FormData();
  const reqBody = await req.json();

  fd.append("image", reqBody.image);
  fd.append("type", "base64");

  const response = await fetch("https://api.imgur.com/3/image", {
    method: "POST",
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
    },
    body: fd,
    redirect: "follow",
  });

  const data = await response.json();

  return NextResponse.json(
    {
      image: data,
    },
    { status: 200 },
  );
}

// GET api/paint/image
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pictureBookId = searchParams.get("pictureBookId");

    console.log("Query parameter:", { pictureBookId });

    if (!pictureBookId) {
      console.log("Missing required query parameter: pictureBookId.");
      return NextResponse.json(
        { error: "Missing required query parameter: pictureBookId" },
        { status: 400 },
      );
    }

    // Fetch pictures for a specific picture book
    console.log(`Fetching pictures for pictureBookId: ${pictureBookId}`);
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
