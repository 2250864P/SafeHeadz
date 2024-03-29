import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { auth, db } from "@/firebase/firebase";
import { createUser } from "@/firebase/firestoreCollections";
import { handleAuthStateChanged } from "@/firebase/authState";

const app = createApp(App, {
  devtools: true,
});

app.use(router);

app.config.globalProperties.$auth = auth;
app.config.globalProperties.$db = db;
app.config.globalProperties.$createUser = createUser;
app.config.globalProperties.$handleAuthStateChanged = handleAuthStateChanged;
//Properties configured here can be used globally throughout the app

app.mount("#app");
