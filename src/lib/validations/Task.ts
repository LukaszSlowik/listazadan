import { z } from "zod";

export const schemaTask = z.object({
  id: z.string(),
  content: z.string(),
  index: z.number(),
  userId: z.string(),
  done: z.boolean().default(false),
  //date or string
  //zod string optional or nullable

  dateOfDone: z.string().default(""),
});

//interfare
export type Task = z.infer<typeof schemaTask>;
export const schemaTasks = z.array(schemaTask);
export type Tasks = z.infer<typeof schemaTasks>;
export type TaskWithoutID = Omit<Task, "id">;
