import dynamic from "next/dynamic"

import BookingForm from "../booking/BookingForm"
import DurationPicker from "./controls/DurationPicker"
import TimezonePicker from "./controls/TimezonePicker"
import DoctorPicker from "./controls/DoctorPicker"
import { useProvider } from "@/context/AvailabilityContext"
import type {
  DateTimeIntervalString,
} from "@/lib/types"
import format from "date-fns-tz/format"

// Load these dynamically, without SSR, to avoid hydration issues
// that arise with timezone differences.
const Calendar = dynamic(() => import("./date/Calendar"), { ssr: false })
const TimeList = dynamic(() => import("./time/TimeList"), { ssr: false })

type AvailabilityPickerProps = {
  slots: DateTimeIntervalString[]
  configSetDuration: any
  configSetDoctor: any
}
export default function AvailabilityPicker({ slots, configSetDuration, configSetDoctor }: AvailabilityPickerProps) {
  const {
    state: { selectedDate, timeZone },
  } = useProvider()

  let maximumAvailability = 0
  const availabilityByDate = slots.reduce<Record<string, DateTimeIntervalString[]>>(
    (acc, slot) => {
      // Gives us the same YYYY-MM-DD format as Day.toString()
      const date = format(slot.start, "yyyy-MM-dd", { timeZone })

      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(slot)

      if (acc[date].length > maximumAvailability) {
        maximumAvailability = acc[date].length
      }
      return acc
    },
    {}
  )

  const availability = selectedDate
    ? availabilityByDate[selectedDate.toString()]
    : []

  return (
    <>
      <div className="flex flex-col space-y-8 invisible h-0">
        <div className="flex space-x-6">
          <TimezonePicker/>
        </div>
      </div>
      <div className="flex flex-col space-y-8">
        <div className="flex space-x-6">
          <DurationPicker configSetDuration={configSetDuration}/>
          <DoctorPicker configSetDoctor={configSetDoctor}/>
        </div>
        <BookingForm availability={availability} configSetDuration={configSetDuration} configSetDoctor={configSetDoctor}/>
        <Calendar offers={availabilityByDate} maximumAvailability={maximumAvailability}/>
        <TimeList availability={availability} configSetDoctor={configSetDoctor}/>
      </div>
    </>
  )
}
