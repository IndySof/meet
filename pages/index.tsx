import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from "next"
import { useEffect } from "react"
import { z } from "zod"

import Template from "@/components/Template"
import AvailabilityPicker from "@/components/availability/AvailabilityPicker"
import {
  DEFAULT_DURATION,
  firebaseConfig,
} from "@/config"
import { useProvider, withProvider } from "@/context/AvailabilityContext"
import getAvailability from "@/lib/availability/getAvailability"
import getBusyTimes from "@/lib/availability/getBusyTimes"
import getPotentialTimes from "@/lib/availability/getPotentialTimes"
import {
  mapStringsToDates,
  mapDatesToStrings,
  getDateRangeInterval,
} from "@/lib/availability/helpers"
import type { DateTimeIntervalString } from "@/lib/types"
import Day from "@/lib/day"
import localeDayString from "@/lib/locale"
import fetchConfig from "@/lib/admin/firebase/getConfig"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);

export type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

function Page({
  start,
  end,
  busyTime,
  busyDoctor,
  configSetDuration,
  configSetDoctor,
  configSetAvailability
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    state: { duration, selectedDate},
    dispatch,
  } = useProvider()

  const startDay = Day.dayFromString(start)
  const endDay = Day.dayFromString(end)

  const potential = getPotentialTimes({
    start: startDay,
    end: endDay,
    duration,
    availabilitySlots: configSetAvailability,
  })

  const slots = getAvailability({
    busyTime:  mapStringsToDates(busyTime),
    busyDoctor: busyDoctor,
    potential,
  })

  // If we got this far and there's no selectedDate, set it to the first date
  // with some availability.
  useEffect(() => {
    if (!selectedDate && slots.length > 0) {
      const date: Date = slots[0].start;
      const dateString: string = localeDayString(date)

      dispatch({
        type: "SET_SELECTED_DATE",
        payload: Day.dayFromString(dateString), //payload from date respecting timezone
      })
    }
    // Run once, on initial render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="max-w-2xl sm:mx-auto mx-4 pb-24">
      <Template />
      <AvailabilityPicker slots={slots} configSetDuration={configSetDuration} configSetDoctor={configSetDoctor}/>
    </main>
  )
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {

  let configSetDuration = [{ option: "Choisir une prestation", value: 0, id:0 }]
  let configSetDoctor = null
  let configSetAvailability = null

  try {
    configSetDuration = await fetchConfig("ALLOWED_DURATIONS")
    configSetDoctor = await fetchConfig("DOCTORS")
    configSetAvailability = await fetchConfig("OWNER_AVAILABILITY")
  } catch (error) {
    // console.error(error)
  }

  const schema = z.object({
    duration: z
      .enum([...(configSetDuration.map((d) => String(d.value)) as [string, ...string[]])])
      .optional()
      .default(String(DEFAULT_DURATION))
      .transform(Number),
    timeZone: z.string().optional(),
    selectedDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/u)
      .optional(),
  })

  const { duration, timeZone, selectedDate } = schema.parse(query)

  // Offer three weeks of availability.
  const start = Day.todayWithOffset(0)
  const end = Day.todayWithOffset(21)

  const busy = await getBusyTimes(
    getDateRangeInterval({
      start,
      end,
      timeZone,
    })
  )

  const busyTime = busy.map(({ start, end }:DateTimeIntervalString) => ({
    start,
    end,
  }))

  const busyDoctor = busy.map(({ doctor }:DateTimeIntervalString) => ({
    doctor,
  }))

  return {
    props: {
      start: start.toString(),
      end: end.toString(),
      busyTime: mapDatesToStrings(busyTime),
      busyDoctor,
      duration,
      ...(timeZone && { timeZone }),
      ...(selectedDate && { selectedDate }),
      configSetDuration:configSetDuration,
      configSetDoctor:configSetDoctor,
      configSetAvailability:configSetAvailability
    },
  }
}

export default withProvider(Page)
