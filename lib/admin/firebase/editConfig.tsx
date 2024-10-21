import { doc, updateDoc, getFirestore } from "firebase/firestore"

import { app } from "@/pages"

async function updateConfig(conf:string, data:any) {
  const db = getFirestore(app);
  const docRef = doc(db, "config", "config");

  const updateData = { [conf]: data }

  await updateDoc(docRef, updateData)
}

export default updateConfig;
