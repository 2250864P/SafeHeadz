import { collection, addDoc, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

// Concussion adding and retrieval logic

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

export async function getHeadInjuriesByMedicalStaff(medicalStaffId) {
  const headInjuryCollection = collection(db, "headinjury");
  const q = query(
    headInjuryCollection,
    where("medicalStaffId", "==", medicalStaffId)
  );
  const querySnapshot = await getDocs(q);

  let incidents = [];
  for (const doc of querySnapshot.docs) {
    const athleteName = await getAthleteNameById(doc.data().athleteId);
    incidents.push({
      id: doc.id,
      athleteName,
      ...doc.data(),
    });
  }

  return incidents;
}

export async function getHeadInjuriesByAthlete(athleteId) {
  const headInjuryCollection = collection(db, "headinjury");
  const q = query(headInjuryCollection, where("athleteId", "==", athleteId));
  const querySnapshot = await getDocs(q);

  let incidents = [];
  querySnapshot.forEach((doc) => {
    incidents.push({ id: doc.id, ...doc.data() });
  });

  return incidents;
}

// Retrieve athlete user data for dashboard
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

export async function getAthleteIdByUserId(userid) {
  const athleteCollection = collection(db, "athletes");
  const q = query(athleteCollection, where("userid", "==", userid));
  const querySnapshot = await getDocs(q);

  let athleteId = "";
  querySnapshot.forEach((doc) => {
    athleteId = doc.id;
  });

  return athleteId;
}

export async function getAthleteNameById(athleteId) {
  const athleteDocRef = doc(db, "athletes", athleteId);
  const athleteDoc = await getDoc(athleteDocRef);

  if (athleteDoc.exists()) {
    return athleteDoc.data().name;
  } else {
    return "";
  }
}

// Retrieve medical staff user data for dashboard
export async function getMedicalStaffIdByUserId(userid) {
  const medicalStaffCollection = collection(db, "medicalstaff");
  const q = query(medicalStaffCollection, where("userid", "==", userid));
  const querySnapshot = await getDocs(q);

  let medicalStaffId = "";
  querySnapshot.forEach((doc) => {
    medicalStaffId = doc.id;
  });

  return medicalStaffId;
}
