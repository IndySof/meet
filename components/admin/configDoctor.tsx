import { AllowedDurationConfType, DOCTORSConfType } from "@/lib/types";
import { FormEvent, useState } from "react"
import updateConfig from "@/lib/admin/firebase/editConfig"
import { FaTrashAlt } from "react-icons/fa"

export default function ConfigDoctor({ configSetDoctor, configSetDuration }: { configSetDoctor: DOCTORSConfType[], configSetDuration: AllowedDurationConfType[] }) {

  const [doctors, setDoctors] = useState<DOCTORSConfType[]>(configSetDoctor)
  const durations: AllowedDurationConfType[] = configSetDuration

  const handleAdd = () => {
    setDoctors([...doctors, { user: "Nouveau docteur", option: [1] }])
  }

  const handleRemove = (index: number) => {
    const updatedDoctors = [...doctors]
    updatedDoctors.splice(index, 1)
    setDoctors(updatedDoctors)
  };

  const handleDoctorNameChange = (index: number, value: string) => {
    const updatedDoctors = [...doctors]
    updatedDoctors[index].user = value
    setDoctors(updatedDoctors)
  };

  const handleOptionChange = (doctorIndex: number, newOptions: number[]) => {
    const updatedDoctors = [...doctors]
    updatedDoctors[doctorIndex].option = newOptions
    setDoctors(updatedDoctors)
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      await updateConfig("DOCTORS", doctors)
      alert("Les données ont été mises à jour")
    } catch (error) {
      alert("Erreur lors de la mise à jour des données")
      console.error(error)
    }
  }

  return (
    <div id="doctor-section" className="mb-6 mx-auto max-w-2xl">
      <hr className="my-6 border-t-2 border-gray-300 mx-auto max-w-2xl " />
      <h2 className="text-2xl font-semibold text-accent-600">Docteurs</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left font-medium w-1/4">
                Docteur
              </th>
              <th className="border px-4 py-2 text-left font-medium">
                Prestations
              </th>
              <th className="border px-4 py-2 text-left font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((confDoctor, index) => (
              <tr key={index} className="border-t">
                <td className="border px-2 py-2">
                  <input
                    type="text"
                    value={confDoctor.user}
                    onChange={(e) =>
                      handleDoctorNameChange(index, e.target.value)
                    }
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-accent-600 focus:border-accent-600 sm:text-sm ${
                      index === 0 ? "bg-gray-100" : ""
                    }`}
                    disabled={index === 0}
                  />
                </td>
                <td className="border px-2 py-2">
                  <div className="flex flex-wrap gap-2">
                    {index === 0 ? (
                      <button
                        key={durations[0].id}
                        type="button"
                        className="p-2 rounded-md text-gray-700 text-sm bg-white border-gray-500 border-2"
                        disabled
                      >
                        {durations[0].option}
                      </button>
                    ) : (
                      durations
                        .filter((duration) => duration.id !== 0)
                        .map((duration) => {
                          const isSelected = confDoctor.option.includes(duration.id)

                          return (
                            <button
                              key={duration.id}
                              type="button"
                              onClick={() => {
                                const updatedOptions = isSelected
                                  ? confDoctor.option.filter((opt) => opt !== duration.id)
                                  : [...confDoctor.option, duration.id]
                                handleOptionChange(index, updatedOptions)
                              }}
                              className={`p-2 rounded-md text-sm border-2 ${
                                isSelected
                                  ? "bg-white border-green-600 text-green-800"
                                  : "bg-white border-red-600 text-red-800"
                              }`}
                            >
                              {duration.option}
                            </button>
                          )
                        })
                    )}
                  </div>
                </td>
                <td className="border px-4 pt-2 text-center">
                  {index !== 0 ? (
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="text-red-600 hover:text-red-800">
                      <FaTrashAlt />
                    </button>
                  ) : (
                    <button
                      disabled
                      className="text-gray-400 cursor-not-allowed">
                      <FaTrashAlt />
                    </button>
                  )}
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
            Ajouter un Docteur
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
