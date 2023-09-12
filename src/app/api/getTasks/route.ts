import { getAllTasks } from "@/lib/prisma/task";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const userId = searchParams.get("userId");
  const tasks = await getAllTasks(userId as string);
  if (tasks) return NextResponse.json(tasks);
  return NextResponse.json({ message: "Nothing" });
}
