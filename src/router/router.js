import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/main/HomePage.vue";
import AboutPage from "@/components/main/AboutPage.vue";
import EducationalResources from "@/components/main/EducationalResources.vue";
import SignUp from "@/components/signup/SignUp.vue";
import AccountTypeSelector from "@/components/signup/AccountTypeSelector.vue";
import userLogin from "@/components/login/userLogin.vue";
import userProfile from "@/components/profile/userProfile.vue";
import injuryDashboard from "@/components/injury/injuryDashboard";
import incidentEditor from "@/components/injury/incidentEditor";
import { auth } from "@/firebase/firebase.js";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/about",
    name: "AboutPage",
    component: AboutPage,
  },
  {
    path: "/resources",
    name: "EducationalResources",
    component: EducationalResources,
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
    path: "/profile",
    name: "userProfile",
    component: userProfile,
    meta: {
      requiresAuth: true,
    },
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
      requiresMedicalStaff: true, 
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
  const requiresMedicalStaff = to.matched.some(
    (record) => record.meta.requiresMedicalStaff
  );

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (
    requiresMedicalStaff &&
    currentUser &&
    currentUser.accountType !== "medical-staff"
  ) {
    alert("You do not have permission to access this feature.");
  } else {
    next();
  }
});

export default router;
