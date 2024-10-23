import { AvailabilitySlotsMap } from "@/lib/types";
import { FormEvent, useState } from "react";
import updateConfig from "@/lib/admin/firebase/editConfig";
import { WEEKDAYS } from "@/config";
import { FaTrashAlt } from "react-icons/fa";

export default function ConfigAvailability({ configSetAvailability }: { configSetAvailability: AvailabilitySlotsMap }) {

  const [availability, setAvailability] = useState<AvailabilitySlotsMap>(configSetAvailability)

  const formatTime = (hour: number, minute: number | undefined) => {
    if (!minute) {
      minute = 0
    }
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  };

  const handleRemove = (dayIndex: number) => {
    const updatedAvailability = { ...availability }
    delete updatedAvailability[dayIndex]
    setAvailability(updatedAvailability)
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      await updateConfig("OWNER_AVAILABILITY", availability)
      alert("Les données ont été mises à jour")
    } catch (error) {
      alert("Erreur lors de la mise à jour des données")
      console.error(error)
    }
  }

  return (
    <div id="availability-section" className="mb-6 mx-auto max-w-2xl">
      <hr className="my-6 border-t-2 border-gray-300 mx-auto max-w-2xl" />
      <h2 className="text-2xl font-semibold text-accent-600">Disponibilités</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left font-medium">Jour</th>
            <th className="border px-4 py-2 text-left font-medium">Début</th>
            <th className="border px-4 py-2 text-left font-medium">Pause</th>
            <th className="border px-4 py-2 text-left font-medium">Reprise</th>
            <th className="border px-4 py-2 text-left font-medium">Fin</th>
            <th className="border px-4 py-2 text-left font-medium"></th>
          </tr>
          </thead>
          <tbody>
          {/* Loop from 1 to 6 and then add 0 */}
          {[...Array(6)].map((_, dayIndex) => dayIndex + 1).concat(0).map((dayIndex) => {
            let slots = availability[dayIndex] || []

            const handleInputChange = (type: string, idx: number, time: string) => {
              const [hour, minute] = time.split(":")

              if (!availability[dayIndex]) {
                slots = [{ start: { hour: 0, minute: 0 },
                  breakStart: { hour: 0, minute: 0 },
                  breakEnd: { hour: 0, minute: 0},
                  end: { hour: 0, minute: 0 } }]
              }

              const updatedSlots = [...slots]
              updatedSlots[idx] = {
                ...updatedSlots[idx],
                [type]: {
                  hour: parseInt(hour),
                  minute: parseInt(minute),
                },
              }

              setAvailability({
                ...availability,
                [dayIndex]: updatedSlots,
              })
            }

            return (
              <tr key={dayIndex}>
                <td className="border px-4 py-2">{WEEKDAYS[dayIndex]}</td>

                <td className="border px-3 py-2">
                  {slots.length > 0 ? (
                    slots.map((slot, idx) => (
                      <div key={idx} className="flex justify-center">
                        <input
                          type="time"
                          value={formatTime(slot.start.hour, slot.start.minute)}
                          onChange={(e) => handleInputChange('start', idx, e.target.value)}
                          className="block rounded-md border-gray-300 shadow-sm focus:ring-accent-600 focus:border-accent-600 sm:text-sm"
                        />
                      </div>
                    ))
                  ) : (
                    <input
                      type="time"
                      className="block rounded-md border-gray-300 shadow-sm focus:ring-accent-600 focus:border-accent-600 sm:text-sm"
                      onChange={(e) => handleInputChange('start', 0, e.target.value)}
                    />
                  )}
                </td>

                <td className="border px-3 py-2">
                  {slots.length > 0 ? (
                    slots.map((slot, idx) => (
                      <div key={idx} className="flex justify-center">
                        <input
                          type="time"
                          value={formatTime(slot.breakStart.hour, slot.breakStart.minute)}
                          onChange={(e) => handleInputChange('breakStart', idx, e.target.value)}
                          className="block rounded-md border-gray-300 shadow-sm focus:ring-accent-600 focus:border-accent-600 sm:text-sm"
                        />
                      </div>
                    ))
                  ) : (
                    <input
                      type="time"
                      className="block rounded-md border-gray-300 shadow-sm focus:ring-accent-600 focus:border-accent-600 sm:text-sm"
                      onChange={(e) => handleInputChange('breakStart', 0, e.target.value)}
                    />
                  )}
                </td>

                <td className="border px-3 py-2">
                  {slots.length > 0 ? (
                    slots.map((slot, idx) => (
                      <div key={idx} className="flex justify-center">
                        <input
                          type="time"
                          value={formatTime(slot.breakEnd.hour, slot.breakEnd.minute)}
                          onChange={(e) => handleInputChange('breakEnd', idx, e.target.value)}
                          className="block rounded-md border-gray-300 shadow-sm focus:ring-accent-600 focus:border-accent-600 sm:text-sm"
                        />
                      </div>
                    ))
                  ) : (
                    <input
                      type="time"
                      className="block rounded-md border-gray-300 shadow-sm focus:ring-accent-600 focus:border-accent-600 sm:text-sm"
                      onChange={(e) => handleInputChange('breakEnd', 0, e.target.value)}
                    />
                  )}
                </td>

                <td className="border px-3 py-2">
                  {slots.length > 0 ? (
                    slots.map((slot, idx) => (
                      <div key={idx} className="flex justify-center">
                        <input
                          type="time"
                          value={formatTime(slot.end.hour, slot.end.minute)}
                          onChange={(e) => handleInputChange('end', idx, e.target.value)}
                          className="block rounded-md border-gray-300 shadow-sm focus:ring-accent-600 focus:border-accent-600 sm:text-sm"
                        />
                      </div>
                    ))
                  ) : (
                    <input
                      type="time"
                      className="block rounded-md border-gray-300 shadow-sm focus:ring-accent-600 focus:border-accent-600 sm:text-sm"
                      onChange={(e) => handleInputChange('end', 0, e.target.value)}
                    />
                  )}
                </td>

                <td className="border px-4 pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => handleRemove(dayIndex)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="inline-flex w-full justify-center text-sm rounded-md bg-red-800 px-3 py-2 text-white shadow-sm hover:bg-red-700 sm:w-auto disabled:opacity-50"
          >
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
}
