<template>
    <div class="d-flex align-items-center justify-content-center" style="height: 100vh;">
        <div class="container">
            <div class="card">
                <div class="card-header">
                    Please select your account type
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="accountType">Account Type</label>
                        <select id="accountType" class="form-control" v-model="selectedAccountType">
                            <option value="" disabled>Select...</option>
                            <option value="athlete">Athlete</option>
                            <option value="team-staff">Team Staff</option>
                            <option value="medical-staff">Medical Staff</option>
                        </select>
                    </div>
                    <div v-if="selectedAccountType === 'medical-staff'">
                        <div class="form-group">
                            <label for="referenceNumber">Reference Number</label>
                            <input type="text" id="referenceNumber" class="form-control" v-model="referenceNumber"
                                @blur="verifyReferenceNumber" />
                            <span v-if="referenceNumberError" class="text-danger">{{ referenceNumberError }}</span>
                        </div>
                        <button class="btn btn-primary" :disabled="!referenceNumberValid || isVerifying"
                            @click="proceedToSignUpPage">
                            Proceed
                        </button>
                    </div>
                    <button v-else class="btn btn-primary" :disabled="selectedAccountType === ''"
                        @click="proceedToSignUpPage">
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import { db } from '@/firebase/firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'vue-router';

export default {
    name: 'AccountTypeSelector',
    setup() {
        const selectedAccountType = ref('');
        const router = useRouter();
        const referenceNumber = ref('');
        const referenceNumberError = ref(null);
        const isVerifying = ref(false);
        const referenceNumberValid = ref(false);

        const verifyReferenceNumber = async () => {
            isVerifying.value = true;
            referenceNumberError.value = null;

            try {
                const q = query(collection(db, 'referenceNumbers'), where('refnumber', '==', referenceNumber.value));
                const refNumSnapshot = await getDocs(q);
                if (refNumSnapshot.docs.length > 0) {
                    // Reference number is valid
                    referenceNumberValid.value = true;
                    proceedToSignUpPage();
                } else {
                    // Reference number is invalid
                    referenceNumberValid.value = false;
                    referenceNumberError.value = 'Invalid reference number';
                }
            } catch (error) {
                console.error(error);
                referenceNumberError.value = 'An error occurred while verifying the reference number';
            } finally {
                isVerifying.value = false;
            }
        };

        const proceedToSignUpPage = () => {
            router.push({ name: 'SignUp', query: { accountType: selectedAccountType.value } });
        };


        return {
            selectedAccountType,
            referenceNumber,
            referenceNumberError,
            isVerifying,
            referenceNumberValid,
            verifyReferenceNumber,
            proceedToSignUpPage,
        };
    },
};
</script>


  