import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function invarient(condition: any, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}
