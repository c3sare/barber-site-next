import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const createSlug = (str: string) => {
  return str
    .toString()
    .normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, "-");
};

export const removeDuplicates = <T>(arr: T[]) =>
  arr.filter((v, i) => arr.indexOf(v) === i);

export function safeObjectSet(obj: never, path: string, value: never) {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i] as keyof typeof current;
    if (current[key] === undefined || current[key] === null) {
      current[key] = {} as unknown as never;
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return obj;
}
