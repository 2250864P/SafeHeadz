<!--User selects account type before signing up for account-->
<template>
    <div class="d-flex align-items-center justify-content-center" style="height: 100vh;">
        <div class="container">
            <div class="card">
                <div class="card-header">
                    Please select your account type
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <!--each account type has different permisions-->
                        <label for="accountType">Account Type</label>
                        <select id="accountType" class="form-control" v-model="selectedAccountType">
                            <option value="" disabled>Select...</option>
                            <option value="athlete">Athlete</option>
                            <option value="team-staff">Team Staff</option>
                            <option value="medical-staff">Medical Staff</option>
                        </select>
                    </div>
                    <button class="btn btn-primary" :disabled="selectedAccountType === ''" @click="proceedToSignUpPage">
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'AccountTypeSelector',
    data() {
        return {
            selectedAccountType: ''
        }
    },
    methods: {
        proceedToSignUpPage() {
            this.$router.push({ name: 'SignUp', query: { accountType: this.selectedAccountType } })
        }
    }
}
</script>
  