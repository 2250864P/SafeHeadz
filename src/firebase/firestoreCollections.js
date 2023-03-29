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
      contact_information: {
        address: "",
        city: "",
        phone_number: "",
        postcode: "",
        region: "",
      },
      email: email,
      name: {
        forename: forename,
        surname: surname,
      },
      role: role,
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
