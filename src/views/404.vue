<template>
  <div class="not-found-container">
    <div class="stars"></div>
    <div class="stars2"></div>
    <div class="stars3"></div>
    <div class="central-body">
      <div class="error-card">
        <div class="error-code">404</div>
        <div class="error-title">迷失太空</div>
        <!-- <div class="astronaut-container">
          <img src="../assets/astronaut.svg" class="astronaut" alt="宇航员" />
        </div> -->
        <div class="error-message">
          <p>抱歉，您要寻找的页面似乎已经漂流到了宇宙深处...</p>
          <div class="actions">
            <el-button 
              type="primary" 
              class="home-button"
              @click="goHome"
            >
              <el-icon style="margin-right:5px;"><House /></el-icon>
              返回首页
            </el-button>
            <el-button 
              type="info"
              class="back-button"
              @click="goBack"
            >
              <el-icon style="margin-right:5px;"><Back /></el-icon>
              返回上一页
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElIcon, ElButton } from 'element-plus'
import { House, Back } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  window.history.length > 1 
    ? window.history.go(-1) 
    : router.push('/')
}
</script>

<style scoped>
.not-found-container {
  width: 100%;
  height: 100vh;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
}

.stars {
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 1402px 1228px #FFF, 849px 1430px #FFF, 1391px 1263px #FFF, 
              495px 1473px #FFF, 1244px 1219px #FFF, 1673px 1222px #FFF, 
              1705px 675px #FFF, 1245px 1172px #FFF, 1620px 10px #FFF, 
              112px 1296px #FFF, 767px 615px #FFF, 1787px 435px #FFF;
  animation: animStar 50s linear infinite;
}

.stars:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 1402px 1228px #FFF, 849px 1430px #FFF, 1391px 1263px #FFF, 
              495px 1473px #FFF, 1244px 1219px #FFF, 1673px 1222px #FFF, 
              1705px 675px #FFF, 1245px 1172px #FFF, 1620px 10px #FFF, 
              112px 1296px #FFF, 767px 615px #FFF, 1787px 435px #FFF;
}

.stars2 {
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: 683px 1594px #FFF, 320px 1395px #FFF, 538px 656px #FFF, 
              1014px 1515px #FFF, 444px 918px #FFF, 1387px 283px #FFF, 
              1439px 262px #FFF, 1040px 311px #FFF, 381px 49px #FFF;
  animation: animStar 100s linear infinite;
}

.stars2:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: 683px 1594px #FFF, 320px 1395px #FFF, 538px 656px #FFF, 
              1014px 1515px #FFF, 444px 918px #FFF, 1387px 283px #FFF, 
              1439px 262px #FFF, 1040px 311px #FFF, 381px 49px #FFF;
}

.stars3 {
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: 1994px 1850px #FFF, 1421px 1706px #FFF, 1315px 441px #FFF, 
              344px 1668px #FFF, 168px 1949px #FFF, 1412px 255px #FFF;
  animation: animStar 150s linear infinite;
}

.stars3:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: 1994px 1850px #FFF, 1421px 1706px #FFF, 1315px 441px #FFF, 
              344px 1668px #FFF, 168px 1949px #FFF, 1412px 255px #FFF;
}

.central-body {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.error-card {
  width: 100%;
  position: relative;
}

.error-code {
  font-size: 8rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #f56c6c, #e6a23c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.error-title {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 2rem;
  letter-spacing: 2px;
}

.astronaut-container {
  position: relative;
  height: 150px;
  margin-bottom: 2rem;
}

.astronaut {
  width: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: float 6s ease-in-out infinite, rotate 15s linear infinite;
}

@keyframes float {
  0% {
    transform: translate(-50%, -50%);
  }
  50% {
    transform: translate(-50%, -70%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
}

@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.error-message {
  color: #e6e6e6;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.home-button, .back-button {
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
}

.home-button {
  background: linear-gradient(45deg, #409eff, #53a8ff);
  border: none;
}

.home-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 15px rgba(64, 158, 255, 0.3);
}

.back-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 15px rgba(144, 147, 153, 0.3);
}
</style>