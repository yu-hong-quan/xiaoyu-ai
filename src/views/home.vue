<template>
  <div class="home">
    <div class="home-left" :class="{ 'collapsed': !isSidebarExpanded }">
      <LeftSide @update:expanded="handleSidebarToggle" />
    </div>
    <div class="home-right" :class="{ 'sidebar-collapsed': !isSidebarExpanded }">
      <Header />
      <ChatMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import LeftSide from '@/components/LeftSide.vue';
import Header from '@/components/Header.vue';
import ChatMain from '@/components/ChatMain.vue';

const isSidebarExpanded = ref(true);

// 确保状态更新时机与动画效果匹配
const handleSidebarToggle = (expanded: boolean) => {
  // 直接更新状态，让CSS过渡效果自动处理动画
  isSidebarExpanded.value = expanded;
}

onMounted(() => {
})
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100vh;
  background: #F1F5FF;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  
  .home-left {
    max-width: 210px; // 展开时的宽度
    width: 210px;
    height: 100%;
    overflow: hidden;
    margin-right: 3px;
    transition: all 0.4s ease; // 修改为all，确保所有属性都参与过渡
    will-change: width, max-width; // 提示浏览器优化动画性能
    position: relative;
    z-index: 1; // 确保在过渡期间层级正确
    
    &.collapsed {
      width: 60px; // 折叠时的宽度
      max-width: 60px;
    }
  }
  
  .home-right {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: calc(100% - 210px - 6px); // 展开时的宽度（减去左侧宽度和间距）
    height: 100vh;
    transition: all 0.4s ease; // 修改为与左侧完全相同的过渡效果
    will-change: width; // 提示浏览器优化动画性能
    position: relative;
    
    &.sidebar-collapsed {
      width: calc(100% - 60px - 3px); // 折叠时的宽度（减去左侧折叠宽度和间距）
    }
  }
}

// 使用全局选择器确保样式优先级，避免被其他样式覆盖
:global(.home) .home-left,
:global(.home) .home-right {
  transition: all 0.4s ease !important;
}
</style>