import { prisma } from ".";
import { Task, TaskWithoutID } from "@/lib/validations/Task";

export const createTask = async (data: Task) => {
  const task = await prisma.task.create({ data });
  return task;
};

export const getAllTasks = async () => {
  const tasks = await prisma.task.findMany();
  return tasks;
};

export const removeAllTasks = async () => {
  const tasks = await prisma.task.deleteMany();
  return tasks;
};
export const createAllTasks = async (data: TaskWithoutID[]) => {
  const tasks = await prisma.task.createMany({ data });
  return tasks;
};
