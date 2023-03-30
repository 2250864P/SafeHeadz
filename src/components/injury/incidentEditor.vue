<template>
    <div class="container">
        <h1>Add Concussion Incident</h1>
        <form @submit.prevent="addIncident">
            <div class="form-group">
                <label for="athlete">Athlete:</label>
                <input type="text" class="form-control" id="athlete" v-model="searchQuery" />
                <ul>
                    <li v-for="athlete in filteredAthletes" :key="athlete.id" @click="selectAthlete(athlete)">
                        {{ athlete.name }} - {{ athlete.email }} - {{ athlete.role }}
                    </li>
                </ul>
            </div>
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
import { ref, computed } from 'vue';
import { collection, getDoc, getDocs } from 'firebase/firestore';


export default {
    setup() {
        // Define a reactive object to hold the form data
        const newIncident = ref({
            date: '',
            time: '',
            symptoms: '',
            hia_result: '',
            follow_up_date: '',
            details: ''
        });

        // Define a reactive variable to track whether follow-up is required
        const followUpRequired = ref(false);

        // Define a reactive variable to hold the selected athlete
        const selectedAthlete = ref(null);

        // Get the list of athletes from Firestore
        const athletes = ref([]);
        const getAthletes = async () => {
            const querySnapshot = await getDocs(collection(db,"athletes"));
            athletes.value = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
        };
        getAthletes();

        // Define a computed property to filter the athletes based on the search query
        const searchQuery = ref('');
        const filteredAthletes = computed(() => {
            return athletes.value.filter((athlete) => {
                // Check if the athlete's name, email, or role contains the search query
                return (
                    athlete.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                    athlete.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                    athlete.role.toLowerCase().includes(searchQuery.value.toLowerCase())
                );
            });
        });

        // Define a function to select an athlete from the search results
        const selectAthlete = (athlete) => {
            // Set the selected athlete
            selectedAthlete.value = athlete;

            // Clear the search query
            searchQuery.value = '';
        };

        // Define a function to validate the form data
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
            if (followUpRequired.value && newIncident.value.hia_result === 'fail') {
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
                follow_up_date: followUpRequired.value ? newIncident.value.follow_up_date : null,
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

        const formData = {};
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
  
  
  
