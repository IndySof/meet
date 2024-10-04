
import { DOCTORS } from "@/config"
import { useProvider } from "@/context/AvailabilityContext"

export default function DurationPicker() {
  const {
    state: { doctor, optionId },
    dispatch,
  } = useProvider()

  return (
    <div className="w-1/2">
      <label
        htmlFor="doctor"
        className="block text-sm font-medium leading-0 text-gray-900">
        Docteur
      </label>
      <select
        value={doctor}
        id="doctor"
        name="doctor"
        className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-accent-600 sm:text-sm sm:leading-6 overflow-x-clip"
        onChange={(e) => {
          dispatch({
            type: "SET_DOCTOR",
            payload: e.currentTarget.value,
          })
        }}>
        {
          DOCTORS.filter(theDoctor =>
            theDoctor.option.includes(optionId) || theDoctor.option[0] == 0
          ).map((theDoctor) => (
          <option key={theDoctor.user} value={theDoctor.user}>
            {theDoctor.user}
          </option>
        ))}
      </select>
    </div>
  )
}
