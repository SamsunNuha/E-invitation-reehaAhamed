import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateGoogleCalendarUrl(
  title: string,
  startDate: string,
  startTime: string,
  location: string,
  details: string
): string {
  try {
    // Format date YYYYMMDDTHHMMSSZ
    const cleanDate = startDate.replace(/-/g, '');
    const startIso = `${cleanDate}T110000Z`; // 11:00 UTC default offset
    const endIso = `${cleanDate}T150000Z`;

    const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";
    const params = new URLSearchParams({
      text: title,
      dates: `${startIso}/${endIso}`,
      details: details,
      location: location,
    });

    return `${baseUrl}&${params.toString()}`;
  } catch (e) {
    return "https://calendar.google.com";
  }
}
