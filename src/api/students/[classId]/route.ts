import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/db";  // 引入配置好的 drizzle 实例
import { classTable, studentUserTable } from "@/db/schema";  // 依然保持 schema 的引用

import { eq } from "drizzle-orm";  // 引入 drizzle-orm 的方法
export async function GET(request: NextRequest) {
    const classId = request.nextUrl.pathname.split('/').pop() ?? '';

    try {
        const results = await db
            .select()
            .from(studentUserTable)
            .leftJoin(classTable, eq(studentUserTable.class, classTable.displayId))
            .where(eq(classTable.displayId, classId))
            .execute();

        return new NextResponse(JSON.stringify(results), { status: 200 });
    } catch (error: any) {
        console.error('Error executing query', error.stack);
        return new NextResponse(JSON.stringify({ error: 'Error getting students for class' }), { status: 500 });
    }
}
