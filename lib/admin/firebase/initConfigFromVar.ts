// Init variable config with basic data
// Warning execute only one time when project start

import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

function initFirestore() {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  }

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  const config =
    {
      ALLOWED_DURATIONS : [
        { option: "Choisir une prestation", value: 0, id:0 },
        { option: "Vaccination", value: 5, id:1 },
        { option: "Test Covid", value: 5, id:7 },
        { option: "Prise de sang", value: 10, id:2 },
        { option: "Test de laboratoire", value: 15, id:3 },
        { option: "Examen médical", value: 20, id:4 },
        { option: "Suivi post-opératoire", value: 20, id:5 },
        { option: "Examen IRM", value: 25, id:8 },
        { option: "Échographie", value: 30, id:6 }
      ],
      DOCTORS : [
        { user:"Urgent (Tous les Docteurs)", option:[0] },
        { user:"Alexis Delaporte", option:[1,2,3,4,5,8] },
        { user:"Indiana Sofia", option:[1,2,3,4,8] },
        { user:"Alex Dupond", option:[1,2,3,6] },
        { user:"Indi Dupont ", option:[1,2,4,6] },
        { user:"Jean Moulin", option:[1,3,4,5,7] },
        { user:"Louis Martin", option:[2,4,6,8] },
        { user:"Henri Claude", option:[1,3,4,5,7] }
      ],
      OWNER_AVAILABILITY : {
        1: [
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
          }
        ],
        2: [
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
          }
        ],
        3: [
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
          }
        ],
        4: [
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
          }
        ],
        5: [
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
          }
        ],
      }
    }

  setDoc(doc(db, "config", "config"), config);

  return 1
}

export default initFirestore



