import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import compression from 'vite-plugin-compression'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/], // 添加热更新支持
      template: {
        compilerOptions: {
          // 兼容性配置
          isCustomElement: (tag) => tag.startsWith('ion-')
        }
      }
    }),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    },
    assetsInlineLimit: 4096
  },
  optimizeDeps: {
    include: ['vue', 'element-plus']
  },
  cacheDir: './.vite_cache',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
