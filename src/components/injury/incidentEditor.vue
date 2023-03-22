<template>
    <div class="container">
        <h1>Add Head Injury Incident</h1>
        <form @submit.prevent="addIncident">
            <div class="form-group">
                <label for="date">Date:</label>
                <input type="date" class="form-control" id="date" v-model="newIncident.date" required />
            </div>
            <div class="form-group">
                <label for="time">Time of Injury:</label>
                <input type="time" class="form-control" id="time" v-model="newIncident.time" required />
            </div>
            <div class="form-group">
                <label for="symptoms">Symptoms:</label>
                <input type="text" class="form-control" id="symptoms" v-model="newIncident.symptoms" required />
            </div>
            <div class="form-group">
                <label for="hia_result">HIA Result:</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="hia_pass" value="pass"
                        v-model="newIncident.hia_result" />
                    <label class="form-check-label" for="hia_pass">Pass</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="hia_fail" value="fail" v-model="newIncident.hia_result"
                        @change="showFollowUpRequired" />
                    <label class="form-check-label" for="hia_fail">Fail</label>
                </div>
            </div>
            <div class="form-group" v-if="followUpRequired">
                <label for="follow_up_date">Follow-up required date:</label>
                <input type="date" class="form-control" id="follow_up_date" v-model="newIncident.follow_up_date" required />
            </div>
            <div class="form-group">
                <label for="details">Details:</label>
                <textarea class="form-control" id="details" rows="3" v-model="newIncident.details" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Add Incident</button>
        </form>
    </div>
</template>
  

  
<script>
import { addIncident } from '@/firebase/firestoreIncidents';
import { db, auth } from '@/firebase/firebase';
import { ref } from 'vue';

export default {
    setup() {
        // Define a reactive object to hold the form data
        const formData = ref({
            date: '',
            time: '',
            symptoms: '',
            hia_result: '',
            follow_up_date: '',
            details: ''
        });

        // Define a reactive variable to track whether follow-up is required
        const followUpRequired = ref(false);

        // Define a function to validate the form data
        const validateForm = () => {
            // Check if date and time are selected
            if (!formData.date || !formData.time) {
                alert('Please select a date and time.');
                return false;
            }

            // Check if symptoms are selected
            if (!formData.symptoms) {
                alert('Please select symptoms.');
                return false;
            }

            // Check if HIA result is selected
            if (!formData.hia_result) {
                alert('Please select HIA result.');
                return false;
            }

            // Check if details are entered
            if (!formData.details) {
                alert('Please enter incident details.');
                return false;
            }

            return true;
        };

        // Define a function to add the new incident to Firestore
        const addIncidentHandler = async () => {
            // Validate the form data
            if (!validateForm()) {
                return;
            }

            // Check if follow-up is required and HIA has failed
            if (followUpRequired.value && formData.hia_result === 'fail') {
                alert('Follow-up is required for failed HIA');
                return;
            }

            // Get the current user's ID
            const userId = auth.currentUser.uid;

            // Create a new incident object
            const incident = {
                userId,
                date: formData.date,
                time: formData.time,
                symptoms: formData.symptoms,
                hia_result: formData.hia_result,
                follow_up_date: followUpRequired.value ? formData.follow_up_date : null,
                details: formData.details
            };

            // Add the new incident to Firestore
            try {
                await addIncident(incident);
                alert('Incident added successfully!');
            } catch (error) {
                console.error(error);
                alert('Error adding incident');
            }
        };

        // Define a function to show or hide the follow-up date input
        const showFollowUpDate = () => {
            followUpRequired.value = formData.hia_result === 'fail';
        };

        // Return the variables and functions for use in the template
        return {
            formData,
            followUpRequired,
            addIncidentHandler,
            showFollowUpDate
        };
    }
};
</script>
  
