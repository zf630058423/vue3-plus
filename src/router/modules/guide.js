/**
 * 开发指南
 */
import Layout from '@/views/home/guide/index.vue'

const guideRouter = {
  path: "/guide",
  name: "guide",
  meta: { title: '开发指南' },
  component: Layout,
  children: [
    {
      path: "description",
      name: "index",
      meta: { title: '项目说明' },
      component: () =>
        import("@/views/home/guide/description/index.vue"),
    }, //项目说明
    {
      path: "toolLibrary",
      name: "toolLibrary",
      meta: { title: '工具库合集' },
      component: () =>
        import("@/views/home/guide/toolLibrary/index.vue"),
    }, //工具库合集
  ],
}

export default guideRouter