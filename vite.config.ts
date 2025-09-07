import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
import pxtorem from 'postcss-pxtorem'
// https://vite.dev/config/
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, './src'),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/style/variables.scss" as *;
        @use "@/style/mixin.scss" as *;
        `
      }
    },
    postcss: {
      plugins: [
        pxtorem({
          rootValue: 14,
          propList: ['*'],
        })
      ]
    }
  },
  server: {
    open: true,
    port: 8080,
    proxy: {
      '/netease-api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        //secure: false: 不验证 SSL 证书。
        secure: false,
        rewrite: (path) => path.replace(/^\/netease-api/, '')
      }
    },

  }
})
