# vue3-plus
vue3插件库

# 

# pnpm install element-plus --save

# 按需导入
安装 unplugin-vue-components
pnpm install unplugin-vue-components -S
然后将以下代码添加到vite或webpack配置文件中
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default {
  plugins: [
    //...
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ]
}