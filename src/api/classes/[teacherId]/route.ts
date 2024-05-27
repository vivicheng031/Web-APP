import { NextResponse, type NextRequest } from "next/server";
// import { getSession } from "next-auth/react";

// 依然保持 schema 的引用
import { eq } from "drizzle-orm";

import { db } from "@/db";
// 引入配置好的 drizzle 实例
import { classTable, teacherUserTable } from "@/db/schema";
import { auth } from "@/lib/auth";

// 引入 drizzle-orm 的方法

// export async function GET(request: NextRequest) {
//   const teacherId = request.nextUrl.pathname.split("/").pop() ?? "";

//   try {
//     const results = await db
//       .select()
//       .from(classTable) // Use the select() method before from()
//       .leftJoin(
//         teacherUserTable,
//         eq(classTable.teacherId, teacherUserTable.displayId),
//       )
//       .where(eq(teacherUserTable.displayId, teacherId))
//       .execute();

//     return new NextResponse(JSON.stringify(results), { status: 200 });
//   } catch (error) {
//     console.error("Error executing query", error);
//     return new NextResponse(
//       JSON.stringify({ error: "Error getting classes for teacher" }),
//       { status: 500 },
//     );
//   }
// }
export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session || !session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const teacherId = session.user.id;  // 用户 ID

  try {
    const results = await db
      .select()
      .from(classTable)
      .leftJoin(
        teacherUserTable,
        eq(classTable.teacherId, teacherUserTable.displayId)
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
