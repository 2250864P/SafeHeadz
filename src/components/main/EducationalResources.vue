<template>
    <Header></Header>
    <div class="container mt-3">
        <h1>Educational Resources</h1>
        <p>
            Here are some helpful resources to learn more about concussions and concussion management.
        </p>
        <h2>UK Resources</h2>
        <ul>
            <li><a href="https://www.nhs.uk/conditions/concussion/" target="_blank">NHS - Concussion</a></li>
            <li><a href="https://www.sportengland.org/" target="_blank">Sport England</a></li>
            <li><a href="https://www.headway.org.uk/" target="_blank">Headway UK</a></li>
            <li><a href="https://www.braininjuryhub.co.uk/" target="_blank">Brain Injury Hub</a></li>
        </ul>
        <h2>Other Resources</h2>
        <ul>
            <li><a href="https://www.cdc.gov/headsup/index.html" target="_blank">Centers for Disease Control and Prevention
                    (CDC) - Heads Up</a></li>
            <li><a href="https://www.concussionfoundation.org/" target="_blank">Concussion Legacy Foundation</a></li>
            <li><a href="https://www.brainline.org/" target="_blank">BrainLine</a></li>
            <li><a href="https://www.mayoclinic.org/diseases-conditions/concussion/diagnosis-treatment/drc-20355610"
                    target="_blank">Mayo Clinic - Concussion</a></li>
        </ul>
    </div>
</template>
  
<script>
import PageBackground from "@/components/PageBackground.vue";
import Header from "@/components/Header.vue";

export default {
    name: "EducationalResources",
    components: {
        PageBackground,
        Header
    },
};
</script>


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
  