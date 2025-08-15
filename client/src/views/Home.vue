<template>
    <section class="hero-container">
        <h1 class="heading">Welcome to <span class="highlight">Opportune</span>.</h1>
        <p class="tag-line">Find a perfect job to <span class="highlight-sm">showcase</span> your skills.</p>
        <div class="btns">
            <router-link to="/jobs"><button class="btn btn-p" type="button" aria-label="Explore Jobs"><Icon icon="prime:arrow-up-right" style="font-size: 1.5rem;" />Explore Jobs</button></router-link>
            <router-link to="/ai/recommended"><button class="btn btn-s" type="button" aria-label="View AI recommended"><Icon icon="ri:gemini-line" style="font-size: 1.5rem;" />View AI recommended</button></router-link>
        </div>
    </section>
    <section class="featuredSection">
        <div class="sectionHeading">
            <h1 class="heading-sm">Why choose <span class="highlight-sm">Opportune</span>?</h1>
            <p class="muted-md">Experience the future of job searching with our intelligent platform</p>
        </div>
        <div class="feature-container">
            <div class="featureContainer" v-for="(icon, index) in icons" :key="index">
                <FeaturedBox :icon="icon" :head="heads[index]" :para="paras[index]" />
            </div>
        </div>
    </section>
    <section class="featuredOpportunities">
        <div class="sectionHeading">
            <h1 class="heading-sm">Featured Opportunities</h1>
            <p class="muted-md">Hand picked jobs form top companies.</p>
        </div>
        <div class="jobCard-container">
            <div class="jobCard" v-for="(Job) in Jobs" :key="Job._id">
                <JobCardSm :id="Job._id" :title="Job.jobTitle" :location="Job.location" :company="Job.companyName" :type="Job.jobType" />
            </div>
        </div>
    </section>
    <section class="startNowSection">
        <div class="icon-container">
            <Icon icon="famicons:trending-up" style="font-size: 5rem; color: white;" />
        </div>
        <h1 class="dn_dsinv">Ready to Supercharge Your Career?</h1>
        <p>Join thousands of professionals who have found their dream jobs through our AI-powered platform.</p>
        <router-link to="/register"><button class="btn btn-sm">Start Your Journey</button></router-link>
    </section>
    <Footer />
</template>

<script>
import { Icon } from '@iconify/vue';
import FeaturedBox from '../components/FeaturedBox.vue';
import JobCardSm from '../components/JobCardSm.vue';
import Footer from '../components/Footer.vue';
import axios from 'axios';

export default {
    name: "Home",
    components:{
        Icon,
        FeaturedBox,
        JobCardSm,
        Footer,
    },
    data(){
        return {
            icons: ['ri:gemini-line', 'ri:search-line', 'ri:group-line'],
            heads: ['AI-Powered Matching', 'Smart Search', 'Personalized Recommendations'],
            paras: ['Our advanced AI analyzes your skills and preferences to find perfect job matches.', 
                   'Intelligent search that understands context and finds relevant opportunities.', 
                   'Get job recommendations tailored specifically to your career goals and experience.'],

            Jobs: []
        }
    },
    async created(){
        await this.fetch3Jobs();
    },
    methods: {
        fetch3Jobs(){
            const res = axios.get("https://opportuneaipoweredbackend.vercel.app/api/v1/jobs")
                        .then(res => {
                            for(var i = 0; i < 3; i++){
                                this.Jobs[i] = res.data.jobs[i];
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
        }
    }
}
</script>

<style scoped>
.heading{
    font-size: 3.75rem;
}
.tag-line{
    font-size: 2rem;
}
.hero-container{
    text-align: center;
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
}
a{
    text-decoration: none;
}
button{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
}
.btns{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
}
.featuredSection{
    width: 100%;
    background-color: #f9fffb;
    padding: 40px 24px;
    margin: 40px 0;
    text-align: center;
}
.feature-container, .jobCard-container{
    display: flex;
    align-items: center;
    width: fit-content;
    gap: 16px;
    margin: 24px auto;
    flex-wrap: wrap;
}
.sectionHeading{
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 24px;
    padding: 40px;
}
.startNowSection{
    width: 100%;
    height: 60vh;
    color: white;
    background-color: #00A651;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 16px;
}
.btn-sm{
    background-color: white;
    color: black;
    border: none;
    border-radius: 8px;
    transition: all 0.4s ease;
}
.btn-sm:hover{
    filter: opacity(0.95);
}
.dn_dsinv{
    font-size: 2.5rem;
}

</style>