import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import SignUp from "@/components/signup/SignUp.vue";
import AccountTypeSelector from "@/components/signup/AccountTypeSelector.vue";
import userLogin from "@/components/login/userLogin.vue";
import athleteProfile from "@/components/profile/athleteProfile.vue";
import trainerProfile from "@/components/profile/athleteProfile.vue";
import medicalProfile from "@/components/profile/athleteProfile.vue";
import injuryDashboard from "@/components/injury/injuryDashboard";
import incidentEditor from "@/components/injury/incidentEditor";
import { auth } from "@/firebase/firebase.js";

const routes = [
  {
    path: "/home",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/account-type",
    name: "AccountTypeSelector",
    component: AccountTypeSelector,
  },

  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    props: (route) => ({ account: route.query.accountType }),
  },
  {
    path: "/login",
    name: "userLogin",
    component: userLogin,
  },
  {
    path: "/athlete-profile",
    name: "athleteProfile",
    component: athleteProfile,
    meta: { requiresAthlete: true },
  },
  {
    path: "/medical-profile",
    name: "medicalProfile",
    component: medicalProfile,
    meta: { requiresMedical: true },
  },
  {
    path: "/trainer-profile",
    name: "trainerProfile",
    component: trainerProfile,
    meta: { requiresTrainer: true },
  },
  {
    path: "/dashboard",
    name: "injuryDashboard",
    component: injuryDashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/add",
    name: "incidentEditor",
    component: incidentEditor,
    meta: {
      requiresAuth: true,
      requiresMedical: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresAthlete = to.matched.some(
    (record) => record.meta.requiresAthlete
  );
  const requiresMedical = to.matched.some(
    (record) => record.meta.requiresMedical
  );
  const requiresTrainer = to.matched.some(
    (record) => record.meta.requiresTrainer
  );

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (
    requiresAthlete &&
    (!currentUser || currentUser.accountType !== "athlete")
  ) {
    next({ name: "HomePage" });
  } else if (
    requiresMedical &&
    (!currentUser || currentUser.accountType !== "medical")
  ) {
    next({ name: "HomePage" });
  } else if (
    requiresTrainer &&
    (!currentUser || currentUser.accountType !== "trainer")
  ) {
    next({ name: "HomePage" });
  } else {
    next();
  }
});

export default router;
