const LINE_PREFIX = `<div class="gmail_default" style="font-family:arial,sans-serif">`
const LINE_SUFFIX = `</div>`

const SUBJECT = `Votre demande de rendez-vous`

export default function ConfirmationEmail({
  dateSummary,
}: {
  dateSummary: string
}) {
  let body = `<div dir="ltr">`
  body += [
    `Bonjour,`,
    `<br>`,
    `Nous confirmons la réception de votre demande pour le <b>${dateSummary}</b>. 
Nous allons l'examiner dès que possible et nous vous contacterons pour confirmer la disponibilité.`,
    `<br>`,
    `Merci !`,
  ]
    .map((line) => `${LINE_PREFIX}${line}${LINE_SUFFIX}`)
    .join("")

  body += `</div>`

  return { subject: SUBJECT, body }
}
