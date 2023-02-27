<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Sign Up</h1>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form @submit.prevent="handleSignUp">
                    <div class="form-group">
                        <label for="forename">Forename(s)</label>
                        <input type="text" class="form-control" id="forename" v-model="forename" required />
                    </div>
                    <div class="form-group">
                        <label for="surname">Surname</label>
                        <input type="text" class="form-control" id="surname" v-model="surname" required />
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" v-model="email" required />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" v-model="password" required />
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword"
                            required />
                    </div>
                    <button type="submit" class="btn btn-primary">Sign Up</button>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref } from "vue";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";

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

            try {
                const { user } = await createUserWithEmailAndPassword(auth, email.value, password.value);

                await sendEmailVerification(user);
                await setDoc(doc(db, "users", user.uid), {
                    displayName,
                    email: user.email,
                });

                console.log("Verification email sent to:", user.email);
                // handle successful sign-up here, show success message and redirect to home page
                alert("Verification email sent! Please verify your email address to complete registration.");
                location.href = "@/components/HomePage.vue"; 
            } catch (error) {
                console.error(error);
                // handle failed sign-up here, show error message
                alert("Sign-up failed. Please try again later.");
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