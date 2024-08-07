/**
 * 常用组件
 */

import Layout from '@/views/home/common/index.vue'

const commonRouter = {
  path: "/common", //常用组件 
  name: "common",
  meta: { title: '常用组件' },
  component: Layout,
  children: [
    {
      path: "zfIcon", //封装Icon组件
      name: "zfIcon",
      meta: { title: '封装Icon组件' },
      component: () => import("@/views/home/common/icon/index.vue"),
    },
    {
      path: "textInput", //文本框组件
      name: "textInput",
      meta: { title: '文本框组件' },
      component: () => import("@/views/home/common/text/textInput.vue"),
    },
    {
      path: "treeCascader", //tree下拉组件
      name: "treeCascader",
      meta: { title: 'treeCascader组件' },
      component: () => import("@/views/home/common/treeCascader/index.vue"),
    },
    {
      path: "upload", //文件上传组件
      name: "upload",
      meta: { title: '文件上传组件' },
      component: () => import("@/views/home/common/upload/index.vue"),
    },
  ],
}

export default commonRouter