<template>
    <Header></Header>
    <div class="container mt-3">
        <h1>About SafeHeads</h1>
        <p>
            SafeHeads is a user-friendly concussion management web application that helps individuals and medical
            professionals track symptoms and monitor recovery progress so that an athlete can return to action safely.
            With a secure documentation feature, athletes can protect their long-term health and medical professionals
            can access the information they need to provide appropriate care.
        </p>
        <h2>What is a concussion?</h2>
        <p>
            A concussion is a type of mild traumatic brain injury (mTBI) caused by a blow to the head or body that
            disrupts the normal functioning of the brain. It can cause a wide range of physical, cognitive, and emotional
            symptoms that may last for days, weeks, or even months.
        </p>
        <h2>Common symptoms of a concussion</h2>
        <ul>
            <li>Headache or a feeling of pressure in the head</li>
            <li>Nausea or vomiting</li>
            <li>Dizziness or loss of balance</li>
            <li>Blurred vision or sensitivity to light</li>
            <li>Confusion or difficulty concentrating</li>
            <li>Memory loss or amnesia</li>
            <li>Mood changes, such as irritability or depression</li>
        </ul>
        <h2>EMERGENCY INFORMATION</h2>
        <p>
            It is important to take concussions seriously, as they can have serious and potentially life-threatening
            consequences if not treated promptly and appropriately. If you or someone you know experiences symptoms of a
            concussion, seek medical attention immediately. Delaying treatment can lead to long-term consequences and put
            your health at risk.
        <h3>Contact:</h3>
        <ul>
            <li>999 in a life threatening scenario</li>
            <li>If you need medical help fast, but it's not an emergency, use NHS 111 Online first or call 111</li>
        </ul>
        </p>
    </div>
</template>
  
<script>
import PageBackground from "@/components/PageBackground.vue";
import Header from "@/components/Header.vue";

export default {
    name: "AboutPage",
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