import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
export const createUser = async (forename, surname, email, password) => {
  try {
    const displayName = `${forename} ${surname}`;
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, "users", user.uid), {
      displayName,
      email,
      forename,
      surname,
      createdAt: new Date(),
      //User signs up and data is stored in "users" collection
      //Document ID = "user.uid"
    });



    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
