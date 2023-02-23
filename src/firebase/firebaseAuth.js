import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";

const createUser = async (forename, surname, email, password) => {
  try {
    const displayName = `${forename} ${surname}`;
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", user.uid), {
      displayName,
      email,
      // add any additional user data you want to store here
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
