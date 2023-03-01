import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import SignUp from "@/components/signup/SignUp.vue";
import AccountTypeSelector from "@/components/signup/AccountTypeSelector.vue";
import userLogin from "@/components/login/userLogin.vue";
import { auth } from "@/firebase/firebase.js";




const routes = [
  {
    path: "/",
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
    props: route => ({ account: route.query.accountType }),
  },
  {
    path: "/login",
    name: "userLogin",
    component: userLogin,
  }
  /*{
    path: "/profile",
    name: "ProfilePage",
    component: ,
    meta: {
      requiresAuth: true,
    }
  }, */
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next("/login"); // Redirect to login page if user is not authenticated and accessing a route that requires authentication
  } else {
    next(); // Proceed to the requested route
  }
});


export default router;
