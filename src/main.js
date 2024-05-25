import './assets/main.scss'

//引入依赖和语言
import 'highlight.js/styles/stackoverflow-light.css'
// import hljs from "highlight.js/lib/core";
import 'highlight.js/lib/common'
import hljsVuePlugin from "@highlightjs/vue-plugin";
// import javascript from 'highlight.js/lib/languages/javascript';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

//引入样式文件
import './styles/index.scss'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

// hljs.registerLanguage('javascript', javascript);

//引入自定义组件
import Icon from './components/Icon/Icon.vue'

const app = createApp(App)

//注册fontawesome组件
app.component('font-awesome-icon', FontAwesomeIcon)

//注册自定义组件
app.component('Zf-Icon', Icon)

app.use(hljsVuePlugin)
app.use(createPinia())
app.use(router)

app.mount('#app')
