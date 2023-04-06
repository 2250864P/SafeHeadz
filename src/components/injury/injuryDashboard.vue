<template>
    <Header></Header>

    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Injury Dashboard</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link to="/add" class="nav-link btn btn-outline-primary">
                                Add Concussion Incident
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/profile" class="nav-link btn btn-outline-primary">
                                Profile
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="container">
            <h1>My Incidents</h1>
            <div class="overflow-auto" style="max-height: 200px;">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time of Injury</th>
                            <th>Symptoms</th>
                            <th>HIA Result</th>
                            <th>Next Assessment</th>
                            <th>Injury Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="incident in incidents" :key="incident.id">
                            <td>{{ formatDate(incident.date) }}</td>
                            <td>{{ formatTime(incident.time) }}</td>
                            <td>{{ incident.symptoms }}</td>
                            <td>{{ incident.hia_result }}</td>
                            <td>{{ formatDate(incident.follow_up_date) }}</td>
                            <td>{{ incident.details }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import {
    getAthleteIdByUserId,
    getMedicalStaffIdByUserId,
    getHeadInjuriesByAthlete,
    getHeadInjuriesByMedicalStaff,
} from "@/firebase/firestoreInjuries";
import { auth } from "@/firebase/firebase";
import Header from "@/components/Header.vue";


export default {
    components: {
        Header
    },

    data() {
        return {
            incidents: [],
        };
    },
    async created() {
        const user = auth.currentUser;

        if (user) {
            // Check if the user is a medical staff or an athlete
            const medicalStaffId = await getMedicalStaffIdByUserId(user.uid);

            if (medicalStaffId) {
                // If the user is a medical staff, fetch incidents by medicalStaffId
                this.incidents = await getHeadInjuriesByMedicalStaff(medicalStaffId);
            } else {
                // If the user is an athlete, fetch incidents by athleteId
                const athleteId = await getAthleteIdByUserId(user.uid);
                this.incidents = await getHeadInjuriesByAthlete(athleteId);
            }
        }
    },

    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);

            // Format date as 'dd-mm-yyyy'
            const formattedDate = date.toLocaleDateString("en-GB");
            return formattedDate;
        },
        formatTime(timeString) {
            const [hours, minutes] = timeString.split(':');
            const time = new Date(0, 0, 0, hours, minutes);

            // Format time as 'HH:MM'
            const formattedTime = new Intl.DateTimeFormat('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).format(time);

            return formattedTime;
        },
    },
};
</script>
  
