"use client";
import exp from "constants";
import { Task } from "../validations/Task";
import { WhiteListEmail } from "../validations/WhiteList";

export async function getTasks(userId: string): Promise<Task[]> {
  try {
    const { signal } = new AbortController();
    const res = await fetch(
      `/api/getTasks/?userId=${userId}`, //{ cache: "no-store" }
      {
        cache: "no-store",
        signal,
        next: {
          revalidate: 0,
        },
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

export async function getWhitelist(userId: string): Promise<WhiteListEmail[]> {
  try {
    const { signal } = new AbortController();
    const res = await fetch(`/api/whitelist/${userId}`, {
      cache: "no-store",
      signal,
      next: {
        revalidate: 0,
      },
    });
    const whitelist = await res.json();
    console.log("will return whitelist", whitelist);
    return whitelist || [];
  } catch (err) {
    console.log(err);
    return [];
  }
}
export async function addWhiteList(userId: string, email: string) {
  try {
    const { signal } = new AbortController();
    const res = await fetch(`/api/whitelist/${userId}`, {
      method: "POST",
      body: JSON.stringify({ email }),
      cache: "no-store",
      signal,
      next: {
        revalidate: 0,
      },
    });
    const whitelist = await res.json();
    console.log("will return whitelist", whitelist);
    return whitelist || [];
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function saveTasks(tasks: Task[]) {
  try {
    const { signal } = new AbortController();
    const res = await fetch("/api/saveTasks", {
      method: "POST",
      body: JSON.stringify(tasks),
      cache: "no-store",
      signal,
      next: {
        revalidate: 0,
      },
    });
    const data = await res.json();
    console.log("save tasks will return:", data);
    return data.tasks || [];
  } catch (err) {
    console.log(err);
  }
}
