import Link from 'next/link';

export default function Confirmation() {
  return (
    <div className="py-8 sm:py-16 mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight text-accent-700 sm:text-5xl">
        Merci !
      </h1>
      <p className="mt-6 text-xl text-gray-800 font-medium">
        Je vous recontacterai dès que possible.
      </p>
      <br/>
      <div className="mt-8">
        <Link href="/"
          className="inline-flex w-full justify-center rounded-md bg-red-800 px-3 py-2 font-semibold text-white shadow-sm hover:bg-red-700 sm:w-auto disabled:opacity-50">

          Prendre un nouveau rendez-vous
        </Link>
      </div>
    </div>
  )
}
