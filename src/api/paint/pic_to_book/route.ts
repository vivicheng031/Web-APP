import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/db";
import { pictureTable, picturesToBookTable } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

// POST api/paint/pic_to_book/:pictureBookId
export async function POST(
  req: NextRequest,
  { params }: { params: { pictureBookId: string } }
) {
  try {
    // Parse the request body
    const reqBody = await req.json();
    const { pictureIds } = reqBody;

    if (!pictureIds || !Array.isArray(pictureIds) || pictureIds.length === 0) {
      return NextResponse.json({ error: "Invalid picture IDs" }, { status: 400 });
    }

    // Create entries in picturesToBookTable
    const picturesToBookEntries = pictureIds.map((pictureId: string) => ({
      pictureBookId: params.pictureBookId,
      pictureId,
    }));

    await db.insert(picturesToBookTable).values(picturesToBookEntries).execute();

    return NextResponse.json({ status: 200, message: 'Pictures successfully added to the book' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// GET api/paint/pic_to_book/:pictureBookId
export async function GET(
  req: NextRequest,
  { params }: { params: { pictureBookId: string } }
) {
  try {
    const { pictureBookId } = params;
    console.log(`Fetching pictures for pictureBookId: ${pictureBookId}`);

    // Fetch picture-to-book entries for the specified pictureBookId
    const pictureBookEntries = await db.query.picturesToBookTable.findMany({
      where: eq(picturesToBookTable.pictureBookId, pictureBookId),
    });

    console.log(`Found ${pictureBookEntries.length} entries in picturesToBookTable.`);

    if (pictureBookEntries.length === 0) {
      console.log("No pictures found for this picture book.");
      return NextResponse.json({ error: "No pictures found for this picture book" }, { status: 404 });
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
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
