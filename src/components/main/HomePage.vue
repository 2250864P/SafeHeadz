<template>
    <Header></Header>

    <div class="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        <div class="jumbotron jumbotron-fluid text-center">
            <div class="container-fluid">
                <h1 class="display-4">
                    Empowering athletes, team staff and governing bodies to tackle concussions
                </h1>
                <!-- Conditionally render sign up button when user is not authenticated -->
                <router-link v-if="!isAuthenticated" to="/account-type" class="btn btn-primary btn-lg">
                    Sign Up Now
                </router-link>
                <!-- Conditionally render profile link and message when user is authenticated -->
                <div v-if="isAuthenticated">
                    <p>Hello {{ fullName.forename }} {{ fullName.surname }}</p>
                    <router-link to="/dashboard" class="btn btn-primary btn-lg">
                        Go to Dashboard
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { getDoc, doc } from "firebase/firestore";
import PageBackground from "@/components/PageBackground.vue";
import Header from "@/components/Header.vue";
import { ref, onMounted } from "vue";
import { auth, db } from "@/firebase/firebase";

export default {
    name: "HomePage",
    components: {
        PageBackground,
        Header
    },
    setup() {
        const user = ref(null);
        const fullName = ref({});

        const logout = async () => {
            await auth.signOut();
        };

        onMounted(async () => {
            auth.onAuthStateChanged(async (firebaseUser) => {
                user.value = firebaseUser;
                if (firebaseUser) {
                    const userDoc = await getDoc(doc(db, "user", firebaseUser.uid));
                    fullName.value = userDoc.data().fullName;
                }
            });
        });

        return { user, logout, fullName };
    },

    computed: {
        isAuthenticated() {
            return !!this.user;
        },
    },
};
</script>




<style>
.navbar {
    width: 100%;
}

.navbarlog {
    margin-right: 5px;
}

.nav-link {
    font-size: 1.9rem;
}

.navbar-brand {
    font-size: 30px !important;
}
</style>