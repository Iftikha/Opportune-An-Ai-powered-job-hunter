<template>
  <section class="jobsPage">
    <div class="headerSection">
      <h1>Find Your Next Opportunity</h1>
      <p class="muted-md">
        Discover amazing job opportunities that suits your skills and interests
      </p>
      <div class="actions-container">
        <div class="action-1">
          <div class="icon-container">
            <Icon icon="ri:search-line" />
          </div>
          <input
            type="text"
            placeholder="Search jobs, companies, skills..."
            class="inp"
            @focus="searchJobs"
          />
        </div>
        <div class="action-2">
          <div class="icon-container">
            <Icon icon="ri:map-pin-line" />
          </div>
          <select name="location" id="location" class="inp">
            <option value="" selected disabled>Location</option>
            <option v-for="(city, index) in cities" :key="index" :value="city">{{ city }}</option>
          </select>
      </div>
      <div class="action-3">
          <div class="icon-container">
              <Icon icon="mingcute:briefcase-2-line" />
          </div>
          <select name="jobType" id="jobType" class="inp">
            <option value="" selected disabled>Job Type</option>
            <option v-for="(type, index) in types" :key="index" :value="type">{{ type }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="jobs-section">
        <div class="jobs-container-section">
            <div class="jobCard-container" v-for="(Job) in visibleJobs()" :key="Job._id">
                <JobCardSm :id="Job._id" :title="Job.jobTitle" :company="Job.companyName" :type="Job.jobType" :location="Job.location"/>
            </div>
        </div>
        <div v-if="visibleCount < Jobs.length" class="button">
            <button class="btn btn-s" @click="loadMore">Load More</button>
        </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import { Icon } from '@iconify/vue';
import JobCardSm from '../components/JobCardSm.vue';
import Footer from '../components/Footer.vue';
import axios from 'axios';

export default{
    name: "JobsPage",
    components: {
        Icon,
        JobCardSm,
        Footer
    },
    data(){
        return{
            cities : [
                        "Karachi",
                        "Lahore",
                        "Islamabad",
                        "Rawalpindi",
                        "Faisalabad",
                        "Multan",
                        "Peshawar",
                        "Quetta",
                        "Hyderabad",
                        "Sialkot"
                        ],
            types   : [
                        'Remote',
                        'On-site',
                        'Both'
                        ],
            Jobs: [],
            visibleCount: 6,

        }
    },
    async created(){
      await this.fetchJobs();
    },
    methods:{
      fetchJobs(){
        const res = axios.get("https://opportuneaipoweredbackend.vercel.app/api/v1/jobs")
                    .then(res => {
                      this.Jobs = res.data.jobs;
                    })
                    .catch(err => {
                      console.log(err);
                    })
      },
      visibleJobs(){
        return this.Jobs.slice(0, this.visibleCount);
      },
      loadMore(){
        this.visibleCount += 3;
      },
    }
}
</script>

<style scoped>
.headerSection {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  /* height: 125px; */
  padding: 24px;
}
h1 {
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 600;
}
.inp{
    padding: 8px 16px 8px 32px;
    border-radius: 8px;
    border: 1px solid #ededed;
    font-size: 1rem;
    outline: none;
    transition: all 0.2s ease;
    width: 100%;
}
.inp:focus{
    border: 1px solid #00A651;
}
.action-1, .action-2, .action-3{
    position: relative;
}
.icon-container{
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 5;
}
.actions-container{
    width: 100%;
    padding: 24px;
    margin: 24px auto;
    border: 1px solid #80808075;
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    box-shadow: 1px 1px 10px #ededed;
}
.action-1{
    width: 50%;
}
.action-2{
    width: 25%;
}
.action-3{
    width: 25%;
}
.jobs-container-section{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    padding: 16px;
    margin: 0px auto 24px auto;
    width: 90vw;
}
.button{
    text-align: center;
    padding: 0 16px 40px 16px;
    margin: 0 auto;
}
</style>
