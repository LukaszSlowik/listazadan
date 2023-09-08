import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sleep2(ms: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
