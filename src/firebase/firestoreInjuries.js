import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export async function addHeadInjury(incident) {
  const headInjuryCollection = collection(db, "headinjury");
  await addDoc(headInjuryCollection, incident);
}

export async function getHeadInjuriesByUser(userid) {
  const headInjuryCollection = collection(db, "headinjury");
  const q = query(headInjuryCollection, where("userid", "==", userid));
  const querySnapshot = await getDocs(q);

  let incidents = [];
  querySnapshot.forEach((doc) => {
    incidents.push({ id: doc.id, ...doc.data() });
  });

  return incidents;
}

export async function getAthletes() {
  const athleteArray = [];
  const querySnapshot = await getDocs(collection(db, "athletes"));
  querySnapshot.forEach((doc) => {
    athleteArray.push({
      id: doc.id,
      name: doc.data().name,
    });
  });
  return athleteArray;
}
