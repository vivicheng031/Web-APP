import { NextResponse, type NextRequest } from "next/server";

// 依然保持 schema 的引用
import { eq } from "drizzle-orm";

import { db } from "@/db";
// 引入配置好的 drizzle 实例
import { classTable, teacherUserTable } from "@/db/schema";

// 引入 drizzle-orm 的方法
export async function GET(request: NextRequest) {
  const teacherId = request.nextUrl.pathname.split("/").pop() ?? "";

  try {
    const results = await db
      .select()
      .from(classTable) // Use the select() method before from()
      .leftJoin(
        teacherUserTable,
        eq(classTable.teacherId, teacherUserTable.displayId),
      )
      .where(eq(teacherUserTable.displayId, teacherId))
      .execute();

    return new NextResponse(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.error("Error executing query", error);
    return new NextResponse(
      JSON.stringify({ error: "Error getting classes for teacher" }),
      { status: 500 },
    );
  }
}
