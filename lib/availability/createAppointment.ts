import type { AppointmentProps } from "../types"
import getAccessToken from "@/lib/availability/getAccessToken"

// Helper function to build the description
function buildDescription(location: string, doctor:string, option:string) {
  if (!process.env.OWNER_PHONE_NUMBER) {
    throw new Error(`OWNER_PHONE_NUMBER is not set.`)
  }

  const eventInfo = `Prestation : ${option}\n\n`
  const baseDescription = `Bonjour, merci d'avoir fixer un rendez-vous !\n\n`
  const phoneDetails = `Mon numéro de téléphone est ${process.env.OWNER_PHONE_NUMBER} mais faites-moi savoir si vous préférez que je vous appelle.`
  const meetDetails = `Les détails pour Google Meet sont joints ; merci de me dire si cela vous convient ou si vous souhaitez utiliser une autre plateforme.`
  const closing = `\n\nÀ bientôt !\n\n\n\n`
  const doctorInfo = `DOCTOR : [ - ${doctor} - ]`

  return (
    eventInfo +
    baseDescription +
    (location === `phone` ? phoneDetails : meetDetails) +
    closing +
    doctorInfo
  )
}

// Helper function to build the event body
function buildEventBody({
  start,
  end,
  summary,
  email,
  location,
  requestId,
  name,
  doctor,
  option
}: AppointmentProps) {
  const description = buildDescription(location, doctor, option)

  return {
    start: {
      dateTime: start,
    },
    end: {
      dateTime: end,
    },
    summary,
    description,
    attendees: [
      {
        email,
        displayName: name,
      },
    ],
    organizer: {
      email: process.env.NEXT_PUBLIC_OWNER_EMAIL,
      displayName: process.env.NEXT_PUBLIC_OWNER_NAME,
    },
    ...(location === `phone`
      ? { location: process.env.OWNER_PHONE_NUMBER ?? `TBD` }
      : {
          conferenceData: {
            createRequest: {
              requestId,
              conferenceSolutionKey: {
                type: `hangoutsMeet`,
              },
            },
          },
        }),
  }
}

export default async function createCalendarAppointment(
  props: AppointmentProps
) {
  const body = buildEventBody(props)

  const apiUrl = new URL(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events"
  )

  apiUrl.searchParams.set("sendNotifications", "true")
  apiUrl.searchParams.set("conferenceDataVersion", "1")

  return fetch(apiUrl, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getAccessToken()}`,
    },
    body: JSON.stringify(body),
  })
}
