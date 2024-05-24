import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    children: [
      {
        path: '/index', //首页
        name: '/index',
        component: () => import('../views/home/index/index.vue'),
      },
      {
        path: '/census', //统计管理
        name: '/census',
        component: () => import('../views/home/census/index.vue'),
      },
      {
        path: '/order', //订单管理
        name: '/order',
        component: () => import('../views/home/order/index.vue'),
        children: [
          {
            path: '/order/list', //列表管理
            name: '/orderList',
            component: () => import('../views/home/order/list/index.vue'),
          }
        ]
      },
      {
        path: '/user', //用户管理
        name: '/user',
        component: () => import('../views/home/user/index.vue'),
        children: [
          {
            path: '/user/stats', //用户统计
            name: 'userStats',
            component: () => import('../views/home/user/stats/index.vue'),
          },
          {
            path: '/user/role', //角色
            name: '/userRole',
            component: () => import('../views/home/user/role/index.vue'),
          }
        ]
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
