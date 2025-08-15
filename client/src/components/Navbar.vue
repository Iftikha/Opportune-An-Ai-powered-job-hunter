<template>
    <nav class="navbar desktop">
        <div class="left">
            <router-link to="/" class="left-logo-container" @click="index = 0" >
                <img class="logo" src="../assets/Opportune.png" alt="Opportune Logo">
                <h1 class="logoSpec">Opportune</h1>
            </router-link>
        </div>
        <div class="center">
            <ul class="nav-links">
                <li class="nav-link">
                    <router-link to="/jobs" :class="index == 1? 'active' : 'inactive'" @click="index = 1"><Icon icon="mingcute:briefcase-2-line" />Jobs</router-link>
                </li>
                <li class="nav-link">
                    <router-link to="/ai/recommended" :class="{'active': index == 2}" @click="index = 2"><Icon  icon="ri:gemini-line" />Ai Recommendation</router-link>
                </li>
            </ul>
        </div>
        <div class="right" v-if="!isloggedIn">
            <router-link to="/login"><button class="btn btn-s">Sign in</button></router-link>
            <router-link to="/register"><button class="btn btn-p">Get started</button></router-link>
        </div>
        <div class="right">
            <router-link class="img-cont" :to="`/users/profile/${userId}`">
                <img src="../assets/Opportune.png" class="img-profile" alt="">
            </router-link>
        </div>
    </nav>
    <nav class="navbar mobile">
        <div class="left">
            <router-link to="/" class="left-logo-container">
                <img class="logo" src="../assets/Opportune.png" alt="Opportune Logo">
                <h1 class="logoSpec">Opportune</h1>
            </router-link>
        </div>
        <div class="right">
            <button class="btn-trans" @click="toggleMenu"><Icon icon="prime:bars" style="font-size: 2rem;" /></button>
        </div>
        <ul class="nav-menu">
            <button class="btn-trans" @click="toggleMenu"><Icon icon="ri:close-line" style="font-size: 2rem;" /></button>
                <li class="menu-link">
                    <router-link to="/jobs"><Icon icon="mingcute:briefcase-2-line" />Jobs</router-link>
                </li>
                <li class="menu-link">
                    <router-link to="/ai/recommended"><Icon icon="ri:gemini-line" />Ai Recommendation</router-link>
                </li>
                <li class="menu-link" v-if="!isloggedIn">
                    <router-link to="/login"><Icon icon="prime:sign-in" />Sign in</router-link>
                </li>
                <li class="menu-link" v-if="!isloggedIn">
                    <router-link to="/register"><Icon icon="prime:arrow-up-right" />Get started</router-link>
                </li>
            </ul>
    </nav>
</template>

<script>
import { Icon } from '@iconify/vue';
import axios from 'axios';

export default{
    name: "Navbar",
    components: {
        Icon,
    },
    data(){
        return {
            index : 0,
            isloggedIn: false,
            userId: "",
        }
    },
    methods:{
        toggleMenu(){
            const menu = document.querySelector('.nav-menu');
            menu.classList.toggle('show');
        },
        checkLoggedIn(){
            const token = localStorage.getItem('token');
            console.log(token);
        }
    },
    created(){
        this.displayToken();
    },
    methods: {
        displayToken(){
            const token = localStorage.getItem('token');
            if(token){
                const res = axios.get("https://opportuneaipoweredbackend.vercel.app/api/v1/me",{
                    withCredentials: true,
                })
                            .then( res => {
                                this.userId = res.data.userId;
                                // console.log(res);
                            })
                            .catch( err => {
                                console.log(err);
                            })
                this.isloggedIn = true;
            }
        }
    },
}
</script>

<style scoped>

a{
    text-decoration: none;
    color: black;
    transition: all 0.4s ease;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    font-weight: 600;
    gap: 8px;
}
a:hover{
    color: #00A651;
}
.logo{
    width: 40px;
    height: 40px;
    position: relative;
    z-index: -10;
}
.left-logo-container{
    display: flex;
    align-items: center;
    gap: 16px;
}
.left-logo-container:hover{
    color: black;
}

.logoSpec{
    font-size: 2rem;
}
.img-cont{
    width: 35px;
    height: 35px;
    overflow: hidden;
    border-radius: 50%;
    filter: opacity(0.75);
    transition: all 0.3s ease;
}
.img-cont:hover{
    filter: opacity(1);
}
.img-profile{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}
ul{
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    gap: 16px;
}
.right{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
}

.navbar{
    padding: 16px;
    background-color: #f3fff965;
    border-bottom: 2px solid #d9ffec65;
    backdrop-filter: blur(15px);
    position: sticky;
    top: 0;
    z-index: 100;
}
.active{
  color: #026b35;
}
.nav-menu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: fixed;
    top: 0;
    right: 0;
    transform: translateX(100%);
    background-color: #f3fff9;
    width: 70vw;
    max-width: 320px;
    height: 100vh;
    padding: 16px;
    transition: transform 0.3s ease;
    z-index: 1000;
}

.nav-menu.show {
    transform: translateX(0);
}

.nav-menu .btn-trans {
    align-self: flex-end;
    margin-bottom: 20px;
}


/* Links styling */
.nav-menu a {
    padding: 10px 0;
    width: 100%;
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
}

/* Desktop Navbar */
.navbar.desktop {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Mobile Navbar */
.navbar.mobile {
    display: none;
    justify-content: space-between;
    align-items: center;
}

/* Responsive Rules */
@media screen and (max-width: 820px) {
    .navbar.desktop {
        display: none;
    }
    .navbar.mobile {
        display: flex;
    }
}
</style>