import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
export const createUser = async (forename, surname, email, password, role) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, "user", user.uid), {
      fullName: { forename: forename, surname: surname },
      email: email,
      role: role,
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
