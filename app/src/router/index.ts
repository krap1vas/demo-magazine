import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterPage.vue')
  },
  {
    path: '/auth',
    component: () => import(/* webpackChunkName: "about" */ '../views/AuthPage.vue')
  },
  {
    path: '/all',
    component: () => import(/* webpackChunkName: "about" */ '../views/AllRequests.vue')
  },
  {
    path: '/main',
    component: () => import(/* webpackChunkName: "about" */ '../views/MainPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
