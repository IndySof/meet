import { addMinutes, eachDayOfInterval, set } from "date-fns"

import type Day from "../day"
import type { AvailabilitySlotsMap, DateTimeInterval } from "../types"

export default function getPotentialTimes({
  start,
  end,
  duration,
  availabilitySlots,
}: {
  start: Day
  end: Day
  duration: number
  availabilitySlots: AvailabilitySlotsMap
}): DateTimeInterval[] {
  const intervals: DateTimeInterval[] = []

  if (start >= end || duration <= 0) {
    return intervals
  }

  // Sort the slots by start time
  const days = eachDayOfInterval({
    start: start.toInterval("Etc/GMT").start,
    end: end.toInterval("Etc/GMT").end,
  })
  days.forEach((day) => {
    const dayOfWeek = day.getDay()

    const slotsForDay = availabilitySlots[dayOfWeek] ?? []

    for (const slot of slotsForDay)
    {

      const slotStart = set(day, {
        hours: slot.start.hour,
        minutes: slot.start.minute,
      })

      const slotBreakStart = set(day, {
        hours: slot.breakStart.hour,
        minutes: slot.breakStart.minute,
      })

      const slotBreakEnd = set(day, {
        hours: slot.breakEnd.hour,
        minutes: slot.breakEnd.minute,
      })

      const slotEnd = set(day, {
        hours: slot.end.hour,
        minutes: slot.end.minute,
      })

      let currentIntervalStart = slotStart

      while (addMinutes(currentIntervalStart, duration) <= slotEnd )
      {
        if ((currentIntervalStart >= slotBreakStart || addMinutes(currentIntervalStart, duration) > slotBreakStart)
          && addMinutes(currentIntervalStart, duration) <= slotBreakEnd)
        {
          // Move the currentIntervalStart to the end
          currentIntervalStart = slotBreakEnd;
        }

        intervals.push({start: currentIntervalStart, end: addMinutes(currentIntervalStart, duration)})

        currentIntervalStart = addMinutes(currentIntervalStart, duration)
      }
    }
  })

  return intervals
}
