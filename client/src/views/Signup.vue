<template>
<section class="formPage">
    <div class="logo-container">
        <img class="logo" src="../assets/Opportune.png" alt="Opportune Logo">
        <h1 class="logoSpec">Opportune</h1>
    </div>
    <form class="formContainer" method="post" @submit.prevent="register">
        <div class="head">
            <h1>Create Your Account</h1>
            <p class="muted-sm">Join <span class="highlight">Opportune</span> and discover your perfect career opportunities.</p>
        </div>
        <div class="input-container">
            <div class="icon-container">
                <Icon icon="ri:user-6-line" />
            </div>
            <input type="text" v-model="name" name="name" id="name" required placeholder="Name" class="inp">
        </div>
        <div class="input-container">
            <div class="icon-container">
                <Icon icon="ri:threads-line" />
            </div>
            <input type="email" name="email" v-model="email" id="email" required placeholder="Email" class="inp">
        </div>
        <div class="input-container">
            <div class="icon-container">
                <Icon icon="ri:lock-line" />
            </div>
            <input type="password" name="password" v-model="password" id="password" required placeholder="Password" class="inp">
        </div>
        <div class="input-container">
            <div class="icon-container">
                <Icon icon="ri:lock-line" />
            </div>
            <input type="password" name="cconfirmPassword" v-model="confirmPassword" id="confirmPassword" required placeholder="Confirm Password" :class="['inp', { showError: showPassError}]">
        </div>
        <div class="inp-div">
            <div class="input-container">
                <div class="icon-container">
                    <Icon icon="ri:group-3-line" />
                </div>
                <select class="inp selector" name="accountType" v-model="accountType" id="accountType">
                    <option value="" selected disabled>role</option>
                    <option value="employee" >Job Seeker</option>
                    <option value="employeer">Employer</option>
                </select>
            </div>
            <div class="input-container">
                <div class="icon-container">
                    <Icon icon="mdi:human-male-female" />
                </div>
                <select class="inp selector" name="gender" v-model="gender" id="gender">
                    <option value="" selected disabled>Gender</option>
                    <option value="Male" >Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
        </div>
        <div class="input-container left-aligned">
            <input type="checkbox" name="checkbox" id="checkbox" class="checkbox" required>
            <p>I agree to the <span class="highlight-xsm">terms of services</span> and <span class="highlight-xsm">privacy policy</span>.</p>
        </div>
        <div class="input-container left-aligned">
            <p>Already have an account? <router-link to="/login">Log in</router-link></p>
        </div>
        <div class="input-container">
            <button class="btn btn-p" @click="register">Sign Up</button>
        </div>
    </form>
</section>
<Footer />
</template>

<script>
import { Icon } from '@iconify/vue';
import Footer from '../components/Footer.vue';
import axios from 'axios';

export default{
    name: "SignUp",
    components:{
        Icon,
        Footer,
    },
    data(){
        return {
            email: "",
            password: "",
            name: "",
            confirmPassword: "",
            accountType: "",
            gender: "",
            showPassError: false,
        }
    },
    methods: {
        async register(){
            if(!this.email || !this.password || !this.confirmPassword || !this.gender || !this.name || !this.accountType){
                return;
            }
            if(this.confirmPassword !== this.password){
                this.showPassError = true;
                return;
            }
            try {
                const res = await axios.post("http://localhost:3000/api/v1/auth/register", {
                    email: this.email,
                    password: this.password,
                    confirmPassword: this.confirmPassword,
                    gender: this.gender,
                    name: this.name,
                    accountType: this.accountType,
                },{
                    withCredentials: true,
                });
                localStorage.setItem('token', res.data.token);
                console.log("Success");
                alert("Signup Successful");
                this.$router.push('/');
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>

<style scoped>
.inp{
    padding: 8px 16px 8px 32px;
    border-radius: 8px;
    border: 1px solid #bebebe;
    font-size: 1rem;
    width: 368px;
    outline: none;
    transition: all 0.2s ease;
}
.logo{
    width: 50px;
    height: 50px;
}
.logo-container{
    display: flex;
    align-items: center;
    padding: 24px;
    margin: 24px;
    gap: 8px;
}
.head{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 16px;
    padding: 8px;
}
.showError{
    border: 1px solid red;
}
.logoSpec{
    font-size: 3rem;
}
.inp:focus{
    border: 1px solid #00A651;
}
.selector{
    width: 176px;
}
.btn-p{
    width: 100%;
}
.input-container{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
.left-aligned{
    justify-content: start;
    gap: 8px;
}
.checkbox{
    background-color: green;
}
.icon-container{
    position: absolute;
    left: 8px;
    top: 8px
}
.formContainer{
    width: 400px;
    padding: 32px 16px;
    text-align: center;
    display: flex;
    /* justify-content: center;
    align-items: center; */
    flex-direction: column;
    gap: 16px;
    background-color: white;
    border-radius: 16px;
    box-shadow: 1px 1px 5px #ededed;
    border: 1px solid #bebebe;
}
.inp-div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
}
.formPage{
    width: 100%;
    /* height: 100vh; */
    background-image: url(../assets/signup-bg.svg);
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 80px;
}
p{
    font-size: 0.8rem;
}
a{
    font-size: 0.8rem;
    color: black;
    text-decoration: none;
    transition: all 0.4s ease;
}
a:hover{
    color: #00A651;
}
</style>