<template>
    <div class="chat-main">
        <div class="new-chat-background" :style="isShowNewChat ? 'visibility: visible;' : 'visibility: hidden;'">

            <div class="gradient-bg"></div>
            <div class="stars"></div>
            <div class="stars2"></div>
            <div class="circle-decoration circle-1"></div>
            <div class="circle-decoration circle-2"></div>
            <div class="circle-decoration circle-3"></div>

            <div class="new-chat-box">
                <Welcome
                    icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
                    title="欢迎使用小余私有知识库 💖" description="强大的雅痞 ~" />
                <h2 class="title">开启新的智能对话</h2>
                <p class="desc_1">点击下方按钮开始与我对话</p>
                <div class="new-chat-btn-box" @click="handleNewChatClick">
                    <el-icon color="#fff">
                        <CirclePlus />
                    </el-icon>
                    <span class="new-chat-btn">开启新对话</span>
                </div>
            </div>
        </div>
        <div class="chat-main-content">
            <BubbleList :list="list">
                <!-- 自定义头部 -->
                <template #header="{ item }">
                    <div class="header-wrapper">
                        <div class="header-name">
                            {{ item.role === 'ai' ? '智能Ai 🍧' : '🧁 小元' }}
                        </div>
                    </div>
                </template>
            </BubbleList>
            <div class="sender-box">
                <Sender class="sender" ref="senderRef" v-model="senderValue" variant="updown"
                    :submit-btn-disabled="submitBtnDisabled" :loading="senderLoading" clearable @submit="handleSubmit"
                    @cancel="handleCancel" :auto-size="{ minRows: 2, maxRows: 5 }" placeholder="💌 欢迎使用私有知识库"
                    :btn-icon-size="scrollBottomBtnSize">
                    <template #prefix>
                        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                            <el-button round plain color="#626aef">
                                <el-icon>
                                    <Paperclip />
                                </el-icon>
                            </el-button>

                            <div :class="{ isSelect }"
                                style="display: flex; align-items: center; gap: 4px; padding: 2px 12px; border: 1px solid silver; border-radius: 15px; cursor: pointer; font-size: 12px;"
                                @click="isSelect = !isSelect">
                                <el-icon>
                                    <ElementPlus />
                                </el-icon>
                                <span>深度思考</span>
                            </div>
                        </div>
                    </template>

                    <template #action-list>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <el-button round color="#626aef">
                                <el-icon>
                                    <Promotion />
                                </el-icon>
                            </el-button>
                        </div>
                    </template>
                </Sender>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CirclePlus, Paperclip, ElementPlus, Promotion } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { BubbleList, Sender, Welcome } from 'vue-element-plus-x';
import type { BubbleListItemProps, BubbleListProps } from 'vue-element-plus-x/bubbleList/types';

type listType = BubbleListItemProps & {
    key: number
    role: 'user' | 'ai'
}

const isShowNewChat = ref(false);
const list: BubbleListProps<listType>['list'] = generateFakeItems(5);
const senderRef = ref();
const timeValue = ref<NodeJS.Timeout | null>(null);
const senderValue = ref('');
const senderLoading = ref(false);
const isSelect = ref(false);
const scrollBottomBtnSize = ref(20);

const submitBtnDisabled = ref(false)
function handleSubmit(value: string) {
    ElMessage.info(`发送中`)
    senderLoading.value = true
    timeValue.value = setTimeout(() => {
        // 可以在控制台 查看打印结果
        console.log('submit-> value：', value)
        console.log('submit-> senderValue', senderValue.value)
        senderLoading.value = false
        ElMessage.success(`发送成功`)
    }, 3500)
}

function handleCancel() {
    senderLoading.value = false
    if (timeValue.value)
        clearTimeout(timeValue.value)
    timeValue.value = null
    ElMessage.info(`取消发送`)
}

function generateFakeItems(count: number): listType[] {
    const messages: listType[] = []
    for (let i = 0; i < count; i++) {
        const role = i % 2 === 0 ? 'ai' : 'user'
        const placement = role === 'ai' ? 'start' : 'end'
        const key = i + 1
        const content = role === 'ai'
            ? '💖 感谢使用 私有知识库 ! 你的支持，是我们开源的最强动力 ~'.repeat(5)
            : `哈哈哈，让我试试`
        const loading = false
        const shape = 'corner'
        const variant = role === 'ai' ? 'filled' : 'outlined'
        const isMarkdown = true
        const typing = role === 'ai' ? i === count - 1 : false
        const avatar = role === 'ai'
            ? 'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp'
            : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'

        messages.push({
            key, // 唯一标识
            role, // user | ai 自行更据模型定义
            placement, // start | end 气泡位置
            content, // 消息内容 流式接受的时候，只需要改这个值即可
            loading, // 当前气泡的加载状态
            shape, // 气泡的形状
            variant, // 气泡的样式
            isMarkdown, // 是否渲染为 markdown
            typing, // 是否开启打字器效果 该属性不会和流式接受冲突
            isFog: role === 'ai', // 是否开启打字雾化效果，该效果 v1.1.6 新增，且在 typing 为 true 时生效，该效果会覆盖 typing 的 suffix 属性
            avatar,
            avatarSize: '28px', // 头像占位大小
            avatarGap: '12px', // 头像与气泡之间的距离
        })
    }
    return messages
}

