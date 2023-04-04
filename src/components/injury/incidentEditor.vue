<template>
    <div class="container">
        <h1>Add Concussion Incident</h1>
        <form @submit.prevent="addIncidentHandler">
            <div class="form-group">
                <label for="athlete">Select Athlete:</label>
                <select v-model="selectedAthlete">
                    <option disabled value="">Please select an athlete</option>
                    <option v-for="athlete in athleteList" :key="athlete.id" :value="athlete.id">
                        {{ athlete.name }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="date">Date:</label>
                <input type="date" class="form-control" id="date" name="date" v-model="newIncident.date" required />
            </div>
            <div class="form-group">
                <label for="time">Time of Injury:</label>
                <input type="time" class="form-control" id="time" name="time" v-model="newIncident.time" required />
            </div>
            <div class="form-group">
                <label for="symptoms">Symptoms:</label>
                <input type="text" class="form-control" id="symptoms" name="symptoms" v-model="newIncident.symptoms"
                    required />
            </div>
            <div class="form-group">
                <label for="hia_result">HIA Result:</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="hia_pass" name="hia_result" value="pass"
                        v-model="newIncident.hia_result" />
                    <label class="form-check-label" for="hia_pass">Pass</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="hia_fail" name="hia_result" value="fail"
                        v-model="newIncident.hia_result" />
                    <label class="form-check-label" for="hia_fail">Fail</label>
                </div>
            </div>
            <div class="form-group" v-if="newIncident.hia_result === 'fail'">
                <label for="follow_up_date">Follow-up required date:</label>
                <input type="date" class="form-control" id="follow_up_date" name="follow_up_date"
                    v-model="newIncident.follow_up_date" required />
            </div>
            <div class="form-group">
                <label for="details">Details:</label>
                <textarea class="form-control" id="details" name="details" rows="3" v-model="newIncident.details"
                    required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Add Incident</button>
        </form>
    </div>
</template>
  

  
<script>
import { addIncident, getUsers, athleteList } from '@/firebase/firestoreIncidents';
import { ref } from 'vue';
import Header from "@/components/Header.vue";


export default {
    components: {
        Header
    },
    setup() {
        // Define a reactive object to hold the form data
        const newIncident = ref({
            date: '',
            time: '',
            symptoms: '',
            hia_result: 'pass',
            follow_up_date: '',
            details: ''
        });

        const users = getUsers();
        const selectedAthlete = ref("");

        const athleteListComputed = athleteList(users);

        // Define function to validate the form data
        const validateForm = () => {
            // Check if date and time are selected
            if (!newIncident.value.date || !newIncident.value.time) {
                alert('Please select a date and time.');
                return false;
            }

            // Check if symptoms are selected
            if (!newIncident.value.symptoms) {
                alert('Please select symptoms.');
                return false;
            }

            // Check if HIA result is selected
            if (!newIncident.value.hia_result) {
                alert('Please select HIA result.');
                return false;
            }

            // Check if details are entered
            if (!newIncident.value.details) {
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
            if (newIncident.value.hia_result === 'fail') {
                alert('Follow-up is required for failed HIA');
                return;
            }

            // Get the selected athlete's ID
            const athleteId = selectedAthlete.value.id;

            // Create a new incident object
            const incident = {
                athleteId,
                date: newIncident.value.date,
                time: newIncident.value.time,
                symptoms: newIncident.value.symptoms,
                hia_result: newIncident.value.hia_result,
                follow_up_date: newIncident.value.hia_result ? newIncident.value.follow_up_date : null,
                details: newIncident.value.details
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

        // Return the variables and functions for use in the template
        return {
            "newIncident": newIncident,
            validateForm,
            addIncidentHandler,
            athleteList: athleteListComputed,

        };
    },
}
</script>
  
  
  
