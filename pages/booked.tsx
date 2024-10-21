import { useRouter } from "next/router"
import Link from "next/link"

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
      </p>
      <p className="mt-6 text-xl text-gray-800 font-medium">
        <a
          href={"https://www.google.com/calendar/event?eid=" + query.url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-700 underline">
          Google Calendar
        </a>
      </p>
      <div className="mt-8">
        <Link href="/"
              className="inline-flex w-full justify-center rounded-md bg-red-800 px-3 py-2 font-semibold text-white shadow-sm hover:bg-red-700 sm:w-auto disabled:opacity-50">
          Prendre un nouveau rendez-vous
        </Link>
      </div>
    </div>
  )
}
