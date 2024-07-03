/**
 * 高级组件
 */

import Layout from '@/views/home/advanced/index.vue'

const advancedRouter = {
  path: "/advanced", //高级组件
  name: "advanced",
  meta: { title: '高级组件' },
  component: () => import("@/views/home/advanced/index.vue"),
  children: [
    {
      path: "/advanced/rowLay",
      name: "rowLay",
      meta: { title: '表单动态列布局' },
      component: () => import("@/views/home/advanced/rowLay/index.vue"),
    },
    {
      path: "/advanced/formLay",
      name: "formLay",
      meta: { title: '动态表单' },
      component: () => import("@/views/home/advanced/formLay/index.vue"),
    }
  ],
}

export default advancedRouter