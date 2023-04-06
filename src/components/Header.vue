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
                <li class="nav-item">
                    <router-link to="/" class="nav-link">Home</router-link>
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
                        <router-link to="/" class="nav-link btn btn-outline-primary mr-2" @click="logout">
                            Logout
                        </router-link>
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
</template>

<script>
import { onMounted, ref } from "vue";
import PageBackground from "@/components/PageBackground.vue";
import { auth } from "@/firebase/firebase";

export default {
    name: "Header",
    components: {
        PageBackground,
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
            return !!this.user;
        },

        displayName() {
            return this.user && this.user.displayName ? this.user.displayName : "";
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