<template>
    <section class="job-detail-page">
        <div class="heading">
            <h1 class="heading-sm">
                {{ Job.jobTitle }}
            </h1>
            <div class="job-short-desc">
                <div class="companyName muted-md">
                    <Icon icon="ri:building-line" />
                    {{ Job.companyName ? Job.CompanyName : "Company ABC" }}
                </div>
                <div class="location muted-md">
                    <Icon icon="ri:map-pin-line" />
                    {{ Job.location }}
                </div>
            </div>
        </div>
        <div class="short-info">
            <div class="left muted-md">
                <Icon icon="ri:time-line" />
                {{  Job.jobType }}
            </div>
            <div class="right muted-md">
                <Icon icon="ri:group-line" />
                {{  Job.experienceLevel }}
            </div>
        </div>
        <div class="button">
            <button class="btn btn-p">
                Apply Now
            </button>
            <router-link :to="`/profile/${Job.userId}`">
                <button class="btn btn-s">
                    <Icon icon="mingcute:arrow-right-up-line" style="font-size: 1.25rem;" />
                    View Company
                </button>
            </router-link>
        </div>
        <div class="body-job-desc">
            <div class="description-body">
                <h3>Job Description</h3>
                <p>{{  Job.jobDescription }}</p>
            </div>
            <div class="right-skills-section">
                <h3>Skills Required</h3>
                <p class="tag">
                    <span v-for="skill in Job.skillsRequired" :key="skill">
                        {{ skill }}<br/>
                    </span>
                </p>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { Icon } from '@iconify/vue';

export default{
    props: ['id'],
    name: "JobDetail",
    data(){
        return{
            Job: {},
        }
    },
    components: {
        Icon,
    },
    async created(){
        await this.fetchDetails();
    },
    methods: {
        fetchDetails(){
            const res = axios.get(`https://opportuneaipoweredbackend.vercel.app/api/v1/jobs/${this.id}`)
                .then(res => {
                    this.Job = res.data.job;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
}
</script>

<style scoped>
.job-detail-page{
    width: 75vw;
    display: flex;
    gap: 16px;
    flex-direction: column;
    margin: 16px auto;
}
.job-short-desc{
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 8px 0px;
}
.short-info{
    display: flex;
    align-items: center;
    gap: 16px;
}
.button{
    display: flex;
    align-items: center;
    gap: 16px;
}
button{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
}
a{
    text-decoration: none;
}
.body-job-desc{
    display: flex;
    justify-content: space-between;
    gap: 16px;
}
.description-body{
    border: 2px solid #ededed;
    padding: 16px;
    border-radius: 16px;
    width: 75%;
    height: fit-content;
}
.right-skills-section{
    padding: 16px;
    border-radius: 16px;
    border: 2px solid #ededed;
    width: 25%;
}
p{
    padding: 16px 0;
    line-height: 1.5rem;
}
</style>