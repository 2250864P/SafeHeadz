<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Sign Up</h1>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form @submit.prevent="submitForm">
                    <div class="form-group">
                        <label for="name">Forename(s)</label>
                        <input type="text" class="form-control" id="forename" v-model="name" required>
                    </div>
                    <div class="form-group">
                        <label for="name">Surname</label>
                        <input type="text" class="form-control" id="surname" v-model="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" v-model="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" v-model="password" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Confirm Password</label>
                        <input type="password" class="form-control" id="password" v-model="password" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Sign Up</button>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref } from "vue";
import { createUser } from "@/firebaseAuth";

export default {
    setup() {
        const email = ref("");
        const password = ref("");
        const forename = ref("");
        const surname = ref("");
        const confirmPassword = ref("");


        const handleSignUp = async () => {
            if (password.value !== confirmPassword.value) {
                console.log("Passwords do not match");
                return;
            }

            const displayName = `${forename.value} ${surname.value}`;

            const user = await createUser(email.value, password.value, displayName);
            if (user) {
                console.log("User created:", user);
                // handle successful sign-up here, e.g. redirect to home page
            } else {
                console.log("Sign-up failed");
                // handle failed sign-up here, e.g. show error message
            }
        };

        return {
            email,
            password,
            forename,
            surname,
            confirmPassword,
            handleSignUp,
        };
    },
};
</script>