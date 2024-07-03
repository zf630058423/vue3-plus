/**
 * 函数
 */
import Layout from '@/views/home/fun/index.vue'


const funRouter = {
  path: "/fun", //函数
  name: "fun",
  meta: { title: '函数' },
  component: Layout,
  children: [
    {
      path: "/fun/decimalCalcu",
      name: "decimalCalcu",
      meta: { title: '计算' },
      component: () => import("@/views/home/fun/decimalCalcu/index.vue"),
    },
    {
      path: "/fun/ordinary", //普通函数
      name: "ordinary",
      meta: { title: '普通函数' },
      component: () => import("@/views/home/fun/ordinary/index.vue"),
    },
    {
      path: "/fun/sortAlgorithm", //排序算法
      name: "sortAlgorithm",
      meta: { title: '排序算法' },
      component: () =>
        import("@/views/home/fun/sortAlgorithm/index.vue"),
    },
    {
      path: "/fun/designPatterns", //设计模式
      name: "designPatterns",
      meta: { title: '设计模式' },
      component: () =>
        import("@/views/home/fun/designPatterns/index.vue"),
    },
  ],
}

export default funRouter