import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDsQbhaXrBhhcN164y9VlSS5ozlgWAeIzk",
    authDomain: "safeheadz-2b098.firebaseapp.com",
    projectId: "safeheadz-2b098",
    storageBucket: "safeheadz-2b098.appspot.com",
    messagingSenderId: "452567858090",
    appId: "1:452567858090:web:80a12cde6bd4edac5b49d3",
    measurementId: "G-BRLCQY40BX"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };
