import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { getToken } from '../utils/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/', name: 'home', component: () => import('/@c/Layout/index.vue'),
    children: [
      {
        path: '/', name: 'chats', components: {
          default: () => import('/@/views/main/chats.vue'),
          main: () => import('/@/views/main/welcome.vue')
        }
      },
      { path: 'group', name: 'group', component: () => import('/@/views/main/group.vue') },
      { path: 'friends', name: 'friends', component: () => import('/@/views/main/friends.vue') },
      { path: 'zone', name: 'zone', component: () => import('/@/views/main/zone.vue') },
      {
        path: 'settings', name: 'settings', components: {
          default: () => import('/@/views/main/chats.vue'),
          main: () => import('/@/views/main/settings.vue')
        }
      },
      { path: 'profile', name: 'profile', component: () => import("/@/views/main/profile.vue") }
    ]
  },
  { path: '/login', name: 'login', component: () => import('/@/views/login/index.vue') },
  { path: '/update', name: 'update', component: () => import('/@/views/login/update.vue') },
  { path: '/404', name: '404', component: () => import('/@/views/error/404.vue') },
  { path: '/500', name: '500', component: () => import('/@/views/error/500.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // const hasToken = getToken()
  // console.log(hasToken);
  // if (hasToken) {
  next()
  // } else {
  // next({ path: '/login' })
  // }
})

export default router