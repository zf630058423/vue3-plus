/**
 * 类库插件
 */
import Layout from '@/views/home/lib/index.vue'

const libRouter = {
  path: "/lib", //类库
  name: "lib",
  meta: { title: '类库插件' },
  component: Layout,
  children: [
    {
      path: "pinia",
      name: "pinia",
      meta: { title: 'pinia使用' },
      component: () => import("@/views/home/lib/pinia/index.vue"),
    },
    {
      path: "echarts",
      name: "echarts",
      meta: { title: 'echarts' },
      component: () => import("@/views/home/lib/echarts/index.vue"),
    },
  ]
}

export default libRouter