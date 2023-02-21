<!-- Created separate foot compoent that can be imported into each page -->
<template>
    <footer class="mx-auto bg-green text-muted">
        <div class="container-fluid">
            <ul class="nav justify-content-center text-muted ">
                <li class="nav-item active">
                    <a class="nav-link text-muted" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-muted" href="#">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-muted" href="#">Resources</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-muted" href="#">Contact</a>
                </li>
            </ul>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
footer {
    position: absolute;
    bottom: 0;
}
</style>


  