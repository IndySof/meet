import { useProvider } from "@/context/AvailabilityContext"
import { AllowedDurationConfType } from "@/lib/types"

export default function DurationPicker(configSetDuration:any) {
  const {
    state: { duration, optionId },
    dispatch,
  } = useProvider()

  const ALLOWED_DURATIONS:AllowedDurationConfType[] = configSetDuration.configSetDuration

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
        {ALLOWED_DURATIONS.slice()
          .sort((a, b) => {
            if (a.value !== b.value) {
              return a.value - b.value
            }
            return a.option.localeCompare(b.option)
          })
          .map((option) => (
          <option key={option.id} value={option.id}>
            {option.option}
          </option>
        ))}
      </select>

      <input type="hidden" id="duration" name="duration" value={duration} />

    </div>
  )
}
