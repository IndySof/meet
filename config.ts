import type { AvailabilitySlotsMap } from "./lib/types"

export const ALLOWED_DURATIONS = [
  { option: "Choisir une prestation", value: 0, id:0 },
  { option: "Vaccination", value: 5, id:1 },
  { option: "Test Covid", value: 5, id:7 },
  { option: "Prise de sang", value: 10, id:2 },
  { option: "Test de laboratoire", value: 15, id:3 },
  { option: "Examen médical", value: 20, id:4 },
  { option: "Suivi post-opératoire", value: 20, id:5 },
  { option: "Examen IRM", value: 25, id:8 },
  { option: "Échographie", value: 30, id:6 }
]

export const DOCTORS = [
  {user:"Urgent (Tous les Docteurs)", option:[0]},
  {user:"Alexis Delaporte", option:[1,2,3,4,5,8]},
  {user:"Indiana Sofia", option:[1,2,3,4,8]},
  {user:"Alex Dupond", option:[1,2,3,6]},
  {user:"Indi Dupont ", option:[1,2,4,6]},
  {user:"Jean Moulin", option:[1,3,4,5,7]},
  {user:"Louis Martin", option:[2,4,6,8]},
  {user:"Henri Claude", option:[1,3,4,5,7]}
]

export const DEFAULT_DURATION = 0

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
