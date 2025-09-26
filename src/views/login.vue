<template>
  <div class="login-container">
    <div class="login-background">
      <div class="gradient-bg"></div>
      <div class="stars"></div>
      <div class="stars2"></div>
      <div class="circle-decoration circle-1"></div>
      <div class="circle-decoration circle-2"></div>
      <div class="circle-decoration circle-3"></div>
    </div>
    
    <div class="login-content">
      <div class="login-card">
        <!-- 左侧品牌信息 -->
        <div class="brand-section">
          <div class="logo-container">
            <div class="logo">
              <span>AI</span>
            </div>
          </div>
          <h1 class="brand-title">企业Ai智能体</h1>
          <p class="brand-intro">智能助手，为您提供全面的AI解决方案</p>
          <div class="brand-decoration"></div>
        </div>
        
        <!-- 右侧表单区域 -->
        <div class="form-section">
          <!-- 标签切换 -->
          <div class="form-tabs">
            <div 
              class="tab-item" 
              :class="{'active': isLogin}"
              @click="switchForm(true)"
            >
              登录
            </div>
            <div 
              class="tab-item" 
              :class="{'active': !isLogin}"
              @click="switchForm(false)"
            >
              注册
            </div>
          </div>
          
          <div class="form-container">
            <transition name="fade-transform" mode="out-in">
              <el-form 
                v-if="isLogin"
                ref="loginFormRef" 
                :model="loginForm" 
                :rules="loginRules"
                class="login-form"
                @keyup.enter="handleLogin"
              >
                <el-form-item prop="username">
                  <el-input
                    v-model="loginForm.username"
                    placeholder="请输入账号"
                    :prefix-icon="User"
                    size="large"
                  />
                </el-form-item>
                
                <el-form-item prop="password">
                  <el-input
                    v-model="loginForm.password"
                    type="password"
                    placeholder="请输入密码"
                    show-password
                    :prefix-icon="Lock"
                    size="large"
                  />
                </el-form-item>
                
                <el-form-item prop="captcha">
                  <div class="captcha-container">
                    <el-input
                      v-model="loginForm.captcha"
                      placeholder="请输入验证码"
                      :prefix-icon="PictureFilled"
                      size="large"
                    />
                    <div class="captcha-img" @click="refreshCaptcha">
                      <img :src="captchaImage" alt="验证码" />
                      <div class="refresh-icon">
                        <el-icon><Refresh /></el-icon>
                      </div>
                    </div>
                  </div>
                </el-form-item>
                
                <div class="form-options">
                  <el-checkbox v-model="loginForm.remember">七天免登录</el-checkbox>
                  <el-button link type="primary" class="forgot-password" @click="showForgotPassword">忘记密码?</el-button>
                </div>
                
                <el-button 
                  type="primary" 
                  class="login-button" 
                  @click="handleLogin" 
                  :loading="loading"
                  size="large"
                >
                  登录
                </el-button>

                <div class="switch-section">
                  <span>还没有账号?</span>
                  <el-button link type="primary" class="switch-link" @click="switchForm(false)">立即注册</el-button>
                </div>
              </el-form>
            
              <el-form 
                v-else
                ref="registerFormRef" 
                :model="registerForm" 
                :rules="registerRules"
                class="login-form register-form"
                @keyup.enter="handleRegister"
              >
                
                <el-form-item prop="username">
                  <el-input
                    v-model="registerForm.username"
                    placeholder="设置账号 (3-20个字符)"
                    :prefix-icon="User"
                    size="large"
                  />
                </el-form-item>
                
                <el-form-item prop="email">
                  <el-input
                    v-model="registerForm.email"
                    placeholder="电子邮箱"
                    :prefix-icon="Message"
                    size="large"
                  />
                </el-form-item>
                
                <el-form-item prop="password">
                  <el-input
                    v-model="registerForm.password"
                    type="password"
                    placeholder="设置密码 (6-20个字符)"
                    show-password
                    :prefix-icon="Lock"
                    size="large"
                  />
                </el-form-item>
                
                <el-form-item prop="confirmPassword">
                  <el-input
                    v-model="registerForm.confirmPassword"
                    type="password"
                    placeholder="确认密码"
                    show-password
                    :prefix-icon="Lock"
                    size="large"
                  />
                </el-form-item>
                
                <el-form-item prop="captcha">
                  <div class="captcha-container">
                    <el-input
                      v-model="registerForm.captcha"
                      placeholder="请输入验证码"
                      :prefix-icon="PictureFilled"
                      size="large"
                    />
                    <div class="captcha-img" @click="refreshCaptchaRegister">
                      <img :src="captchaImageRegister" alt="验证码" />
                      <div class="refresh-icon">
                        <el-icon><Refresh /></el-icon>
                      </div>
                    </div>
                  </div>
                </el-form-item>
                
                <el-button 
                  type="primary" 
                  class="login-button" 
                  @click="handleRegister" 
                  :loading="loading"
                  size="large"
                >
                  创建账号
                </el-button>

                <div class="switch-section">
                  <span>已有账号?</span>
                  <el-button link type="primary" class="switch-link" @click="switchForm(true)">立即登录</el-button>
                </div>
              </el-form>
            </transition>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 忘记密码对话框 -->
    <el-dialog
      v-model="forgotDialogVisible"
      :title="forgotStepTitle"
      width="500px"
      :close-on-click-modal="false"
      @closed="handleForgotClose"
      style="border-radius: 6px; padding: 20px;"
    >
      <el-steps :active="forgotStep" finish-status="success" simple style="padding: 12px;">
        <el-step title="找回账号" />
        <el-step title="验证邮箱" />
        <el-step title="重置密码" />
      </el-steps>
      
      <el-form
        ref="forgotFormRef"
        :model="forgotForm"
        :rules="forgotRules"
        label-position="top"
        style="margin-top: 20px;"
        @keyup.enter="handleForgotSubmit"
      >
        <!-- 步骤1: 输入邮箱 -->
        <template v-if="forgotStep === 1">
          <el-form-item label="注册邮箱" prop="email">
            <el-input
              v-model="forgotForm.email"
              placeholder="请输入注册时使用的邮箱"
              :prefix-icon="Message"
            />
          </el-form-item>
        </template>
        
        <!-- 步骤2: 验证码 -->
        <template v-if="forgotStep === 2">
          <el-alert
            title="验证码已发送到您的邮箱，请查收"
            type="success"
            :closable="false"
            show-icon
            style="margin-bottom: 15px;"
          />
          
          <el-form-item label="邮箱验证码" prop="code">
            <div style="display: flex; gap: 10px;">
              <el-input
                v-model="forgotForm.code"
                placeholder="请输入6位验证码"
                maxlength="6"
              />
              <el-button 
                type="primary" 
                :disabled="emailCodeCountdown > 0"
                @click="sendEmailCode"
                style="flex-shrink: 0; width: 100px;"
              >
                {{ emailCodeCountdown > 0 ? `${emailCodeCountdown}s` : '重新发送' }}
              </el-button>
            </div>
          </el-form-item>
        </template>
        
        <!-- 步骤3: 设置新密码 -->
        <template v-if="forgotStep === 3">
          <el-form-item label="新密码" prop="password">
            <el-input
              v-model="forgotForm.password"
              type="password"
              placeholder="请设置新密码"
              show-password
              :prefix-icon="Lock"
            />
          </el-form-item>
          
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              v-model="forgotForm.confirmPassword"
              type="password"
              placeholder="请再次输入新密码"
              show-password
              :prefix-icon="Lock"
            />
          </el-form-item>
        </template>
      </el-form>
      
      <template #footer>
        <div style="text-align: right;">
          <el-button @click="forgotDialogVisible = false">取消</el-button>
          <el-button v-if="forgotStep > 1" @click="forgotPrevStep">上一步</el-button>
          <el-button 
            type="primary" 
            @click="handleForgotSubmit"
            :loading="resetPwdLoading"
          >
            {{ forgotStep < 3 ? '下一步' : '完成' }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import { 
  User, 
  Lock, 
  PictureFilled, 
  Refresh, 
  ChatDotRound, 
  MessageBox, 
  Share,
  Message 
} from '@element-plus/icons-vue'
import { encode } from 'js-base64'

const router = useRouter()
const loading = ref(false)
const isLogin = ref(true)
const loginFormRef = ref<FormInstance>()
const registerFormRef = ref<FormInstance>()

// 登录表单数据
const loginForm = reactive({
  username: '15017872695',
  password: 'aA123456.',
  captcha: '',
  remember: false
})

// 注册表单数据
const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  captcha: ''
})

