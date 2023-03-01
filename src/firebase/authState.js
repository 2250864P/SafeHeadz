import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import router from "@/router/router";

export const handleAuthStateChanged = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (user.emailVerified) {
        router.push({ name: "HomePage" });
      }
    }
  });
};
