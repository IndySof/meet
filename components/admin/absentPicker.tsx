import { type FormEvent, useState } from "react"
import { DOCTORSConfType } from "@/lib/types"
import { OWNER_TIMEZONE } from "@/config"

function AbsentPicker(configSetDoctor:any)
{
  const DOCTORS:DOCTORSConfType[]= configSetDoctor.configSetDoctor

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [doctor, setDoctor] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const start = new Date(startDate)
    const end = new Date(endDate)
    const duration = ((end.getTime() - start.getTime())/1000/60).toString()// convert ms in min
    const option = "Absence"

    if (!doctor) {
      alert("Veuillez sélectionner un docteur !")
      return
    }

    if (!startDate || !endDate || start >= end)
    {
      alert("Veuillez renseigner correctement les dates !")
      return
    }

    const requestData = {
      name: doctor,
      email: process.env.NEXT_PUBLIC_OWNER_EMAIL,
      start: start.toISOString(),
      end: end.toISOString(),
      timeZone: OWNER_TIMEZONE,
      location: "desk",
      doctor: doctor,
      option: option,
      duration: duration
    }

    fetch(`/api/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then(async (response) => {
        const json = await response.json();
        if (json.success) {
          alert("La demande d'absence a été envoyée par email.");
        } else {
          alert("Erreur lors de l'envoi de la demande d'absence.");
        }
      })
      .catch(() => {
        alert("Erreur lors de l'envoi de la demande d'absence.");
      });
  }

  return (
    <div id="absent-section" className="mb-6 mx-auto max-w-2xl">
      <hr className="my-6 border-t-2 border-gray-300 mx-auto max-w-2xl " />
      <h2 className="text-2xl font-semibold text-accent-600">Absences</h2>
      <form
        onSubmit={(event) => {
          handleSubmit(event)
        }}>
        <div className="flex mt-6">
          <div className="w-1/2">
            <label
              htmlFor="doctorABS"
              className="block text-sm font-bold leading-0 text-gray-900">
              Docteur Absent
            </label>
            <select
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-accent-600 sm:text-sm sm:leading-6 overflow-x-clip"
              onChange={(e) => setDoctor(e.target.value)}
              value={doctor}
              id="doctorABS"
              name="doctorABS">
              <option key="" value="">
                Aucun docteur
              </option>
              {DOCTORS.filter((theDoctor) => theDoctor.option[0] != 0).map(
                (theDoctor) => (
                  <option key={theDoctor.user} value={theDoctor.user}>
                    {theDoctor.user}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="">
            <label className="block text-sm font-bold text-gray-900 ml-6">
              Date et heure de début et de fin de l&apos;absence
            </label>
            <div className="flex">
              <div className="w-1/2 ml-6">
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-2 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="ml-3">
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-2 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="inline-flex w-full justify-center text-sm rounded-md bg-red-800 px-3 py-2 text-white shadow-sm hover:bg-red-700 sm:w-auto disabled:opacity-50">
            Confirmer Absence
          </button>
        </div>
      </form>
    </div>
  )
}

export default AbsentPicker;
