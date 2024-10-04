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

  const SUBJECT = `${name} souhaite prendre rendez-vous avec vous`

  let locationName:string

  if (location === `phone`)
  {
    locationName = "Téléphone"
  }
  else
  {
    locationName = "Google Meet"
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
    `<b>${name}</b> a demandé un rendez-vous le <b>${dateSummary}</b>, via <b>${locationName}</b>`,
    `<br>`,
    `Le fuseau horaire local est  ${timeZone}`,
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
