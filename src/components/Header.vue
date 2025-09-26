<template>
    <div class="header">
        <span class="title-value">今天的天气怎么样？</span>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
onMounted(() => {
    console.log('Header组件已挂载');
})
</script>

<style scoped lang="scss">
.header {
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    font-weight: 600;
    position: relative;
    margin-bottom: 6px;
    color: #333;
    padding: 0 120px;
    box-sizing: border-box;


    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 20%;
        right: 20%;
        height: 1px;
        background: linear-gradient(90deg,
                transparent,
                #32afe9 40%,
                #32afe9 60%,
                transparent);
        filter: blur(0.2px);
        opacity: 0.8;
        pointer-events: none;
    }

    .title-value{
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>