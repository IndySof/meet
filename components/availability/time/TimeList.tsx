import Time from "./TimeButton"
import type { DateTimeIntervalString } from "@/lib/types"
import { useProvider } from "@/context/AvailabilityContext"


type TimeListProps = {
  availability: DateTimeIntervalString[]
}

export default function TimeList({ availability }: TimeListProps) {
  const {
    state: { doctor },
  } = useProvider()

  return (
    <div className="grid grid-cols-2 gap-2">
      {availability?.map((slot) => {
        if (slot.doctor && slot.doctor == doctor) {
          return null;
        }

        return (
          <Time
            key={slot.start.toISOString() + slot.end.toISOString()}
            time={slot}
          />
        );
      })}
    </div>
  )
}