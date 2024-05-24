import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

//引入样式文件
import './styles/index.scss'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

//引入自定义组件
import Icon from './components/Icon/Icon.vue'

const app = createApp(App)

//注册fontawesome组件
app.component('font-awesome-icon', FontAwesomeIcon)

//注册自定义组件
app.component('Zf-Icon', Icon)

app.use(createPinia())
app.use(router)

// app.use(ElementPlus)

app.mount('#app')
