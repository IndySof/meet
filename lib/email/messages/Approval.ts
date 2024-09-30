const LINE_PREFIX = `<div class="gmail_default" style="font-family:arial,sans-serif">`
const LINE_SUFFIX = `</div>`

export default function ApprovalEmail({
  email,
  name,
  location,
  dateSummary,
  approveUrl,
  timeZone,
}: {
  dateSummary: string
  email: string
  name: string
  location: string
  approveUrl: string
  timeZone: string
}) {

  const SUBJECT = `${name} souhaite prendre rendez-vous avec vous`

  const declineUrl = `mailto:${encodeURI(email)}?subject=${encodeURIComponent(
    `Re: Your meeting request`
  )}&body=${encodeURIComponent(
    `Bonjour,

Je viens de vérifier mon calendrier et il semble que la date ${dateSummary} ne convient pas.

Serait-il possible de fixer un autre rendez-vous ?`
  )}`

  let body = `<div dir="ltr">`
  body += [
    `<b>${name}</b> a demandé un rendez-vous le <b>${dateSummary}</b>, via <b>${location}</b>`,
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
