<template>
<section class="formPage">
    <div class="logo-container">
        <img class="logo" src="../assets/Opportune.png" alt="Opportune Logo">
        <h1 class="logoSpec">Opportune</h1>
    </div>
    <form class="formContainer" method="post" @submit.prevent="login">
        <div class="head">
            <h1>Welcome Back</h1>
            <p class="muted-sm">Sign in to your account to continue your job search</p>
        </div>
        <div class="input-container">
            <div class="icon-container">
                <Icon icon="ri:threads-line" />
            </div>
            <input type="email" v-model="email" name="email" id="email" required placeholder="Email" class="inp">
        </div>
        <div class="input-container">
            <div class="icon-container">
                <Icon icon="ri:lock-line" />
            </div>
            <input type="password" v-model="password"  name="password" id="password" required placeholder="Password" :class="['inp', { error : showError}]">
        </div>
        <p class="error-msg" v-if="showError">{{ errorMessage }}</p>
        <div class="input-container left-aligned">
            <p>Don't have an account? <router-link to="/register">Sign up</router-link></p>
        </div>
        <div class="input-container">
            <button type="submit" class="btn btn-p" :disabled="loading">{{ loading ? "Logging In..." : "Log In" }}</button>
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
    name: "LogIn",
    components:{
        Icon,
        Footer,
    },
    data(){
        return{
            email: "",
            password: "",
            loading: false,
            showError: false,
            errorMessage: "",
        }
    },
    methods: {
        async login(){
            if(!this.email || !this.password){
                return;
            }
            console.log(this.email, this.password);
            this.loading = true;
            try{
                const res = await axios.post("https://opportuneaipoweredbackend.vercel.app/api/v1/auth/login",{
                    password: this.password,
                    email: this.email,
                }, {
                    withCredentials: true,
                });
                localStorage.setItem('token', res.data.token);
                const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString(); // 7 days expiry
                document.cookie = `token=${res.data.token}; expires=${expires}; path=/;`;
                this.$router.push('/');
                this.loading= false;
            }catch(err){
                if(err.response && err.response.data && err.response.data.error){
                    this.showError = true;
                    this.errorMessage = err.response.data.error;
                }else{
                    this.errorMessage = "Log in failed! Please try again!";
                }
                this.loading = false;
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
.logoSpec{
    font-size: 3rem;
}
.inp:focus{
    border: 1px solid #00A651;
}
.selector{
    width: 176px;
}
.error-msg{
    font-size: 0.75rem;
    color: red;
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
.error{
    border: 1px solid red;
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
    height: 120vh;
    background-image: url(../assets/signup-bg.svg);
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    /* padding: 80px; */
    padding-bottom: 80px;
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