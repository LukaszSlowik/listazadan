import { createAllTasks, getAllTasks, removeAllTasks } from "@/lib/prisma/task";
import { schemaTasks } from "@/lib/validations/Task";
import { Task, TaskWithoutID } from "@/lib/validations/Task";
import { create } from "domain";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const response = schemaTasks.safeParse(body);
  console.log("response", response);
  if (!response.success) {
    return NextResponse.json(response.error);
  }

  console.log("body", body);
  const removedtask = await removeAllTasks();
  console.log("removedtask:", removedtask);
  const tasksWithoutID: TaskWithoutID[] = response.data.map((task) => {
    const { id, ...rest } = task;
    return rest;
  });

  const tasks = await createAllTasks(tasksWithoutID);
  return NextResponse.json({ tasks: tasks });
}
