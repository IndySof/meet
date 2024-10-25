import { doc, getDoc, getFirestore } from "firebase/firestore"

import { app } from "@/pages"

async function fetchConfig(conf:string) {
  const db = getFirestore(app);
  const docRef = doc(db, "config", "config");

  try {
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const configData = docSnapshot.data()[conf];
      if (configData) {
        return configData
      }
      else {
        // console.log("No ", conf)
        return null
      }
    } else {
      // console.log("No data")
      return null
    }
  } catch (error) {
    // console.error(error)
    return null
  }
}

export default fetchConfig

