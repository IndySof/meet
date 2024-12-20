import { z } from "zod"

const LINE_PREFIX = `<div class="gmail_default" style="font-family:arial,sans-serif">`
const LINE_SUFFIX = `</div>`

export default function ApprovalEmail({
  email,
  name,
  location,
  dateSummary,
  approveUrl,
  timeZone,
  doctor,
  option
}: {
  dateSummary: string
  email: string
  name: string
  location: string
  approveUrl: string
  timeZone: string
  doctor: string
  option: string
}) {

  const SUBJECT = `Rendez-vous : ${doctor} - ${option}`

  let locationName:string
  let locationPre:string


  if (location === `desk`)
  {
    locationName = "Site"
    locationPre = "sur"
  }
  else if (location === `phone`)
  {
    locationName = "Téléphone"
    locationPre = "au"
  }
  else
  {
    locationName = "Google Meet"
    locationPre = "via"
  }

  const declineUrl = `mailto:${encodeURI(email)}?subject=${encodeURIComponent(
    `Re: Votre demande de rendez-vous`
  )}&body=${encodeURIComponent(
    `Bonjour,

Je viens de vérifier mon calendrier et il semble que la date : ${dateSummary} ne convient pas.

Serait-il possible de fixer un autre rendez-vous ?`
  )}`

  let body = `<div dir="ltr">`
  body += [
    `<b>${name}</b> a demandé un rendez-vous : <b>${option}</b> avec le docteur <b>${doctor}</b> le <b>${dateSummary}</b> ${locationPre} <b>${locationName}</b>.`,
    ` Le fuseau horaire local est  ${timeZone}`,
    `<br>`,
    `<br>`,
    `<b><a href=${approveUrl}>Accepter le rendez-vous</a></b>`,
    `<br>`,
    `<b><a href=${declineUrl}>Refuser le rendez-vous</a></b>`,
  ]
    .map((line) => `${LINE_PREFIX}${line}${LINE_SUFFIX}`)
    .join("")

  body += `</div>`

  return { subject: SUBJECT, body }
}
