import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, addDoc, collection, getDoc } from "firebase/firestore";
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

export const createUserAddress = async (
  userId,
  address1,
  address2,
  city,
  region,
  postcode,
  phoneNumber
) => {
  const addressRef = doc(db, "addresses", userId);
  const addressData = {
    address1,
    address2,
    city,
    region,
    postcode,
    phoneNumber,
  };
  await setDoc(addressRef, addressData);
  console.log("User address added with ID: ", addressRef.id);
};

export const getAccountType = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "user", uid));
    if (userDoc.exists()) {
      return userDoc.data().role;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error getting account type:", error);
    return null;
  }
};
