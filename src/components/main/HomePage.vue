<template>
    <nav class="navbar navbar-fluid navbar-expand-lg navbar-light bg-transparent w-100">
        <a class="navbar-brand" href="#">
            <img :src="require('@/assets/Website_Logo.png')" width="80" height="80" class="d-inline-block align-top me-2"
                alt="">
            SafeHeads
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <router-link to="/about" class="nav-link">About</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/resources" class="nav-link">Resources</router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Contact</a>
                </li>
            </ul>

            <!-- Profile and Logout buttons displayed when user is authenticated -->
            <div v-if="isAuthenticated" class="ml-auto">
                <ul class="nav">
                    <li class="nav-item">
                        <router-link to="/profile" class="nav-link btn btn-outline-primary mr-2">
                            Profile
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link btn btn-outline-primary" @click="logout">
                            Logout
                        </button>
                    </li>
                </ul>
            </div>

            <!-- Sign Up and Login buttons displayed when user is not authenticated -->
            <div v-else>
                <ul class="nav">
                    <li class="nav-item">
                        <router-link to="/account-type" class="nav-link btn btn-outline-primary mr-2">
                            Sign Up
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link btn btn-outline-primary mr-2">
                            Login
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="d-flex align-items-center justify-content-center" style="height: 100vh;">
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
                    <p>Hello {{ displayName }},</p>
                    <router-link to="/dashboard" class="btn btn-primary btn-lg">
                        Go to Dashboard
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
  

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


<script>
import { onMounted, ref } from "vue";
import PageBackground from '@/components/PageBackground.vue'
import { auth } from "@/firebase/firebase";

export default {
    name: 'HomePage',
    components: {
        PageBackground
    },

    setup() {
        const user = ref(null);

        const logout = async () => {
            await auth.signOut();
        };

        onMounted(() => {
            auth.onAuthStateChanged((firebaseUser) => {
                user.value = firebaseUser;
            });
        });

        return { user, logout };
    },

    computed: {
        isAuthenticated() {
            return !!auth.currentUser;
        },

        displayName() {
            return this.user && this.user.name ? this.user.name : '';
        }
    },

    watch: {
        isAuthenticated(newValue) {
            if (newValue) {
                // user is authenticated, hide sign up and login buttons
                const navbarLog = document.getElementById("navbarLog");
                navbarLog.style.display = "none";
            } else {
                // user is not authenticated, show sign up and login buttons
                const navbarLog = document.getElementById("navbarLog");
                navbarLog.style.display = "block";
            }
        },
    },

};
</script>
