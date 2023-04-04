import { db } from "@/firebase/firebase";
import { collection, doc, getDocs, addDoc, query, where } from "firebase/firestore";
import { ref, computed } from "vue";

export const getIncidents = async () => {
  const headinjury = [];
  try {
    const querySnapshot = await getDocs(collection(db, "headinjury"));
    querySnapshot.forEach((doc) => {
      headinjury.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error(error);
  }
  return headinjury;
};

export const addIncident = async (headinjuryData) => {
  try {
    const docRef = await addDoc(collection(db, "headinjury"), headinjuryData);
    return docRef.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getIncidentById = async (injury_id) => {
  try {
    const docRef = doc(db, "headinjury", injury_id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.warn("No such incident document");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function getHeadInjuriesByUser(userId) {
  const q = query(collection(db, "headinjury"), where("user_id", "==", userId));
  const querySnapshot = await getDocs(q);
  const headInjuries = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return headInjuries;
}

export const getUsers = async () => {
  const users = ref([]);

  const q = query(collection(db, "user"), where("role", "==", "athlete"));
  const querySnapshot = await getDocs(q);
  users.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return users;
};

export const athleteList = (users) => {
  return computed(() => {
    return users.value;
  });
};