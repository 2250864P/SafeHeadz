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
                    <a class="nav-link" href="#">Resources</a>
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
    <div class="container mt-3">
        <h1>Educational Resources</h1>
        <p>
            Here are some helpful resources to learn more about concussions and concussion management.
        </p>
        <h2>UK Resources</h2>
        <ul>
            <li><a href="https://www.nhs.uk/conditions/concussion/" target="_blank">NHS - Concussion</a></li>
            <li><a href="https://www.sportengland.org/" target="_blank">Sport England</a></li>
            <li><a href="https://www.headway.org.uk/" target="_blank">Headway UK</a></li>
            <li><a href="https://www.braininjuryhub.co.uk/" target="_blank">Brain Injury Hub</a></li>
        </ul>
        <h2>Other Resources</h2>
        <ul>
            <li><a href="https://www.cdc.gov/headsup/index.html" target="_blank">Centers for Disease Control and Prevention
                    (CDC) - Heads Up</a></li>
            <li><a href="https://www.concussionfoundation.org/" target="_blank">Concussion Legacy Foundation</a></li>
            <li><a href="https://www.brainline.org/" target="_blank">BrainLine</a></li>
            <li><a href="https://www.mayoclinic.org/diseases-conditions/concussion/diagnosis-treatment/drc-20355610"
                    target="_blank">Mayo Clinic - Concussion</a></li>
        </ul>
    </div>
</template>
  
<script>
import { onMounted, ref } from "vue";
import { auth } from "@/firebase/firebase";

export default {
    name: 'EducationalResources',
    
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
  
<style scoped>
/* Bootstrap styles */
.container {
    max-width: 960px;
}
</style>
  