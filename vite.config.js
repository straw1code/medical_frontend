import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// vue.config.js 文件中设置
// import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue'; // 如果你使用 Vue 插件

// export default defineConfig({
//   plugins: [vue()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8080',
//         changeOrigin: true,
//         rewrite: path => path.replace(/^\/api/, ''),
//       },
//     },
//   },
// });



// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
