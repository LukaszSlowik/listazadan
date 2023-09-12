import { prisma } from ".";
import { Task, TaskWithoutID } from "@/lib/validations/Task";

export const createTask = async (data: Task) => {
  const task = await prisma.task.create({ data });
  return task;
};

export const getAllTasks = async (userId: string) => {
  const tasks = await prisma.task.findMany({
    where: {
      userId: userId,
    },
  });
  console.log("I will get tasks : ", tasks);
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
