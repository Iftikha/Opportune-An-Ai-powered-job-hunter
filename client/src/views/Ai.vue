<template>
    <section class="recommendation-heading">
        <div class="message" id="msg-container">
            <div class="left">
                <div class="icon-container">
                    <Icon icon="ri:gemini-line" style="font-size: 1.5rem;"  />
                </div>
                <div class="message-text">
                    <h2>Job search completed</h2>
                </div>
            </div>
            <div class="right">
                <div class="count">
                    <h3>3</h3><span class="muted-md">Jobs</span>
                </div>
            </div>
            <button class="btn-trans cancel-btn" @click="showMessage">
                <Icon icon="ri:close-line" style="font-size: 1.5rem;"/>
            </button>
        </div>
        <div class="headerSection">
            <h1>Ai Recommedation</h1>
            <p class="muted-sm">Personalized job matches based on your skills</p>
        </div>
        
    </section>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
    name: "AiRecommedation",
    components:{
        Icon,
    },
    methods: {
        showMessage(){
            document.getElementById('msg-container').classList.toggle('show');
        }
    }
}
</script>

<style scoped>
.message{
    width: 50vw;
    background-color: #66dd8e;
    border: 2px solid #00A561;
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: -50%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 300;
    padding: 24px;
    transition: all 0.4s ease;
}
.show{
    top: 0%;
}
.cancel-btn{
    position: absolute;
    top: 8px;
    right: 8px;
}
.count{
    display: flex;
    gap: 8px;
    align-items: end;
}
.left{
    display: flex;
    align-items: center;
    gap: 8px;
}
h2{
    font-size: 1.25rem;
    font-weight: 500;
}
h3{
    font-size: 1.5rem;
    font-weight: 400;
}
</style>