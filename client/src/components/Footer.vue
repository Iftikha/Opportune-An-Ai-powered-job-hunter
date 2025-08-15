<template>
    <section class="about-the-owner">
        <h6>About the owner</h6>
        <div class="top about-the-owner-top">
            <div class="left">
                <a class="my-links" href="https://khaixu-iftikhar.vercel.app"><Icon icon="ri:user-6-line" style="font-size: 1.25rem;" />View Portfolio</a>
            </div>
            <div class="right social-links">
                <a class="my-links" href="instagram.com"><Icon icon="ri:instagram-line" style="font-size: 1.25rem;" />Instagram</a>
                <a class="my-links" href="whatsapp"><Icon icon="ri:whatsapp-line" style="font-size: 1.25rem;" />Whatsapp</a>
                <a class="my-links" href="linkedin"><Icon icon="ri:linkedin-line" style="font-size: 1.25rem;" />LinkedIn</a>
            </div>
        </div>
        <div class="bottom about-the-project-bottom">
            <p class="muted-md">2025 Opportune. An AI-powered job hunting plateform.</p>
        </div>
    </section>
</template>

<script>
import { Icon } from '@iconify/vue';

export default{
    name: "FooterComponent",
    components:{
        Icon,

    }
}
</script>

<style scoped>
.about-the-owner{
    border-top: 2px solid #ededed;
}
.my-links{
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 8px;
    color: black;
    transition: all 0.4s ease;
    text-decoration: none;
}
h6{
    font-size: 1.25rem;
    font-weight: 500;
    text-align: center;
    padding: 16px;
}
.my-links:hover{
    color: #00A651;
}
.social-links{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
}
.about-the-owner-top{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #ededed;
}
.about-the-project-bottom{
    padding: 16px;
    text-align: center;
}
</style>