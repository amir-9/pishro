import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string to Persian (Jalali) format
 * @param dateString - ISO date string or Date object
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted Persian date string or fallback text
 */
export function formatDate(
  dateString: string | Date | null | undefined,
  options?: Intl.DateTimeFormatOptions
): string {
  // Handle null, undefined, or empty string
  if (!dateString) {
    return "تاریخ نامشخص";
  }

  const date = typeof dateString === "string" ? new Date(dateString) : dateString;

  // Check if date is invalid
  if (isNaN(date.getTime())) {
    return "تاریخ نامشخص";
  }

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("fa-IR", options || defaultOptions).format(date);
}
