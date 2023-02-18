<template>
    <div class="bg-green">
        <div class="bg-transparent p-5">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">SafeHeadz</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mr-auto">
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

                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link btn btn-outline-primary mr-2" href="#">Sign Up</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link btn btn-outline-primary" href="#">Login</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div class="jumbotron jumbotron-fluid bg-green text-center">
                <div class="container">
                    <h1 class="display-4">Empowering athletes, team staff and governing bodies to tackle concussions</h1>
                    <a href="#" class="btn btn-primary btn-lg">Sign Up Now</a>
                </div>
            </div>

            <div class="mt-5 p-4 bg-green text-white text-center">
                <ul class="navbar-nav mr-auto">
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
            </div>
        </div>
    </div>
</template>
  
<style>
.jumbotron {
    margin-top: 60px;
}
</style>

<script>
import '@/assets/background_style.css';

export default {
    // Component options go here
}
</script>