import { type FormEvent, useState } from "react"
import { AllowedDurationConfType } from "@/lib/types";
import { FaTrashAlt } from "react-icons/fa"
import updateConfig from "@/lib/admin/firebase/editConfig" // Icons for buttons

export default function ConfigDuration({ configSetDuration, }: { configSetDuration: AllowedDurationConfType[] }) {

  const [durations, setDurations] = useState<AllowedDurationConfType[]>(
    configSetDuration
  )

  const handleOptionChange = (index: number, newOption: string) => {
    const updatedDurations = [...durations];
    updatedDurations[index] = { ...updatedDurations[index], option: newOption };
    setDurations(updatedDurations)
  }

  const handleValueChange = (index: number, newValue: string) => {
    const updatedDurations = [...durations];
    updatedDurations[index] = {
      ...updatedDurations[index],
      value: parseInt(newValue),
    };
    setDurations(updatedDurations)
  }

  const handleRemove = (index: number) => {
    const updatedDurations = durations.filter((_, i) => i !== index);
    setDurations(updatedDurations)
  }

  const handleAdd = () => {
    setDurations([
      ...durations,
      { id: durations.length, option: "Nouvelle prestation", value: 5 },
    ])
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      await updateConfig("ALLOWED_DURATIONS", durations );
      alert("Les données ont été mise à jour");
    } catch (error) {
      alert("Erreur lors de la mise à jour des données");
      console.error(error);
    }
  }

  return (
    <div id="duration-section" className="mb-8 mx-auto max-w-2xl">
      <hr className="my-8 border-t-2 border-gray-300 mx-auto max-w-2xl " />
      <h2 className="text-2xl font-semibold text-accent-600">Prestations</h2>
      <br />
      <form
        onSubmit={(event) => {
          handleSubmit(event)
        }}>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left font-medium w-3/5">
              Prestation
            </th>
            <th className="border px-4 py-2 text-left font-medium">
              Durée (min)
            </th>
            <th className="border px-4 py-2 text-left font-medium">
              Supprimer
            </th>
          </tr>
          </thead>
          <tbody>
          {durations.map((confDuration, index) => (
            <tr key={index} className="border-t">
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={confDuration.option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-accent-600 focus:border-accent-600 sm:text-sm ${
                    index === 0 ? "bg-gray-100" : ""
                  }`}
                  disabled={index === 0}
                />
              </td>

              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={confDuration.value}
                  onChange={(e) => handleValueChange(index, e.target.value)}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-accent-600 focus:border-accent-600 sm:text-sm ${
                    index === 0 ? "bg-gray-100" : ""
                  }`}
                  disabled={index === 0}
                />
              </td>

              <td className="border px-4 pt-2 text-center">
                {index !== 0 ? (
                  <button
                    onClick={() => handleRemove(index)}
                    className="text-red-600 hover:text-red-800">
                    <FaTrashAlt />
                  </button>
                ) : (
                  <button disabled className="text-gray-400 cursor-not-allowed">
                    <FaTrashAlt />
                  </button>
                )}
                <input type="hidden" value={confDuration.id} />
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex w-full justify-center text-sm rounded-md bg-red-800 px-3 py-2 text-white shadow-sm hover:bg-red-700 sm:w-auto disabled:opacity-50">
            Ajouter Prestation
          </button>
          <button
            type="submit"
            className="inline-flex w-full justify-center text-sm rounded-md bg-red-800 px-3 py-2 text-white shadow-sm hover:bg-red-700 sm:w-auto disabled:opacity-50">
            Sauvegarder
          </button>
        </div>
      </form>
  </div>
)
}
