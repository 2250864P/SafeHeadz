<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Login</div>

                    <div class="card-body">
                        <form @submit.prevent="login">
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email" class="form-control" id="email" v-model="email" required>
                            </div>

                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" v-model="password" required>
                            </div>

                            <div v-if="errorMessage" class="alert alert-danger" role="alert">
                                {{ errorMessage }}
                            </div>

                            <button type="submit" class="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { auth } from "@/firebase/firebase";

export default {
    setup() {
        const email = ref('')
        const password = ref('')
        const errorMessage = ref(null)
        const router = useRouter()

        const login = async () => {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
                // Redirect to the homepage or the user's profile page upon successful login
                router.push('/')
            } catch (error) {
                errorMessage.value = error.message
            }
        }

        return {
            email,
            password,
            errorMessage,
            login
        }
    }

}
</script>