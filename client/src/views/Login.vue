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
            <input type="email" name="email" v-model="email" id="email" required placeholder="Email" class="inp">
        </div>
        <div class="input-container">
            <div class="icon-container">
                <Icon icon="ri:lock-line" />
            </div>
            <input type="password" name="password" v-model="password" id="password" required placeholder="Password" class="inp">
        </div>
        <div class="input-container left-aligned">
            <p>Don't have an account? <router-link to="/register">Sign up</router-link></p>
        </div>
        <div class="input-container">
            <button type="submit" class="btn btn-p">Log In</button>
        </div>
    </form>
</section>
<Footer />
</template>

<script>
import { Icon } from '@iconify/vue';
import Footer from '../components/Footer.vue';
import api from '../api/api';

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
        }
    },
    methods: {
        async login(){
            if(!this.email || !this.$.password){
                return;
            }
            try{
                const res = await api.post("/api/v1/auth/login",{
                    password: this.password,
                    email: this.email,
                }, {
                    withCredentials: true,
                });
                if(res.data.error){
                    alert(res.data.error);
                }
                localStorage.setItem('token', res.data.token);
                this.$router.push('/');
            }catch(err){
                console.log(err);
                alert("Log in failed!");
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