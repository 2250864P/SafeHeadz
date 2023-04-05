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
            <label for="forename">Forename:</label>
            <input type="text" class="form-control" id="forename" v-model="fullName.forename" :disabled="!isEditing">
        </div>
        <div class="form-group">
            <label for="surname">Surname:</label>
            <input type="text" class="form-control" id="surname" v-model="fullName.surname" :disabled="!isEditing">
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
            <input type="tel" class="form-control" id="contact" v-model="phoneNumber" :disabled="!isEditing">
        </div>
        <div class="form-group">
            <label for="address1">Address Line 1:</label>
            <input type="text" class="form-control" id="address1" v-model="address1" :disabled="!isEditing">
        </div>
        <div class="form-group">
            <label for="address2">Address Line 2:</label>
            <input type="text" class="form-control" id="address2" v-model="address2" :disabled="!isEditing">
        </div>
        <div class="form-group">
            <label for="city">City:</label>
            <input type="text" class="form-control" id="city" v-model="city" :disabled="!isEditing">
        </div>
        <div class="form-group">
            <label for="region">Region:</label>
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
import { createUserAddress } from "@/firebase/firestoreCollections";

export default {
    components: {
        Header
    },
    data() {
        return {
            fullName: {
                forename: '',
                surname: '',
            },
            email: "",
            dob: "",
            address1: "",
            address2: "",
            city: "",
            region: "",
            postcode: "",
            phoneNumber: "",
            isEditing: false,
        };
    },


    async created() {
        try {
            const docRef = doc(db, "user", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const {
                    fullName,
                    email,
                    dob,
                    address1,
                    address2,
                    city,
                    region,
                    postcode,
                    phoneNumber,
                } = docSnap.data();
                this.fullName = fullName;
                this.email = email;
                this.dob = dob;
                this.address1 = address1;
                this.address2 = address2;
                this.city = city;
                this.region = region;
                this.postcode = postcode;
                this.phoneNumber = phoneNumber;
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
                const docRef = doc(db, "user", auth.currentUser.uid);
                await updateDoc(docRef, {
                    fullName: this.fullName,
                    dob: this.dob,
                });
                await createUserAddress(
                    auth.currentUser.uid,
                    this.address1,
                    this.address2,
                    this.city,
                    this.region,
                    this.postcode,
                    this.phoneNumber,

                );

                this.isEditing = false; // set isEditing back to false
            } catch (error) {
                console.error(error)
            }
        }

    }
}
</script>  