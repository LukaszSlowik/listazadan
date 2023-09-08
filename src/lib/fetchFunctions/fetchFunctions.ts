import { Task } from "../validations/Task";

export async function getTasks(): Promise<Task[]> {
  try {
    const res = await fetch(
      "/api/getTasks", //{ cache: "no-store" }
      {
        cache: "no-store",
      },
    );

    const tasks = await res.json();

    console.log("will return tasks", tasks);
    return tasks || [];
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function saveTasks(tasks: Task[]) {
  try {
    const res = await fetch("/api/saveTasks", {
      method: "POST",
      body: JSON.stringify(tasks),

      cache: "no-store",
    });
    const data = await res.json();
    console.log("save tasks will return:", data);
    return data.tasks || [];
  } catch (err) {
    console.log(err);
  }
}
