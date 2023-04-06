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
import { createUser, createAccount } from "@/firebase/firestoreCollections.js";
import { sendEmailVerification } from "firebase/auth";
export default {
    props: {
        account: {
            type: String,
            required: true,
        },
    },
    computed: {
        accountType() {
            return this.$route.query.accountType || 'default';
        }
    },
    setup(props) {
        const email = ref("");
        const forename = ref("");
        const surname = ref("");
        const accountType = ref(props.account);
        const password = ref("");
        const confirmPassword = ref("");
        const handleSignUp = async () => {
            if (password.value !== confirmPassword.value) {
                console.log("Passwords do not match");
                return;
            }
            const user = await createUser(forename.value, surname.value, email.value, password.value, accountType.value);
            if (user !== null) {
                try {
                    await sendEmailVerification(user);

                    // Call createAccount function to save user data in the appropriate collection
                    const accountId = await createAccount(user.uid, accountType.value, forename.value, surname.value);

                    console.log("Verification email sent to:", user.email);
                    // Show success message and redirect to verification pending page
                    alert(
                        "Verification email sent! Please check your email and follow the instructions to complete registration."
                    );
                    location.href = "/verification-pending"; // Redirect to the verification pending page
                } catch (error) {
                    console.error(error);
                    // handle failed email verification here, show error message
                    alert("Email verification failed. Please try again later.");
                }
            } else {
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
            accountType,
            handleSignUp,
        };
    },
};
</script>

