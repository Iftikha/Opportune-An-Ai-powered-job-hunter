<template>
<section>
    <div class="createProfileForm" v-if="newProfile">
        <h1>This is new profile</h1>
    </div>
</section>
</template>

<script>
import axios from 'axios';

export default {
    props: ['id'],
    name: "Profile",
    data(){
        return {
            profileFound: {},
            newProfile: false,
        }
    },
    async created(){
        await this.getCurrentUserInfo();
        await this.getProfileInfo();
    },
    methods:{
        async getCurrentUserInfo(){
            await axios.get(`https://opportuneaipoweredbackend.vercel.app/api/v1/me`,{
                withCredentials: true,
            })
                .then( res => {
                    console.log(res.data);
                })
                .catch( err => {
                    console.log(err.response);
                })
        },

        async getProfileInfo(){
            await axios.get(`https://opportuneaipoweredbackend.vercel.app/api/v1/profile/${this.id}`,{
                withCredentials: true,
            })
                .then(res => {
                    this.profileFound = res.data.profile;
                })
                .catch( err => {
                    if(err.response && err.response.data && err.response.data.message){
                        this.profileFound = { 
                            status: err.response.data.status,
                            message: err.response.data.message
                        }
                    }
                })
        },
        checkIfProfileExists(){
            if(this.profileFound.status && this.profileFound.status === 404){
                this.newProfile = true;
            }
        }
    }
}

</script>

<style scoped>

</style>