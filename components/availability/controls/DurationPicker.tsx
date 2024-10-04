import clsx from "clsx"

import { ALLOWED_DURATIONS } from "@/config"
import { useProvider } from "@/context/AvailabilityContext"

export default function DurationPicker() {
  const {
    state: { duration, optionId },
    dispatch,
  } = useProvider()

  return (
    <div className="w-1/2">
      <label
        htmlFor="optionId"
        className="block text-sm font-medium leading-0 text-gray-900">
        Prestation
      </label>
      <select
        value={optionId}
        id="optionId"
        name="optionId"
        className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-accent-600 sm:text-sm sm:leading-6 overflow-x-clip"
        onChange={(e) => {
          const selectedOptionId = Number(e.currentTarget.value);
          const selectedOption = ALLOWED_DURATIONS.find(
            (option) => option.id === selectedOptionId
          );
          if (selectedOption) {
            dispatch({
              type: "SET_DURATION",
              payload: selectedOption.value,
            })
          }
          dispatch({
            type: "SET_OPTION_ID",
            payload: selectedOptionId,
          })
        }}>
        {ALLOWED_DURATIONS.map((option) => (
          <option key={option.id} value={option.id}>
            {option.option}
          </option>
        ))}
      </select>

      {/* Input hidden for optionId */}
      <input type="hidden" id="duration" name="duration" value={duration} />

    </div>
  )
}