const handleNewChatClick = () => {
    isShowNewChat.value = false; // 点击后隐藏
}

onMounted(() => {
    console.log('ChatMain组件已挂载');
})
</script>

<style scoped lang="scss">
.chat-main {
    width: 100%;
    height: calc(100vh - 46px); // 减去Header的height;
    background: #FBFCFF;
    padding: 6px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden; // 防止背景元素溢出

    .new-chat-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1; // 确保背景元素在内容上方

        .gradient-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(125deg, #f6f8fa, #fbfbfc, #e1e4e9);
            background-size: 400% 400%;
            animation: gradientBG 15s ease infinite;
        }

        @keyframes gradientBG {
            0% {
                background-position: 0% 50%;
            }

            50% {
                background-position: 100% 50%;
            }

            100% {
                background-position: 0% 50%;
            }
        }

        .circle-decoration {
            position: absolute;
            border-radius: 50%;
            opacity: 0.15;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%);
        }

        .circle-1 {
            width: 600px;
            height: 600px;
            top: -200px;
            right: -100px;
            background-color: #64b5f6;
            animation: float 8s ease-in-out infinite;
        }

        .circle-2 {
            width: 500px;
            height: 500px;
            bottom: -200px;
            left: -100px;
            background-color: #81c784;
            animation: float 10s ease-in-out infinite;
        }

        .circle-3 {
            width: 300px;
            height: 300px;
            top: 50%;
            right: 10%;
            background-color: #ba68c8;
            animation: float 7s ease-in-out infinite;
        }

        @keyframes float {
            0% {
                transform: translateY(0px);
            }

            50% {
                transform: translateY(-20px);
            }

            100% {
                transform: translateY(0px);
            }
        }

        .stars {
            width: 1px;
            height: 1px;
            background: transparent;
            box-shadow: 1402px 1228px #FFF, 849px 1430px #FFF, 1391px 1263px #FFF,
                495px 1473px #FFF, 1244px 1219px #FFF, 1673px 1222px #FFF;
            animation: animStar 50s linear infinite;
        }

        .stars:after {
            content: "";
            position: absolute;
            top: 2000px;
            width: 1px;
            height: 1px;
            background: transparent;
            box-shadow: 1402px 1228px #FFF, 849px 1430px #FFF, 1391px 1263px #FFF,
                495px 1473px #FFF, 1244px 1219px #FFF, 1673px 1222px #FFF;
        }

        .stars2 {
            width: 2px;
            height: 2px;
            background: transparent;
            box-shadow: 683px 1594px #FFF, 320px 1395px #FFF, 538px 656px #FFF,
                1014px 1515px #FFF, 444px 918px #FFF, 1387px 283px #FFF;
            animation: animStar 100s linear infinite;
        }

        .stars2:after {
            content: "";
            position: absolute;
            top: 2000px;
            width: 2px;
            height: 2px;
            background: transparent;
            box-shadow: 683px 1594px #FFF, 320px 1395px #FFF, 538px 656px #FFF,
                1014px 1515px #FFF, 444px 918px #FFF, 1387px 283px #FFF;
        }

        @keyframes animStar {
            from {
                transform: translateY(0px);
            }

            to {
                transform: translateY(-2000px);
            }
        }

        .new-chat-box {
            background: linear-gradient(135deg, #fff 0%, #fff 100%);
            padding: 30px; // 增加内边距
            border-radius: 12px; // 增加圆角
            text-align: center;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15), 0 4px 4px rgba(0, 0, 0, 0.1); // 增强阴影
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: absolute;
            z-index: 9999;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%); // 居中布局

            p {
                margin-bottom: 15px;
                color: #666;
                font-size: 12px; // 缩小描述文字大小
                line-height: 1.4; // 缩小行高
            }

            h2 {
                margin-bottom: 10px;
                color: #333;
                font-size: 20px; // 缩小标题字体大小
                font-weight: 600;
                margin-top: 15px;
            }

            .new-chat-btn-box {
                width: 140px; // 缩小按钮宽度
                height: 36px; // 缩小按钮高度
                display: flex;
                border-radius: 24px; // 增加按钮圆角
                justify-content: center;
                align-items: center;
                background: linear-gradient(45deg, #5E2FC9, #2C6AF6);
                transition: all 0.1s ease;
                box-shadow:
                    0 4px 10px rgba(79, 70, 229, 0.3),
                    inset 0 2px 2px rgba(255, 255, 255, 0.2);
                user-select: none;

                &:hover {
                    transform: translateY(-2px);
                    box-shadow:
                        0 8px 20px rgba(79, 70, 229, 0.4),
                        inset 0 2px 2px rgba(255, 255, 255, 0.3);
                    cursor: pointer;
                }

                &:active {
                    transform: scale(0.98);
                }

                .new-chat-btn {
                    color: #fff;
                    font-size: 14px; // 缩小按钮文字大小
                    letter-spacing: 1px;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
                    margin-left: 8px; // 缩小按钮文字与图标间距;
                }
            }
        }
    }

    .chat-main-content {
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .sender-box {
            width: 100%;
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: center;

            .isSelect {
                color: #626aef !important;
                border: 1px solid #626aef !important;
                border-radius: 15px;
                padding: 3px 12px;
                font-weight: 700;
            }

            .el-sender-wrap {
                width: 100%;
                margin-top: 10px;
            }
        }
    }
}
</style>