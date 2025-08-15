<template>
    <div class="card-container">
        <h2>{{ title }}</h2><span class="type-tag">{{ type }}</span>
        <p class="muted-sm"><Icon icon="ri:building-line" />{{ company }}</p>
        <p class="muted-sm"><Icon icon="ri:map-pin-2-line" />{{ location }}</p>
        <router-link :to="`/jobs/${id}`"><button class="btn btn-p">View Details</button></router-link>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
    name: "JobCardSm",
    components: {
        Icon,
    },
    props: {
        company: String,
        location: String,
        title: String,
        type: String,
        id: String,
    }
}
</script>

<style scoped>
.card-container{
    width: 350px;
    height: 175px;
    padding: 16px;
    border-radius: 16px;
    border: 1px solid #ededed;
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 8px;
    transition: all 0.4s ease;
}
.card-container:hover{
    box-shadow: 1px 1px 5px #99999967;
}
.type-tag{
    width: fit-content;
    height: fit-content;
    background-color: #cccccc;
    font-size: 12px;
    color: #4d4d4d;
    padding: 4px 8px;
    border-radius: 20px;
    position: absolute;
    top: 16px;
    right: 16px;
}
h2{
    font-size: 1.2rem;
    line-height: 1.2rem;
}
p{
    display: flex;
    align-items: center;
    gap: 8px;
}
a{
    width: 100%;
}
.btn{
    width: 100%;
}
</style>