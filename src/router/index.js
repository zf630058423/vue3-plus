import { createRouter, createWebHistory } from 'vue-router'
import guideRouter from './modules/guide' //开发指南
import commonRouter from './modules/common' //常用组件
import advancedRouter from './modules/advanced' //高级组件
import modernRouter from './modules/modern' //现代CSS
import libRouter from './modules/lib' //类库
import funRouter from './modules/fun' //函数

const routeModuleList = [guideRouter, commonRouter, advancedRouter, modernRouter, libRouter, funRouter]

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/index',
    meta: { title: '首页' },
    component: () => import('../views/home/index.vue'),
    children: [
      {
        path: '/index', //首页
        name: '/index',
        meta: { title: '首页' },
        component: () => import('../views/home/main/index.vue'),
      },
      ...routeModuleList,
      {
        path: "/asyncSlot",
        name: "asyncSlot",
        meta: { title: '异步插槽' },
        component: () => import("../views/home/slot/AsyncSlot.vue"),
      },
      {
        path: "/transition",
        name: "transition",
        meta: { title: 'transition' },
        component: () => import("../views/home/transition/index.vue"),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // model: 'history',
  // base: '/',
  routes
})

export default router
