<template>
    <section class="featureBox">
        <div class="icon-container">
            <Icon :icon="icon" style="font-size: 3.5rem; color: #00A651;" />
        </div>
        <div class="body">
            <h3>{{ head }}</h3>
            <p class="muted-sm">{{ para }}</p>
        </div>
    </section>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
    props: {
        icon: String,
        head: String,
        para: String
    },
    name: "FeaturedBox",
    components: {
        Icon,
    }
}
</script>

<style scoped>
.icon-container{
    width: 50px;
    height: 50px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    overflow: hidden;
    background-color: #cbffe4;
}
.featureBox{
    width: 350px;
    height: 200px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 8px;
    text-align: center;
    border: 1px solid #ededed;
    padding: 8px;
    border-radius: 16px;
    background-color: white;
    transition: all ease 0.4s;
}
.featureBox:hover{
    box-shadow: 1px 1px 5px #99999967;
}
h3{
    font-weight: 500;
}
</style>