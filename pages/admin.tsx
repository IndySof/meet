import Link from 'next/link'
import fetchConfig from "@/lib/admin/firebase/getConfig"
import { AllowedDurationConfType, AvailabilitySlotsMap, DOCTORSConfType } from "@/lib/types"
import ConfigDuration from "@/components/admin/configDuration"
import ConfigDoctor from "@/components/admin/configDoctor"
import ConfigAvailability from "@/components/admin/configAvailability"
import AbsentPicker from "@/components/admin/absentPicker"
import { ALLOWED_DURATIONS, DOCTORS, OWNER_AVAILABILITY } from "@/config"

export async function getServerSideProps() {
  let configSetDuration: AllowedDurationConfType[] = ALLOWED_DURATIONS
  let configSetDoctor: DOCTORSConfType[] = DOCTORS
  let configSetAvailability: AvailabilitySlotsMap = OWNER_AVAILABILITY

  try {
    configSetDuration = await fetchConfig("ALLOWED_DURATIONS");
    configSetDoctor = await fetchConfig("DOCTORS");
    configSetAvailability = await fetchConfig("OWNER_AVAILABILITY");
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      configSetDuration,
      configSetDoctor,
      configSetAvailability,
    },
  };
}

export default function Admin({
  configSetDuration,
  configSetDoctor,
  configSetAvailability,
}: {
  configSetDuration: AllowedDurationConfType[];
  configSetDoctor: DOCTORSConfType[];
  configSetAvailability: AvailabilitySlotsMap;
})
{
  return (
    <>
      <div className="pt-8 mx-auto max-w-2xl flex justify-end">
        <div>
          <Link
            href="/"
            className="inline-flex w-full justify-center rounded-md bg-red-800 px-3 py-2 font-semibold text-white shadow-sm hover:bg-red-700 sm:w-auto disabled:opacity-50">
            Retournez à l&apos;acceuil
          </Link>
        </div>
      </div>
      <div className="pt-8 mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-accent-700 sm:text-5xl">
          Tableaux de Gestion et de Configuration du Calendrier
        </h1>
      </div>

      <hr className="my-8 border-t-2 border-gray-300 mx-auto max-w-2xl "/>

      <div className="flex justify-between mb-8 mx-auto max-w-2xl">
        <button
          onClick={() =>
            document.getElementById("absent-section")?.scrollIntoView({ behavior: "smooth"})
          }
          className="inline-flex w-full mr-2 justify-center rounded-md bg-gray-500 px-3 py-2 font-semibold text-white shadow-sm hover:bg-gray-400 disabled:opacity-50">
          Absences
        </button>
        <button
          onClick={() =>
            document.getElementById("duration-section")?.scrollIntoView({ behavior: "smooth"})
          }
          className="inline-flex w-full mr-2  justify-center rounded-md bg-gray-500 px-3 py-2 font-semibold text-white shadow-sm hover:bg-gray-400 disabled:opacity-50">
          Prestations
        </button>
        <button
          onClick={() =>
            document.getElementById("doctor-section")?.scrollIntoView({ behavior: "smooth"})
          }
          className="inline-flex w-full mr-2  justify-center rounded-md bg-gray-500 px-3 py-2 font-semibold text-white shadow-sm hover:bg-gray-400 disabled:opacity-50">
          Docteurs
        </button>
        <button
          onClick={() =>
            document.getElementById("availability-section")?.scrollIntoView({ behavior: "smooth"})
          }
          className="inline-flex w-full justify-center rounded-md bg-gray-500 px-3 py-2 font-semibold text-white shadow-sm hover:bg-gray-400 disabled:opacity-50">
          Disponibilités
        </button>
      </div>

      <AbsentPicker configSetDoctor={configSetDoctor}/>
      <ConfigDuration configSetDuration={configSetDuration} />
      <ConfigDoctor configSetDoctor={configSetDoctor} />
      <ConfigAvailability configSetAvailability={configSetAvailability} />

      <div className="flex justify-center mt-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex w-full justify-center rounded-md bg-red-800 px-3 py-2 font-semibold text-white shadow-sm hover:bg-red-700 sm:w-auto disabled:opacity-50">
          Retourner en haut
        </button>
      </div>
      <br />
    </>
  )
}
