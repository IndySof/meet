import type { AvailabilitySlotsMap } from "./lib/types"

export const ALLOWED_DURATIONS = [
  { key: "Vaccination", value: 5 },
  { key: "Prise de sang", value: 10 },
  { key: "Test de laboratoire", value: 15 },
  { key: "Examen médical", value: 20 },
  { key: "Suivi post-opératoire", value: 25 },
  { key: "Échographie", value: 30 }
]

export const DEFAULT_DURATION = 30

export const CALENDARS_TO_CHECK = ["primary"]
export const SLOT_PADDING = 0
export const OWNER_TIMEZONE = "Europe/Paris"
export const LEAD_TIME = 0

const DEFAULT_WORKDAY = [
  {
    start: {
      hour: 9,
      minute:30,
    },
    breakStart: {
        hour: 12,
        minute:30,
    },
    breakEnd: {
      hour: 14,
      minute: 0,
    },
    end: {
      hour: 19,
      minute: 30,
    },
  },
]

export const OWNER_AVAILABILITY: AvailabilitySlotsMap = {
  1: DEFAULT_WORKDAY,
  2: DEFAULT_WORKDAY,
  3: DEFAULT_WORKDAY,
  4: DEFAULT_WORKDAY,
  5: DEFAULT_WORKDAY,
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
