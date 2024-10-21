import type { AvailabilitySlotsMap } from "./lib/types"

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

export const ALLOWED_DURATIONS = [
  { option: "Choisir une prestation", value: 0, id:0 }
]

export const DOCTORS = [
  {user:"Urgent (Tous les Docteurs)", option:[0]}
]

export const DEFAULT_DURATION = 0

export const CALENDARS_TO_CHECK = ["primary"]
export const SLOT_PADDING = 0
export const OWNER_TIMEZONE = "Europe/Paris"
export const LEAD_TIME = 0

const DEFAULT_WORKDAY = [{
  start: { hour: 8, minute:30 },
  breakStart: { hour: 12, minute:30 },
  breakEnd: { hour: 13, minute: 0},
  end: { hour: 19, minute: 30 }
}]

export const OWNER_AVAILABILITY: AvailabilitySlotsMap = {
  1: DEFAULT_WORKDAY
}

export const LOCAL_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
}

export const LOCAL_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
}
