<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Dashboard</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <button class="btn btn-primary">
                                <router-link to="/profile" class="nav-link text-white">
                                    Profile
                                </router-link>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="container mt-4">
            <div class="row">
                <div class="col-md-6">
                    <h3>Head Injury Summary</h3>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Symptoms</th>
                                <th>Summary</th>
                                <th>Follow-up</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="incident in incidents" :key="incident.id">
                                <td>{{ incident.date }}</td>
                                <td>{{ incident.symptoms }}</td>
                                <td>{{ incident.summary }}</td>
                                <td>
                                    <!-- Use a computed property to determine the follow-up text -->
                                    {{ followUpText(incident) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-6">
                    <h3>Add New Head Injury Incident</h3>
                    <form @submit.prevent="addIncident">
                        <div class="form-group">
                            <label for="date">Date:</label>
                            <input type="date" class="form-control" id="date" v-model="newIncident.date" />
                        </div>
                        <div class="form-group">
                            <label for="symptoms">Symptoms:</label>
                            <input type="text" class="form-control" id="symptoms" v-model="newIncident.symptoms" />
                        </div>
                        <div class="form-group">
                            <label for="summary">Summary:</label>
                            <input type="text" class="form-control" id="summary" v-model="newIncident.summary" />
                        </div>
                        <div class="form-group">
                            <label for="followup">Follow-up:</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="followupRequired"
                                    id="followupRequiredYes" value="true" v-model="newIncident.followup_required" />
                                <label class="form-check-label" for="followupRequiredYes">
                                    Required
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="followupRequired" id="followupRequiredNo"
                                    value="false" v-model="newIncident.followup_required" />
                                <label class="form-check-label" for="followupRequiredNo">
                                    Not Required
                                </label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Add Incident</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";

export default {
    data() {
        return {
            incidents: [],
            newIncident: {
                date: "",
                symptoms: "",
                summary: "",
                followup: "",
                noFollowUp: false, // new property added for no follow-up required option
            },
        };
    },
    async created() {
        try {
            const docRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const { incidents } = docSnap.data();
                const incidentsPromises = incidents.map(async (incidentId) => {
                    const incidentDocRef = doc(db, "incidents", incidentId);
                    const incidentDocSnap = await getDoc(incidentDocRef);
                    if (incidentDocSnap.exists()) {
                        const incident = incidentDocSnap.data();
                        incident.id = incidentDocSnap.id;
                        return incident;
                    } else {
                        console.error("No such incident document");
                    }
                });
                const incidentsData = await Promise.all(incidentsPromises);
                this.incidents = incidentsData;
            } else {
                console.error("No such user document");
            }
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        async addIncident() {
            try {
                const docRef = doc(db, "users", auth.currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const { incidents } = docSnap.data();
                    const newIncidentRef = await addDoc(collection(db, "incidents"), {
                        date: this.newIncident.date,
                        symptoms: this.newIncident.symptoms,
                        summary: this.newIncident.summary,
                        followup: this.newIncident.noFollowUp ? "No follow-up required" : this.newIncident.followup,
                        // if noFollowUp is true, set follow-up to "No follow-up required", else set it to the date selected by the user
                    });
                    incidents.push(newIncidentRef.id);
                    await updateDoc(docRef, { incidents });
                    this.newIncident = {
                        date: "",
                        symptoms: "",
                        summary: "",
                        followup: "",
                        noFollowUp: false,
                    };
                } else {
                    console.error("No such user document");
                }
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>

  