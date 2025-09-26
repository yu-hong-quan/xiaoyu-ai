import { defineStore } from 'pinia'
import axios from 'axios'

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as Message[],
  }),

  actions: {
    async sendMessage(content: string) {
      this.messages.push({ role: 'user', content })
      
      // 这里先模拟AI回复，实际应替换为API调用
      this.messages.push({
        role: 'assistant',
        content: '这是AI的模拟回复，请配置真实API接口'
      })

      /* 真实API调用示例（需配置API_KEY）
      const response = await axios.post('/api/chat', {
        message: content,
        history: this.messages
      })
      this.messages.push({
        role: 'assistant',
        content: response.data.answer
      })
      */
    }
  }
})