import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatToTime = (input: string) => {
  input = input.replace(/\D/g, "");

  if (input.length > 4) {
    input = input.slice(0, 4);
  }

  if (input.length >= 3) {
    return input.replace(/^(\d{2})(\d{2})$/, "$1:$2");
  } else if (input.length === 2) {
    return input;
  } else {
    return input;
  }
};

export const formatToDate = (input: string) => {
  input = input.replace(/\D/g, "");

  if (input.length > 8) {
    input = input.slice(0, 8);
  }

  if (input.length >= 5) {
    return input.replace(/^(\d{2})(\d{2})(\d{4})$/, "$1/$2/$3");
  } else if (input.length >= 3) {
    return input.replace(/^(\d{2})(\d{2})$/, "$1/$2");
  } else {
    return input;
  }
};
