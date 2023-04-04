<template>
    <Header></Header>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Profile</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <button class="btn btn-primary">
                                <router-link to="/dashboard" class="nav-link text-white">
                                    Dashboard
                                </router-link>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" class="form-control" id="name" v-model="displayName" :disabled="!isEditing">
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" class="form-control" id="email" v-model="email" disabled>
        </div>
        <div class="form-group">
            <label for="dob">Date of Birth:</label>
            <input type="date" class="form-control" id="dob" v-model="dob" :disabled="!isEditing">
        </div>
        <div class="form-group">
            <label for="contact">Contact telephone number:</label>
            <input type="tel" class="form-control" id="contact" v-model="contact" :disabled="!isEditing">
        </div>
        <div class="form-group">
            <label for="address">Address:</label>
            <textarea class="form-control" id="address" rows="3" v-model="address" :disabled="!isEditing"></textarea>
        </div>
        <div class="form-group">
            <label for="clubs">Region:</label>
            <input type="text" class="form-control" id="region" v-model="region" :disabled="!isEditing">
        </div>
        <div class="form-group">
            <label for="position">Postcode:</label>
            <input type="text" class="form-control" id="postcode" v-model="postcode" :disabled="!isEditing">
        </div>
        <button type="button" class="btn btn-primary" @click="startEditing" v-if="!isEditing">Edit Profile</button>
        <button type="button" class="btn btn-primary" @click="saveProfile" v-if="isEditing">Save Profile</button>
    </div>
</template>
  
<script>
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import Header from "@/components/Header.vue";

export default {
    components: {
        Header
    },
    data() {
        return {
            displayName: "",
            email: "",
            dob: "",
            contact: "",
            address: "",
            region: "",
            postcode: "",
            isEditing: false,
        };
    },
    async created() {
        try {
            const docRef = doc(db, "user", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const {
                    displayName,
                    email,
                    dob,
                    contact,
                    address,
                    region,
                    postcode,
                } = docSnap.data();
                this.displayName = displayName;
                this.email = email;
                this.dob = dob;
                this.contact = contact;
                this.address = address;
                this.region = region;
                this.postcode = postcode;
            }
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        startEditing() {
            this.isEditing = true;
        },
        async saveProfile() {
            try {
                const docRef = doc(db, "users", auth.currentUser.uid);
                await updateDoc(docRef, {
                    displayName: this.displayName
                });
                this.isEditing = false; // set isEditing back to false
            } catch (error) {
                console.error(error)
            }
        }

    }
}
</script>  