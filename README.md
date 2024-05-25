# vue3-plus

vue3 插件库项目

### 使用的工具

#### 状态管理 pinia

```
官网：https://pinia.vuejs.org/
中文网：https://pinia.vuejs.org/zh/
```

### UI 框架

```
http://element-plus.org/
```

### 全局安装 pnpm

```
npm install -g pnpm
```

### 依赖加载

```
pnpm i
```

### 启动项目

```
pnpm dev
```

### 按需加载 自动导入

```
安装 unplugin-vue-components
```

```
 pnpm install element-plus -D
```

#### 然后将以下代码添加到 vite 或 webpack 配置文件中

```
import Components from 'unplugin-vue-components/vite'
```

```
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
```

```
export default {
plugins: [
//...
Components({
resolvers: [ElementPlusResolver()],
})
]
}
```
