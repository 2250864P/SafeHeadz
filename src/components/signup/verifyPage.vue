<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Verification Pending</h1>
        <div class="row justify-content-center">
            <div class="col-md-6 text-center">
                <p>
                    A verification email has been sent to your email address. Please check
                    your inbox and click on the verification link to complete the
                    registration process.
                </p>
                <p>Once you have done this, please click the button below</p>
                <p>If you don't receive the email, please check your spam folder.</p>
                <router-link to="/" class="btn btn-primary btn-lg">
                    Welcome
                </router-link>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "VerificationPending",
};
</script>
  