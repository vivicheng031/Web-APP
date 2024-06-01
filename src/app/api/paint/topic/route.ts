import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";
import fs from "fs";
import path from "path";

import { db } from "@/db";
import { topicTable } from "@/db/schema";

// import OpenAI from "openai";

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

let loading = false;
async function insertTopics() {
  if (loading) {
    console.log("is loading");
    return;
  }

  loading = true;
  try {
    const topicsPath = path.join(process.cwd(), "public", "topics.json");
    const jsonString = fs.readFileSync(topicsPath).toString();
    const topics = JSON.parse(jsonString);
    let returnTopic = null;
    // console.log(topics.length);

    // POST all 100 topics into topicTable
    for (let i = 0; i < topics.length; i++) {
      // console.log("[insertTopic]" + i);
      const addTopic = await db
        .insert(topicTable)
        .values({ topic: topics[i] })
        .returning({ name: topicTable.topic, id: topicTable.displayId })
        .execute();

      // return topic and displayId of the first data
      if (i == 0) {
        returnTopic = {
          topic: addTopic[0].name,
          displayId: addTopic[0].id,
        };
      }
    }

    console.log("All topics inserted successfully.");
    return returnTopic;
  } catch (error) {
    console.error("Error inserting topics:", error);
  } finally {
    loading = false;
  }
}

// GET /api/paint/topic
export async function GET() {
  try {
    // console.log("[GET topic APIIIIIII]")
    // GET the topic
    const topic = await db
      .select({
        topicId: topicTable.displayId,
        topic: topicTable.topic,
      })
      .from(topicTable)
      .where(eq(topicTable.done, false))
      .limit(1)
      .execute();

    console.log("topic: " + topic);

    if (topic.length === 0) {
      // generate topic by OpenAI => can't implement due to no paid account
      // const prompt = `
      // You're now tasked with generating a picture book topic suitable for children aged 2-6.
      // The topic should be engaging and simple, encouraging the children to draw their own pictures based on the story.
      // Ensure the prompts are simple enough for children to understand and draw. For example, "A Day at the Magic Zoo".
      // Remember to use JSON format and enclose the prompt in double quotation marks.
      // Please ensure the generated format looks like this: ["A Day at the Magic Zoo"].
      // This is crucial to me, and if you provide a good response, I'll give you a tip of 200.
      // `;
      // const response = await openai.chat.completions.create({
      //   messages: [{ role: "system", content: prompt }],
      //   model: "gpt-3.5-turbo",
      // });
      // const newTopic = JSON.parse(response.choices[0]?.message.content ?? "") ?? [];
      // console.log(newTopic);

      // POST new topics at the first time
      const firstTopic = await insertTopics();

      return NextResponse.json(
        { topic: firstTopic?.topic, topicId: firstTopic?.displayId },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { topic: topic[0].topic, topicId: topic[0].topicId },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// PUT /api/paint/topic
export async function PUT(req: NextRequest) {
  const reqBody = await req.json();
  const { topicId } = reqBody;

  try {
    // Update the topic status
    await db
      .update(topicTable)
      .set({
        done: true,
      })
      .where(eq(topicTable.displayId, topicId));

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
