<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Sign Up</h1>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form @submit.prevent="submitForm">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" v-model="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" v-model="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" v-model="password" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Sign Up</button>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>


export default {
    data() {
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        submitForm() {
            // Handle form submission
        }
    }
}
</script>
  