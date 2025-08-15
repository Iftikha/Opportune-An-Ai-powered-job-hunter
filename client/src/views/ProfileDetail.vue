<template>
<section>
    Profile Details page
</section>
</template>

<script>
import axios from 'axios';

export default {
    props: ['id'],
    name: "Profile",
    created(){
        this.getProfileInfo();
    },
    methods:{
        getProfileInfo(){
            axios.get(`https://opportuneaipoweredbackend.vercel.app/api/v1/profile/${this.id}`,{
                withCredentials: true,
            })
                .then(res => {
                    console.log(res);
                })
                .catch( err => {
                    console.log(err);
                })
        }
    }
}
</script>

<style scoped>

</style>