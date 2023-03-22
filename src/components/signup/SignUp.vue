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
import { ref, toRef } from "vue";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { handleAuthStateChanged } from "@/firebase/authState";
import { doc, setDoc, collection } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";

export default {
    props: {
        account: {
            type: String,
            required: true,
        },
    },
    computed: {
        accountType() {
            return this.$route.query.accountType
        }
    },
    setup(props, context) {
        const email = ref("");
        const forename = ref("");
        const surname = ref("");
        const accountType = toRef(this, "accountType");
        const password = ref("");
        const confirmPassword = ref("");

        const handleSignUp = async () => {
            if (password.value !== confirmPassword.value) {
                console.log("Passwords do not match");
                return;
            }
            const rolesRef = collection(db, 'roles')
            const uid = user.uid

            switch (accountType.value) {
                case 'admin':
                    await rolesRef.doc(uid).set({ admin: true })
                    break
                case 'athlete':
                    await rolesRef.doc(uid).set({ athlete: true })
                    break
                case 'coach':
                    await rolesRef.doc(uid).set({ coach: true })
                    break
                case 'medical':
                    await rolesRef.doc(uid).set({ medical: true })
                    break
                default:
                    break
            }
            const displayName = `${forename.value} ${surname.value}`;

            try {
                const { user } = await createUserWithEmailAndPassword(auth, email.value, password.value);

                await sendEmailVerification(user);
                handleAuthStateChanged(user);
                await setDoc(doc(db, "users", user.uid), {
                    displayName,
                    email: user.email,
                });

                console.log("Verification email sent to:", user.email);
                // handle successful sign-up here, show success message and redirect to home page
                alert("Verification email sent! Please verify your email address to complete registration.");
                location.href = "/";
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
            accountType,
            handleSignUp,
        };
    },
};
</script>
