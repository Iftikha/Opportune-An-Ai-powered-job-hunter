import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Jobs from "../views/Jobs.vue";
import Ai from "../views/Ai.vue";
import JobDetail from "../views/JobDetail.vue";
import ProfileDetail from "../views/ProfileDetail.vue";

const routes = [
    {
        path: '/',
        name: "Home",
        component: Home
    },
    {
        path: '/register',
        name: "Register",
        component: Signup
    },
    {
        path: '/login',
        name: "Login",
        component: Login
    },
    {
        path: '/jobs',
        name: "Jobs",
        component: Jobs,
    },
    {
        path: '/jobs/:id',
        name: "JobDetail",
        component: JobDetail,
        props: true,
    },
    {
        path: '/ai/recommended',
        name: "Recommendation",
        component: Ai
    },
    {
        path: "/users/profile/:id",
        name: "ProfileDetails",
        component: ProfileDetail,
        props: true,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;