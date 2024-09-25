import { useRouter } from "next/router"

export default function Booked() {
  const { query } = useRouter()

  if (!query || typeof query.url !== "string") {
    return
  }
  return (
    <div className="py-8 sm:py-16 mx-auto max-w-xl">
      <h1 className="text-3xl font-bold tracking-tight text-accent-700">
        Le rendez-vous a été confirmé.
      </h1>
      <p className="mt-6 text-xl text-gray-800 font-medium">
        Il est maintenant sur votre calendrier et une invitation a été envoyée.{" "}
        <a
          href={"https://www.google.com/calendar/event?eid=" + query.url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-700 underline">
          Voir sur Google Calendar
        </a>
      </p>
    </div>
  )
}
