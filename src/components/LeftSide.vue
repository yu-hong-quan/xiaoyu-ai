<template>
  <div class="left-side" :class="{ 'collapsed': !isExpanded }">
    <div class="left-side-top">
      <!-- 将v-if改为使用opacity过渡 -->
      <span class="text-content" :class="{ 'hidden': !showText }">企业Ai智能体</span>
      <el-icon @click="toggleSidebar" class="toggle-btn" color="#000">
        <Menu />
      </el-icon>
    </div>
    <div class="left-sid-content">
      <div class="left-sid-content-top">
        <el-icon color="#fff">
          <CirclePlus />
        </el-icon>
        <!-- 将v-if改为使用opacity过渡 -->
        <span class="text-content new-chat-btn" :class="{ 'hidden': !showText }">开启新对话</span>
      </div>
      <div class="left-sid-content-list">
        <div class="left-sid-content-list-parent-item" v-for="item in chatList" :key="item.id">
          <div class="prent-item-title">
            <el-icon size="15">
              <Calendar />
            </el-icon>
            <!-- 将v-if改为使用opacity过渡 -->
            <span class="text-content parent-title" :class="{ 'hidden': !showText }">{{ item.title }}</span>
          </div>
          <div class="prent-item-content">
            <div class="prent-item-content-item" v-for="childrenItem in item.data" :key="childrenItem.id">
              <!-- 将v-if改为使用opacity过渡 -->
              <span class="text-content item-value" :class="{ 'hidden': !showText }">{{ childrenItem.content }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="left-sid-bottom">
      <el-badge is-dot class="item" color="#2DE718">
        <el-avatar :size="25" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </el-badge>
      <!-- 将v-if改为使用opacity过渡 -->
      <div class="text-content user-info" :class="{ 'hidden': !showText }">
        <span class="user-name">
          小元
        </span>
        <span class="user-emia">
          15017872695@163.com
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { CirclePlus, Menu, Calendar } from '@element-plus/icons-vue';
import type { ListSideType } from '../types/list-side-type';

// 定义事件
const emit = defineEmits<{
  'update:expanded': [expanded: boolean]
}>();

let chatList = ref<Array<ListSideType>>([]);
const isExpanded = ref(true);
const showText = ref(true);

// 监听 isExpanded 变化并通知父组件
watch(isExpanded, (newValue) => {
  emit('update:expanded', newValue);
}, { immediate: true });

// 修改切换侧边栏展开/关闭的方法，减少延迟时间
const toggleSidebar = () => {
  if (isExpanded.value) {
    // 收起时，先立即隐藏文字
    showText.value = false;
    // 然后缓慢改变宽度
    setTimeout(() => {
      isExpanded.value = false;
    }, 0); // 几乎同时执行，但文字先隐藏
  } else {
    // 展开时，先改变宽度，然后显示文字
    isExpanded.value = true;
    setTimeout(() => {
      showText.value = true;
    }, 100); // 稍微延迟显示文字，等宽度调整好
  }
}

const getChatList = async () => {
  return [
    {
      id: 1,
      title: '今天',
      data: [
        { id: 1, content: '今天的天气怎么样？' },
        { id: 2, content: '今天的天气怎么样？' },
        { id: 3, content: '今天的天气怎么样？' }
      ]
    },
    {
      id: 2,
      title: '一周内',
      data: [
        { id: 1, content: '今天的天气怎么样？' },
      ]
    }
  ]
}

onMounted(async () => {
  console.log('LeftSide组件已挂载');
  chatList.value = await getChatList();
})
</script>

<style scoped lang="scss">
.left-side {
  max-width: 210px;
  width: 210px; // 添加固定宽度，确保动画流畅
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 0 5px;
  box-sizing: border-box;
  position: relative;
  background-color: #f5f7fa;
  transition: width 0.3s ease;

  // 收起状态的样式
  &.collapsed {
    width: 60px;
    padding: 0;
    align-items: center;
  }

  .left-side-top {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    font-size: 18px;
    font-weight: 600;
    background: linear-gradient(45deg, #5E2FC9, #2C6AF6);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow:
      1px 1px 0 rgba(255, 255, 255, 0.3),
      -0.5px -0.5px 0 rgba(0, 0, 0, 0.1),
      1px 1px 2px rgba(0, 0, 0, 0.1);
    user-select: none;
    position: relative;
    

    .toggle-btn {
      transition: all 0.3s ease;
      color: #5E2FC9;
      cursor: pointer;
      font-size:20px;
      padding: 4px;
      border-radius: 4px;
      margin-left:20px;
      position: absolute;
      right: 0;
  
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        color: #5E2FC9;
      }
    }
  }

  .left-sid-content {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .left-sid-content-top {
      width: calc(100% - 30px);
      height: 30px;
      display: flex;
      border-radius: 8px;
      justify-content: center;
      align-items: center;
      background: linear-gradient(45deg, #5E2FC9, #2C6AF6);
      gap: 8px;
      transition: all 0.3s ease;
      box-shadow:
        0 2px 6px rgba(79, 70, 229, 0.2),
        inset 0 1px 1px rgba(255, 255, 255, 0.2);
      user-select: none;

      // 收起状态下调整按钮大小和位置
      :deep(.el-icon) {
        margin: 0;
      }

      &:hover {
        transform: translateY(-1px);
        box-shadow:
          0 4px 12px rgba(79, 70, 229, 0.3),
          inset 0 1px 1px rgba(255, 255, 255, 0.3);
        cursor: pointer;
      }

      &:active {
        transform: scale(1);
      }

      .new-chat-btn {
        // 保留原样式，但移除单独的transition
        color: #fff;
        font-size: 13px;
        letter-spacing: 0.5px;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        // transition: opacity 0.2s ease; 移除此行，由.text-content统一定义
      }
    }

    // 收起状态下调整内容列表
    .left-sid-content-list {
      width: 100%;
      margin-top: 15px;
      max-height: calc(100vh - 135px);
      overflow-y: auto;
      opacity: 1;
      transition: all 0.3s ease; // 修改为all，确保所有属性都有过渡效果

      // 收起状态下隐藏部分内容
      .left-sid-content-list-parent-item {
        margin-bottom: 6px;
        background: #fff;
        border-radius: 12px;
        padding: 6px 8px;
        transition: all 0.3s ease; // 修改为all，确保所有属性都有过渡效果

        .prent-item-title {
          padding: 8px 12px;
          background: #EFF6FF;
          border-radius: 6px;
          display: flex;
          justify-content: center; // 居中显示图标
          align-items: center;

          .el-icon {
            color: #4a11ce;
            transition: transform 0.2s ease;
            margin: 0;
          }

          .parent-title {
            // 保留原样式，但移除单独的transition
            color: #4a11ce;
            font-size: 13px;
            font-weight: 600;
            user-select: none;
            margin-left: 6px;
            // transition: opacity 0.2s ease; 移除此行
          }
        }

        .prent-item-content {
          // 收起状态下隐藏内容项
          .prent-item-content-item {
            border-radius: 6px;
            padding: 8px 12px;
            margin: 4px 0;
            transition: all 0.2s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            border: 1px solid #F5F5F5;
            user-select: none;
            display: flex;
            justify-content: center;

            &::before {
              content: "";
              position: absolute;
              left: 0;
              top: 0;
              width: 3px;
              height: 100%;
              background: linear-gradient(180deg, #2C6AF6, #5E2FC9);
              opacity: 0;
              transition: opacity 0.3s ease;
            }

            &:hover {
              background: rgba(43, 41, 41, 0.05);
              transform: translateX(4px);

              &::before {
                opacity: 1;
              }
            }

            &:active {
              transform: scale(0.98);
            }

            .item-value {
              // 保留原样式，但移除单独的transition
              color: #333;
              font-size: 13px;
              line-height: 1.4;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: left;
              // transition: opacity 0.2s ease; 移除此行
            }
          }
        }
      }

      :last-child {
        margin-bottom: 0;
      }
    }

    /* 自定义滚动条 */
    ::-webkit-scrollbar {
      display: none;
    }

    ::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
    }

    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
    }
  }

  // 收起状态下调整底部用户信息区域
  .left-sid-bottom {
    display: flex;
    align-items: center;
    padding: 3px 10px;
    background: #fff;
    border-radius: 8px;
    gap: 19px;
    transition: all 0.3s ease;
    cursor: pointer;
    position: absolute;
    bottom: 5px;
    overflow: hidden;
    margin-top: 6px;
    width: calc(100% - 10px);
    justify-content: center; // 居中显示元素

    .el-badge {
      flex-shrink: 0;
      margin-top: 5px;

      .el-avatar {
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      }
    }

    .user-info {
      // 保留原样式，但移除单独的transition
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 1px;
      // transition: opacity 0.2s ease;

      .user-name {
        color: rgba(0, 0, 0, 0.8);
        font-size: 10px;
        font-weight: 500;
        letter-spacing: 0.5px;
      }

      .user-emia {
        color: rgba(0, 0, 0, 0.6);
        font-size: 8px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }

  // 收起状态下的样式调整
  &.collapsed .left-sid-content-list {
    width: 50px;
    opacity: 0.8; // 保持一定透明度，不要完全透明
  }
  
  // 为内容列表添加更平滑的过渡效果
  &.collapsed .left-sid-content-list-parent-item {
    padding: 3px 4px;
    margin-bottom: 4px;
  }
  
  &.collapsed .prent-item-content {
    display: none;
  }
  // 添加收起状态下的切换按钮居中样式
  &.collapsed .toggle-btn {
    right: 50%;
    transform: translateX(50%);
    margin-left: 0;
  }
  
  // 添加收起状态下的顶部区域样式
  &.collapsed .left-side-top {
    justify-content: center;
    padding: 0;
  }
  
  // 添加收起状态下的切换按钮样式
  &.collapsed .toggle-btn {
    right: 50%;
    transform: translateX(50%);
    margin-left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  // 定义文字内容样式 - 关键部分
  // 修改text-content相关样式，确保隐藏时完全不占空间
  .text-content {
  // 定义文字过渡效果
  transition: all 0.1s ease;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  width: auto;
  flex-shrink: 0; // 防止flex布局中被压缩
  }
  
  .text-content.hidden {
  // 文字快速隐藏样式 - 确保完全不占用空间
  opacity: 0;
  width: 0 !important;
  visibility: hidden;
  margin: 0 !important;
  padding: 0 !important;
  transform: scale(0);
  position: absolute;
  left: -9999px; // 将元素移出可视区域
  pointer-events: none; // 防止元素响应鼠标事件
  }
  
  // 同时修改布局容器，确保在收起状态下正确居中
  .left-side-top,
  .prent-item-title,
  .left-sid-content-top,
  .left-sid-bottom {
  display: flex;
  align-items: center;
  justify-content: center; // 默认居中
  }
  
  // 展开状态下调整布局
  .left-side:not(.collapsed) .left-side-top {
  justify-content: space-between; // 展开时使用两端对齐
  padding: 0 10px;
  }
  
  .left-side:not(.collapsed) .left-sid-content-top {
  justify-content: center; // 保持居中
  gap: 8px;
  }
  
  .left-side:not(.collapsed) .prent-item-title {
  justify-content: flex-start; // 展开时左对齐
  }
  
  .left-side:not(.collapsed) .left-sid-bottom {
  justify-content: flex-start; // 展开时左对齐
  }
}
</style>