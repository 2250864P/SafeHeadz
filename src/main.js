import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { auth, db } from "@/firebase/firebase";
import { createUser } from "@/firebase/firebaseAuth";
import { handleAuthStateChanged } from "@/firebase/authState"

const app = createApp(App);

app.use(router);

app.config.globalProperties.$auth = auth;
app.config.globalProperties.$db = db;
app.config.globalProperties.$createUser = createUser;
app.config.globalProperties.$handleAuthStateChanged = handleAuthStateChanged;
//Properties configured here can be used globally throughout the app


app.mount("#app");
