import { getAllTasks } from "@/lib/prisma/task";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const tasks = await getAllTasks();
  if (tasks) return NextResponse.json(tasks);

  return NextResponse.json({ message: "Nothing" });
}
