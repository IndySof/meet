import { AllowedDurationConfType, AvailabilitySlotsMap } from "@/lib/types"
import { FormEvent, useState } from "react"
import updateConfig from "@/lib/admin/firebase/editConfig"

export default function ConfigAvailability(configSetAvailability:any) {

  const [availability, setAvailability] = useState<AvailabilitySlotsMap>(
    configSetAvailability.configSetAvailability
  )
  //
  // const handleOptionChange = (index: number, newOption: string) => {
  //   const updatedDurations = [...availability];
  //   updatedDurations[index] = { ...updatedDurations[index], option: newOption };
  //   setAvailability(updatedDurations)
  // }
  //
  // const handleValueChange = (index: number, newValue: string) => {
  //   const updatedDurations = [...availability];
  //   updatedDurations[index] = {
  //     ...updatedDurations[index],
  //     value: parseInt(newValue),
  //   };
  //   setAvailability(updatedDurations)
  // }
  //
  // const handleRemove = (index: number) => {
  //   const updatedDurations = availability.filter((_, i) => i !== index);
  //   setAvailability(updatedDurations)
  // }
  //
  // const handleAdd = () => {
  //   setAvailability([
  //     ...availability,
  //     { id: availability.length, option: "Nouvelle prestation", value: 5 },
  //   ])
  // }
  //
  // async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault()
  //
  //   try {
  //     await updateConfig("OWNER_AVAILABILITY", availability );
  //     alert("Les données ont été mise à jour");
  //   } catch (error) {
  //     alert("Erreur lors de la mise à jour des données");
  //     console.error(error);
  //   }
  // }

  return (
    <div id="availability-section" className="mb-8 mx-auto max-w-2xl">
      <hr className="my-8 border-t-2 border-gray-300 mx-auto max-w-2xl " />
      <h2 className="text-2xl font-semibold text-accent-600">
        Disponibilités
      </h2>
      <br />
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2 text-left font-medium">Jour</th>
          <th className="border px-4 py-2 text-left font-medium">Début</th>
          <th className="border px-4 py-2 text-left font-medium">Pause</th>
          <th className="border px-4 py-2 text-left font-medium">
            Reprise
          </th>
          <th className="border px-4 py-2 text-left font-medium">Fin</th>
        </tr>
        </thead>
        <tbody>
        {Object.entries(availability).map(
          ([key, slots], index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{key}</td>
              <td className="border px-4 py-2">
                {slots.map((slot, idx) => (
                  <div key={idx}>
                    {slot.start.hour}:{slot.start.minute}
                  </div>
                ))}
              </td>
              <td className="border px-4 py-2">
                {slots.map((slot, idx) => (
                  <div key={idx}>
                    {slot.breakStart.hour}:{slot.breakStart.minute}
                  </div>
                ))}
              </td>
              <td className="border px-4 py-2">
                {slots.map((slot, idx) => (
                  <div key={idx}>
                    {slot.breakEnd.hour}:{slot.breakEnd.minute}
                  </div>
                ))}
              </td>
              <td className="border px-4 py-2">
                {slots.map((slot, idx) => (
                  <div key={idx}>
                    {slot.end.hour}:{slot.end.minute}
                  </div>
                ))}
              </td>
            </tr>
          )
        )}
        </tbody>
      </table>
    </div>
  )
}
