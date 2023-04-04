<!-- Footer.vue -->
<template>
    <footer class="navbar-light bg-transparent py-3 mt-auto">
        <div class="container">
            <div class="row">
                <div class="col d-flex justify-content-center">
                    <ul class="list-unstyled d-flex mb-0">
                        <li class="me-3">
                            <router-link class="text-decoration-none" to="/">Home</router-link>
                        </li>
                        <li class="me-3">
                            <router-link class="text-decoration-none" to="/about">About</router-link>
                        </li>
                        <li class="me-3">
                            <router-link class="text-decoration-none" to="/resources">Resources</router-link>
                        </li>
                        <li>
                            <a class="text-decoration-none" href="#contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col text-center">
                    <p class="mb-0">
                        &copy; {{ new Date().getFullYear() }} SafeHeads. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>
  
<script>
export default {
    name: 'Footer',
};
</script>
  
  