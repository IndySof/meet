import { compareAsc } from "date-fns"

import { CALENDARS_TO_CHECK, OWNER_TIMEZONE } from "../../config"
import type { DateTimeInterval } from "../types"
import getAccessToken from "./getAccessToken"

export default async function getBusyTimes({ start, end }: DateTimeInterval) {
  const queryParams = new URLSearchParams({
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    singleEvents: "true", // Expand recurring events
    orderBy: "startTime",
  });

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${CALENDARS_TO_CHECK}/events?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Error fetching calendar events: ${data.error.message}`);
  }

  const events = data.items ?? [];

  return events.map((event: any) => ({
    start: new Date(event.start?.dateTime || event.start?.date),
    end: new Date(event.end?.dateTime || event.end?.date),
    doctor: extractDoctor(event.description),
  }));
}

// Helper function to extract doctor information from description
function extractDoctor(description?: string): string {
  const doctorMatch = description?.match(/DOCTOR\s*:\s*\[\s*-\s*(.+?)\s*-\s*\]/i);
  return doctorMatch ? doctorMatch[1] : "";
}
