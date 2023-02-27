import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import SignUp from "@/components/signup/SignUp.vue";
import AccountTypeSelector from "@/components/signup/AccountTypeSelector.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
