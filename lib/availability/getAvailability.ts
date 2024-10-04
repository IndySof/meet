import { add, areIntervalsOverlapping, sub } from "date-fns"

import { DateTimeInterval, DateTimeIntervalString, DoctorString } from "../types"
import { SLOT_PADDING, LEAD_TIME } from "@/config"

/**
 * Takes an array of potential slots and an array of busy slots and returns
 * an array of available slots.
 *
 * @param {Object} obj - An object containing potential slots,
 *  busy slots, and padding.
 *
 * @param {DateTimeInterval[]} obj.potential - Potential slots.
 * @param {DateTimeInterval[]} obj.busy - Busy slots.
 * @param {number} [obj.padding] - Padding to apply to busy slots.
 *
 * @returns {DateTimeInterval[]} An array of available slots.
 */
export default function getAvailability({
  potential: potentialParam,
  busyTime,
  busyDoctor,
  padding = SLOT_PADDING,
  // leadTime = LEAD_TIME,
}: {
  potential?: DateTimeInterval[]
  busyTime?: DateTimeInterval[]
  busyDoctor?:DoctorString[],
  padding?: number,
  // leadTime?: number
}):DateTimeIntervalString[]  {
  // Our final array of available slots

  const slots: DateTimeIntervalString[] = [];

  if (potentialParam === undefined || busyTime === undefined || busyDoctor === undefined) {
    return []
  }

  // Create a DateTimeInterval that starts now and ends leadTime minutes from now
  const now = new Date()

  // if (leadTime > 0) {
  //   const leadTimeBuffer = {
  //     start: now,
  //     end: add(now, { minutes: leadTime }),
  //   };
  //
  //   // Add leadTimeBuffer to front of busy array
  //   busyTime?.unshift(leadTimeBuffer);
  // }

  const potential = potentialParam.filter((slot) => slot.start > now); // Filter out slots that are in the past

  const potentialWithDoctor = potential.map(({ start, end }: DateTimeInterval) => ({
    start,
    end,
    doctor: ""
  }))

  // Make a deep copy of the potential array
  const remainingSlots = [...potentialWithDoctor];

  for (let i = 0; i < potentialWithDoctor.length; i++) {
    const freeSlot = potentialWithDoctor[i];

    // Check if the free slot overlaps with any busy slot
    let isFree = true;
    for (let j = 0; j < busyTime.length; j++) {
      const busySlot = busyTime[j];

      // Apply padding to busySlot start and end times
      const busyStart = sub(busySlot.start, { minutes: padding });
      const busyEnd = add(busySlot.end, { minutes: padding });

      if (areIntervalsOverlapping(freeSlot, { start: busyStart, end: busyEnd })) {
        isFree = false;

        // Add the busy slot with doctor information
        slots.push({
          start: busySlot.start,
          end: busySlot.end,
          doctor: busyDoctor[j].doctor,
        });

        break;
      }
    }

    // If the free slot is not booked, add it to the available slots
    if (isFree) {
      slots.push(freeSlot);
    }

    // Remove the free slot from the remainingSlots array
    const index = remainingSlots.indexOf(freeSlot);
    if (index !== -1) {
      remainingSlots.splice(index, 1);
    }
  }

  // Return both the available slots and the busy slots with doctors
  return slots;
}