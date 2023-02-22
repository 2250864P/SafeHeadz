<template>
    <nav class="navbar navbar-fluid navbar-expand-lg navbar-light bg-transparent w-100">
        <a class="navbar-brand" href="#">SafeHeadz</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Resources</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Contact</a>
                </li>
            </ul>

            <div class="ml-auto" id="navbarLog">
                <ul class="nav">
                    <li class="nav-item">
                        <router-link to="/account-type" class="nav-link btn btn-outline-primary mr-2">Sign Up</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn btn-outline-primary" href="#">Login</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="d-flex align-items-center justify-content-center" style="height: 100vh;">
        <div class="jumbotron jumbotron-fluid text-center">
            <div class="container-fluid">
                <h1 class="display-4">Empowering athletes, team staff and governing bodies to tackle concussions</h1>
                <router-link to="/account-type" class="btn btn-primary btn-lg">Sign Up Now</router-link>
            </div>
        </div>
    </div>
</template>

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


<script>
import PageBackground from '@/components/PageBackground.vue'

export default {
    name: 'HomePage',
    components: {
        PageBackground
    }
}
</script>