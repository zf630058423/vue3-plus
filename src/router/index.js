import { createRouter, createWebHistory } from 'vue-router'

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
      {
        path: "/guide",
        name: "guide",
        meta: { title: '开发指南' },
        component: () => import("../views/home/guide/index.vue"),
        children: [
          {
            path: "/guide/description",
            name: "index",
            meta: { title: '项目说明' },
            component: () =>
              import("../views/home/guide/description/index.vue"),
          }, //项目说明
          {
            path: "/guide/toolLibrary",
            name: "toolLibrary",
            meta: { title: '工具库合集' },
            component: () =>
              import("../views/home/guide/toolLibrary/index.vue"),
          }, //工具库合集
        ],
      },
      {
        path: "/common", //常用组件
        name: "common",
        meta: { title: '常用组件' },
        component: () => import("../views/home/common/index.vue"),
        children: [
          {
            path: "/common/textInput", //文本框组件
            name: "textInput",
            meta: { title: '文本框组件' },
            component: () => import("../views/home/common/text/textInput.vue"),
          },
          {
            path: "/common/upload", //文件上传组件
            name: "upload",
            meta: { title: '文件上传组件' },
            component: () => import("../views/home/common/upload/index.vue"),
          },
        ],
      },
      {
        path: "/advanced", //高级组件
        name: "advanced",
        meta: { title: '高级组件' },
        component: () => import("../views/home/advanced/index.vue"),
        children: [
          {
            path: "/advanced/rowLay",
            name: "rowLay",
            meta: { title: '表单动态列布局' },
            component: () => import("../views/home/advanced/rowLay/index.vue"),
          },
          {
            path: "/advanced/formLay",
            name: "formLay",
            meta: { title: '动态表单' },
            component: () => import("../views/home/advanced/formLay/index.vue"),
          }
        ],
      },
      {
        path: "/modern", //现代css
        name: "modern",
        meta: { title: '现代css' },
        component: () => import("../views/home/modern/index.vue"),
        children: [
          {
            path: "/modern/border",
            name: "border",
            meta: { title: '边框' },
            component: () => import("../views/home/modern/border/index.vue"),
          },
          {
            path: "/modern/boxShadow",
            name: "boxShadow",
            meta: { title: '阴影' },
            component: () => import("../views/home/modern/boxShadow/index.vue"),
          },
          {
            path: "/modern/gradient",
            name: "gradient",
            meta: { title: '线性' },
            component: () => import("../views/home/modern/gradient/index.vue"),
          },
        ],
      },
      {
        path: "/lib", //类库
        name: "lib",
        meta: { title: '类库' },
        component: () => import("../views/home/lib/index.vue"),
      },
      {
        path: "/fun", //函数
        name: "fun",
        meta: { title: '函数' },
        component: () => import("../views/home/fun/index.vue"),
        children: [
          {
            path: "/fun/decimalCalcu",
            name: "decimalCalcu",
            meta: { title: '计算' },
            component: () => import("../views/home/fun/decimalCalcu/index.vue"),
          },
          {
            path: "/fun/ordinary", //普通函数
            name: "ordinary",
            meta: { title: '普通函数' },
            component: () => import("../views/home/fun/ordinary/index.vue"),
          },
          {
            path: "/fun/sortAlgorithm", //排序算法
            name: "sortAlgorithm",
            meta: { title: '排序算法' },
            component: () =>
              import("../views/home/fun/sortAlgorithm/index.vue"),
          },
          {
            path: "/fun/designPatterns", //设计模式
            name: "designPatterns",
            meta: { title: '设计模式' },
            component: () =>
              import("../views/home/fun/designPatterns/index.vue"),
          },
        ],
      },
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
