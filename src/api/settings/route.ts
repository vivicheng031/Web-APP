import { NextResponse  } from "next/server";

import OpenAI from "openai";

// import { v4 as uuidv4 } from 'uuid';
import { db } from "@/db";
import { topicTable } from "@/db/schema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/settings
export async function POST() {
  try {
    // Generate one topic using OpenAI
    const prompt = `
      Generate a creative drawing prompt for children aged 0-6. 
      Each prompt should be simple, engaging, and suitable for young children. 
      Example: "A happy puppy playing with a ball", "A rainbow over a house".
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 50,
    });

    const choice = response.choices && response.choices[0];
    if (choice && choice.message && choice.message.content) {
      const topic = choice.message.content.trim();

      // Insert the generated topic into the database
      await db.insert(topicTable).values({
        // displayId: uuidv4(),
        topic,
        // done: false
      });

      return NextResponse.json({ success: true, topic }, { status: 200 });
    } else {
      console.error("Invalid response from OpenAI", response);
      return NextResponse.json(
        { error: "Invalid response from OpenAI" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
