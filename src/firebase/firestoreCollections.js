import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
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

export const createAccount = async (userId, accountType, forename, surname) => {
  try {
    const accountData = {
      userid: userId,
      name: `${forename} ${surname}`,
      teamid: null, // Set the teamid to null initially until provided an appropriate reference value
    };

    let accountCollection;
    switch (accountType) {
      case "athlete":
        accountCollection = collection(db, "athletes");
        break;
      case "team-staff":
        accountCollection = collection(db, "coaches");
        break;
      case "medical-staff":
        accountCollection = collection(db, "medicalstaff");
        break;
      default:
        throw new Error("Invalid account type");
    }

    const accountDocRef = await addDoc(accountCollection, accountData);
    return accountDocRef.id;
  } catch (error) {
    console.error("Error creating account:", error);
    return null;
  }
};

export const createUserAddress = async (userId, address1, address2, city, region, postcode, phoneNumber) => {
  try {
    const docRef = await addDoc(collection(db, 'addresses'), {
      userId,
      address1,
      address2,
      city,
      region,
      postcode,
      phoneNumber
    });
    console.log('User address added with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding user address: ', error);
    return null;
  }
};


