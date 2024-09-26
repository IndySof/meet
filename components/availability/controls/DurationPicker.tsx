import clsx from "clsx"

import { ALLOWED_DURATIONS } from "@/config"
import { useProvider } from "@/context/AvailabilityContext"

export default function DurationPicker() {
  const {
    state: { duration },
    dispatch,
  } = useProvider()

  return (
    <div className="w-1/2">
      <label
        htmlFor="duration"
        className="block text-sm font-medium leading-0 text-gray-900">
        Prestation
      </label>
      <select
        value={duration}
        id="duration"
        name="duration"
        className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-accent-600 sm:text-sm sm:leading-6 overflow-x-clip"
        onChange={(e) => {
          dispatch({
            type: "SET_DURATION",
            payload: Number(e.currentTarget.value),
          })
        }}>
        {ALLOWED_DURATIONS.map((theDuration) => (
          <option key={theDuration.key} value={theDuration.value}>
            {theDuration.key}
          </option>
        ))}
      </select>
    </div>
  )
}
