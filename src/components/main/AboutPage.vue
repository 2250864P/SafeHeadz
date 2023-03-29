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
        <h1>About SafeHeads</h1>
        <p>
            SafeHeads is a user-friendly concussion management web application that helps individuals and medical
            professionals track symptoms and monitor recovery progress so that an athlete can return to action safely.
            With a secure documentation feature, athletes can protect their long-term health and medical professionals
            can access the information they need to provide appropriate care.
        </p>
        <h2>What is a concussion?</h2>
        <p>
            A concussion is a type of mild traumatic brain injury (mTBI) caused by a blow to the head or body that
            disrupts the normal functioning of the brain. It can cause a wide range of physical, cognitive, and emotional
            symptoms that may last for days, weeks, or even months.
        </p>
        <h2>Common symptoms of a concussion</h2>
        <ul>
            <li>Headache or a feeling of pressure in the head</li>
            <li>Nausea or vomiting</li>
            <li>Dizziness or loss of balance</li>
            <li>Blurred vision or sensitivity to light</li>
            <li>Confusion or difficulty concentrating</li>
            <li>Memory loss or amnesia</li>
            <li>Mood changes, such as irritability or depression</li>
        </ul>
    </div>
</template>
  
<script>
import { onMounted, ref } from "vue";
import { auth } from "@/firebase/firebase";

export default {
    name: 'AboutPage',

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
  