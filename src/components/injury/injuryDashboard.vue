<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Injury Dashboard</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link to="/add" class="nav-link btn btn-primary">
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
            <h1>Dashboard</h1>
            <hr>
            <h2>My Incidents</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Injury Details</th>
                        <th>Recovery Progress</th>
                        <th>Return to Play</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="incident in incidents" :key="incident.id">
                        <td>{{ formatDate(incident.injury_date) }}</td>
                        <td>{{ incident.injury_details }}</td>
                        <td>{{ incident.recovery_progress }}</td>
                        <td>{{ incident.rtp ? 'Yes' : 'No' }}</td>

                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";


export default {
    data() {
        return {
            incidents: [],
        };
    },
    async created() {
        const user = auth.currentUser;

        if (user) {
            // Get the incidents for the current user
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                this.incidents = userData.incidents || [];

                // Get all head injuries from the "headinjury" collection for the current user
                const userHeadInjuries = await getHeadInjuriesByUser(user.uid);

                // Add the user's head injuries to the incidents array
                this.incidents.push(...userHeadInjuries);
            }
        }
    },

    methods: {
        formatDate(date) {
            // Format date as 'dd-mm-yyyy'
            const formattedDate = new Date(date.seconds * 1000).toLocaleDateString(
                "en-GB"
            );
            return formattedDate;
        },
        formatTime(time) {
            // Format time as 'HH:MM'
            const formattedTime = new Date(time.seconds * 1000).toLocaleTimeString(
                "en-US",
                { hour12: false, hour: "numeric", minute: "numeric" }
            );
            return formattedTime;
        },
    },
};
</script>
  
