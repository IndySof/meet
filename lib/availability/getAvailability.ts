import { add, areIntervalsOverlapping, sub } from "date-fns"
import { DateTimeInterval, DateTimeIntervalString, DoctorString } from "../types"

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
  // padding = SLOT_PADDING,
  // leadTime = LEAD_TIME,
}: {
  potential?: DateTimeInterval[]
  busyTime?: DateTimeInterval[]
  busyDoctor?:DoctorString[],
  // padding?: number,
  // leadTime?: number
}):DateTimeIntervalString[]  {

  const slots: DateTimeIntervalString[] = [];

  if (potentialParam === undefined || busyTime === undefined || busyDoctor === undefined) {
    return []
  }

  const now = new Date()

  const potential = potentialParam.filter((slot) => slot.start > now); // Filter out slots that are in the past

  let doctorFlag = false

  for (let i = 0; i < potential.length; i++)
  {
    for (let j = 0; j < busyTime.length; j++)
    {
      if (areIntervalsOverlapping(potential[i], busyTime[j]))
      {
        slots.push({
          start: potential[i].start,
          end: potential[i].end,
          doctor: busyDoctor[j].doctor,
        });

        doctorFlag = true
      }
    }
    if (!doctorFlag)
    {
      slots.push({
        start:  potential[i].start,
        end:  potential[i].end,
        doctor: "",
      });
    }

    doctorFlag = false
  }

  return slots;
}