// 验证码答案(实际项目中应该存储在会话或服务器中)
const captchaAnswer = ref('')
const captchaAnswerRegister = ref('')

// 忘记密码相关状态
const forgotDialogVisible = ref(false)
const forgotStep = ref(1) // 1: 输入邮箱, 2: 输入验证码, 3: 设置新密码
const forgotFormRef = ref<FormInstance>()
const resetPwdLoading = ref(false)
const emailCodeCountdown = ref(0)
let countdownTimer: number | null = null

// 忘记密码表单数据
const forgotForm = reactive({
  email: '',
  code: '',
  password: '',
  confirmPassword: ''
})

// 表单验证规则
const validatePass = (rule: any, value: string, callback: any) => {
  // 密码复杂度要求：至少包含大写字母、小写字母、数字和特殊字符中的三种
  const patterns = [/[A-Z]/, /[a-z]/, /[0-9]/, /[!@#$%^&*(),.?":{}|<>]/]
  const patternCount = patterns.reduce((count, pattern) => {
    return count + (pattern.test(value) ? 1 : 0)
  }, 0)
  
  if (patternCount < 3) {
    callback(new Error('密码需包含大写字母、小写字母、数字和特殊字符中的至少三种'))
  } else {
    callback()
  }
}

const validateConfirmPass = (rule: any, value: string, callback: any) => {
  if (value !== registerForm.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const validateEmail = (rule: any, value: string, callback: any) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  if (!emailRegex.test(value)) {
    callback(new Error('请输入有效的电子邮箱地址'))
  } else {
    callback()
  }
}

const validateCaptcha = (rule: any, value: string, callback: any) => {
  if (isLogin.value) {
    if (value.toLowerCase() !== captchaAnswer.value.toLowerCase()) {
      callback(new Error('验证码不正确'))
    } else {
      callback()
    }
  } else {
    if (value.toLowerCase() !== captchaAnswerRegister.value.toLowerCase()) {
      callback(new Error('验证码不正确'))
    } else {
      callback()
    }
  }
}

// 忘记密码确认密码验证
const validateForgotConfirmPass = (rule: any, value: string, callback: any) => {
  if (value !== forgotForm.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const loginRules = {
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { validator: validateCaptcha, trigger: 'blur' }
  ]
}

const registerRules = {
  username: [
    { required: true, message: '请设置账号', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '账号只能包含字母、数字和下划线', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入电子邮箱', trigger: 'blur' },
    { validator: validateEmail, trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请设置密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirmPass, trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { validator: validateCaptcha, trigger: 'blur' }
  ]
}

// 忘记密码表单验证规则
const forgotRules = {
  email: [
    { required: true, message: '请输入电子邮箱', trigger: 'blur' },
    { validator: validateEmail, trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '验证码为6位数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请设置密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateForgotConfirmPass, trigger: 'blur' }
  ]
}

// 忘记密码步骤标题计算属性
const forgotStepTitle = computed(() => {
  switch (forgotStep.value) {
    case 1: return '找回密码'
    case 2: return '验证邮箱'
    case 3: return '设置新密码'
    default: return '找回密码'
  }
})

// 验证码图片
const captchaImage = ref('')
const captchaImageRegister = ref('')

// 使用第三方库生成验证码
const generateCaptcha = () => {
  // 在实际项目中，这里应该调用svg-captcha来生成验证码
  // 这里为了简化，我们使用一个函数模拟生成随机验证码
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let result = ''
  
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return result
}

// 生成验证码图片的Base64
const generateCaptchaImage = (text: string) => {
  // 在实际项目中，这里应该使用svg-captcha生成SVG
  // 为了演示，我们生成一个简单的带随机背景和扭曲文字的canvas
  
  // 创建canvas元素
  const canvas = document.createElement('canvas')
  canvas.width = 120
  canvas.height = 40
  const ctx = canvas.getContext('2d')
  
  if (ctx) {
    // 背景
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#f0f5ff")
    gradient.addColorStop(1, "#e6f7ff")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // 添加干扰线
    for (let i = 0; i < 8; i++) {
      ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, 0.3)`
      ctx.beginPath()
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
      ctx.stroke()
    }
    
    // 添加干扰点
    for (let i = 0; i < 80; i++) {
      ctx.fillStyle = `rgba(${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}, 0.5)`
      ctx.beginPath()
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, Math.PI * 2)
      ctx.fill()
    }
    
    // 设置文字
    ctx.font = 'bold 24px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    // 绘制文字，每个字符微调角度和位置
    const textWidth = ctx.measureText(text).width
    const startX = (canvas.width - textWidth) / 2 + 10
    
    for (let i = 0; i < text.length; i++) {
      const charWidth = ctx.measureText(text[i]).width
      const x = startX + i * charWidth * 1.3
      const y = canvas.height / 2 + Math.random() * 8 - 4
      
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(Math.random() * 0.4 - 0.2)
      
      // 随机颜色
      const hue = Math.floor(Math.random() * 360)
      ctx.fillStyle = `hsl(${hue}, 70%, 40%)`
      
      ctx.fillText(text[i], 0, 0)
      ctx.restore()
    }
  }
  
  return canvas.toDataURL('image/png')
}

// 刷新验证码(登录)
const refreshCaptcha = () => {
  const newCaptcha = generateCaptcha()
  captchaAnswer.value = newCaptcha
  captchaImage.value = generateCaptchaImage(newCaptcha)
}

// 刷新验证码(注册)
const refreshCaptchaRegister = () => {
  const newCaptcha = generateCaptcha()
  captchaAnswerRegister.value = newCaptcha
  captchaImageRegister.value = generateCaptchaImage(newCaptcha)
}

// 切换登录/注册表单
const switchForm = (isLoginForm: boolean) => {
  isLogin.value = isLoginForm
  // 切换表单时刷新验证码
  if (isLoginForm) {
    refreshCaptcha()
  } else {
    refreshCaptchaRegister()
  }
}

// 显示忘记密码对话框
const showForgotPassword = () => {
  forgotDialogVisible.value = true
  forgotStep.value = 1
  resetForgotForm()
}

// 重置忘记密码表单
const resetForgotForm = () => {
  forgotForm.email = ''
  forgotForm.code = ''
  forgotForm.password = ''
  forgotForm.confirmPassword = ''
  
  if (forgotFormRef.value) {
    forgotFormRef.value.clearValidate()
  }
  
  if (countdownTimer) {
    window.clearInterval(countdownTimer)
    countdownTimer = null
  }
  emailCodeCountdown.value = 0
}

// 发送邮箱验证码
const sendEmailCode = () => {
  if (forgotFormRef.value) {
    forgotFormRef.value.validateField('email', (valid: boolean) => {
      if (valid) {
        // 这里应该调用发送验证码的API
        emailCodeCountdown.value = 60
        if (countdownTimer) {
          window.clearInterval(countdownTimer)
        }
        
        countdownTimer = window.setInterval(() => {
          if (emailCodeCountdown.value > 0) {
            emailCodeCountdown.value--
          } else {
            if (countdownTimer) {
              window.clearInterval(countdownTimer)
              countdownTimer = null
            }
          }
        }, 1000)
        
        ElMessage.success(`验证码已发送到邮箱: ${forgotForm.email}`)
      }
    })
  }
}

// 处理忘记密码表单提交
const handleForgotSubmit = () => {
  if (!forgotFormRef.value) return
  
  forgotFormRef.value.validate((valid: boolean) => {
    if (valid) {
      if (forgotStep.value === 1) {
        // 第一步验证通过，进入下一步
        forgotStep.value = 2
      } else if (forgotStep.value === 2) {
        // 验证码验证，这里应该调用验证API
        // 模拟验证成功
        resetPwdLoading.value = true
        setTimeout(() => {
          resetPwdLoading.value = false
          forgotStep.value = 3
        }, 1000)
      } else if (forgotStep.value === 3) {
        // 提交新密码
        resetPwdLoading.value = true
        
        // 模拟API请求
        setTimeout(() => {
          resetPwdLoading.value = false
          ElMessage.success('密码已重置，请使用新密码登录')
          forgotDialogVisible.value = false
          resetForgotForm()
        }, 1500)
      }
    }
  })
}

// 上一步
const forgotPrevStep = () => {
  if (forgotStep.value > 1) {
    forgotStep.value--
  }
}

// 关闭时清理
const handleForgotClose = () => {
  resetForgotForm()
  if (countdownTimer) {
    window.clearInterval(countdownTimer)
    countdownTimer = null
  }
}

// 登录处理
const handleLogin = () => {
  if (!loginFormRef.value) return
  
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      
      // 模拟登录请求
      setTimeout(() => {
        loading.value = false
        ElMessage.success('登录成功')
        router.push('/')
      }, 1500)
    } else {
      ElMessage.error('请完成所有必填项并确保输入正确')
    }
    // 模拟存储 token
    localStorage.setItem('token', 'ASHX256978NVKOU912AXsnvi2pp9912');
  })
}

// 注册处理
const handleRegister = () => {
  if (!registerFormRef.value) return
  
  registerFormRef.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      
      // 模拟注册请求
      setTimeout(() => {
        loading.value = false
        ElMessage.success('注册成功，请登录')
        
        // 清空注册表单
        registerForm.username = ''
        registerForm.email = ''
        registerForm.password = ''
        registerForm.confirmPassword = ''
        registerForm.captcha = ''
        
        // 切换到登录表单
        switchForm(true)
      }, 1500)
    } else {
      ElMessage.error('请完成所有必填项并确保输入正确')
    }
  })
}

// 初始化验证码
onMounted(() => {
  refreshCaptcha()
  refreshCaptchaRegister()
})
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "PingFang SC", "Helvetica Neue", Helvetica, "Microsoft YaHei", Arial, sans-serif;
  padding: 0;
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.gradient-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(125deg, #1a365d, #3498db, #1a365d);
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
  background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
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

.login-content {
  z-index: 10;
  width: 100%;
  max-width: 720px;
  height: 100%;
  margin: 0 20px;
  display: flex;
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  position: relative;
  width: 100%;
  height: 100vh;
  max-height: none;
  display: flex;
  overflow: hidden;
}

/* 左侧品牌区域 */
.brand-section {
  width: 40%;
  background: linear-gradient(135deg, #1a365d, #2980b9);
  color: white;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  height: 100%;
}

.brand-decoration {
  position: absolute;
  bottom: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  z-index: 0;
}

.brand-section::before {
  content: '';
  position: absolute;
  top: -80px;
  left: -80px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.logo-container {
  margin-bottom: 25px;
  position: relative;
  z-index: 1;
}

.logo {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3498db, #2980b9);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  border: 4px solid rgba(255, 255, 255, 0.2);
}

.logo span {
  color: white;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 1px;
}

.brand-title {
  font-size: 25px;
  font-weight: 600;
  margin: 0 0 12px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.brand-intro {
  font-size: 14px;
  opacity: 0.9;
  max-width: 80%;
  text-align: center;
  line-height: 1.6;
  margin: 0;
  position: relative;
  z-index: 1;
}

/* 右侧表单区域 */
.form-section {
  width: 60%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}

.form-tabs {
  display: flex;
  justify-content: center;
  position: relative;
}

/* .form-tabs::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 25%;
  right: 25%;
  height: 1px;
  background-color: #e0e0e0;
  z-index: 0;
} */

.tab-item {
  padding: 0 13px 7px;
  margin: 0 13px;
  font-size: 15px;
  color: #999;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
}

.tab-item.active {
  color: #3498db;
  font-weight: 500;
}

.tab-item.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #3498db;
  z-index: 1;
}

.form-container {
  position: relative;
  max-height: none;
  height: auto;
  overflow: visible;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.login-form {
  margin-top:30px;
}

.login-form:not(.register-form) .el-form-item {
  margin-bottom: 20px;
}

.register-form .el-form-item {
  margin-bottom: 20px;
}

.register-form .form-options {
  margin: 4px 0;
}

.register-form .login-button {
  margin: 20px 0;
  margin-top: 10px;
}

.register-form .switch-section {
  margin-top: 8px;
}

.captcha-container {
  display: flex;
  gap: 12px;
}

.captcha-container .el-input {
  flex-grow: 1;
}

.captcha-img {
  width: 100px;
  height: 36px;
  border-radius: 7px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  position: relative;
  transition: all 0.3s;
  flex-shrink: 0;
}

.captcha-img:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.captcha-img:hover .refresh-icon {
  opacity: 1;
}

.captcha-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.refresh-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
  color: white;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
  flex-wrap: wrap;
  font-size: 14px;
}

.terms-link {
  padding: 0 2px;
}

.hidden-item {
  margin: 0;
  height: 0;
  overflow: hidden;
}

.login-button {
  width: 100%;
  border-radius: 6px;
  font-size: 13px;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  border: none;
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
  transition: all 0.3s;
  margin: 5px 0;
}

.login-button:hover {
  box-shadow: 0 8px 20px rgba(52, 152, 219, 0.5);
  transform: translateY(-2px);
}

.switch-section {
  margin-top: 12px;
  text-align: center;
  font-size: 14px;
  color: #666;
}

.switch-link {
  margin-left: 5px;
  font-weight: 500;
}

.divider {
  display: flex;
  align-items: center;
  margin: 16px 0 12px;
  color: #999;
  font-size: 13px;
}

.divider::before, 
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #e0e0e0;
}

.divider span {
  padding: 0 15px;
}

.social-logins {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 12px;
}

.social-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.social-icon:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.wechat {
  background: #07c160;
}

.qq {
  background: #12b7f5;
}

.weibo {
  background: #e6162d;
}

/* 过渡动画 */
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.4s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* 设置表单内所有输入框的高度缩小 */
.el-input__wrapper {
  font-size: 13px !important;
}

.el-input__inner {
  height: 32px !important;
}

:deep(.el-dialog__body) {
  padding-top: 10px;
}

:deep(.el-steps--simple) {
  padding: 10px 0;
  background-color: #f5f7fa;
  border-radius: 4px;
}

:deep(.el-dialog__title) {
  font-weight: 500;
  font-size: 16px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
}

:deep(.el-alert) {
  margin-bottom: 15px;
}

/* PC端隐藏移动端提示文字 */
.mobile-brand-shrink-hint {
  display: none;
}
</style>