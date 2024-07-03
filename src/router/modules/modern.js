/**
 * 现代css
 */
import Layout from '@/views/home/modern/index.vue'

const modernRouter = {
  path: "/modern", //现代css
  name: "modern",
  meta: { title: '现代css' },
  component: () => import("@/views/home/modern/index.vue"),
  children: [
    {
      path: "/modern/border",
      name: "border",
      meta: { title: '边框' },
      component: () => import("@/views/home/modern/border/index.vue"),
    },
    {
      path: "/modern/boxShadow",
      name: "boxShadow",
      meta: { title: '阴影' },
      component: () => import("@/views/home/modern/boxShadow/index.vue"),
    },
    {
      path: "/modern/gradient",
      name: "gradient",
      meta: { title: '线性' },
      component: () => import("@/views/home/modern/gradient/index.vue"),
    },
  ],
}

export default modernRouter