import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getToken } from '@/utils/auth'
import CancelToken from '@/api/CancelToken'

const routes: RouteRecordRaw[] = [
  {
    path: '/', name: 'home', component: () => import('@c/Layout/index.vue'),
    children: [
      {
        path: '/', name: 'chats', components: {
          default: () => import('@/views/main/chats.vue'),
          main: () => import('@/views/main/welcome.vue')
        }
      },
      { path: 'group', name: 'group', component: () => import('@/views/main/group.vue') },
      { path: 'friends', name: 'friends', component: () => import('@/views/main/friends.vue') },
      { path: 'zone', name: 'zone', component: () => import('@/views/main/zone.vue') },
      {
        path: 'settings', name: 'settings', components: {
          default: () => import('@/views/main/chats.vue'),
          main: () => import('@/views/main/settings.vue')
        }
      },
      { path: 'profile', name: 'profile', component: () => import("@/views/main/profile.vue") },
      {
        path: 'chating/:chatId', name: 'chating', components: {
          default: () => import('@/views/main/chats.vue'),
          main: () => import('@/views/chat/chating.vue')
        }
      }
    ]
  },
  { path: '/login', name: 'login', component: () => import('@/views/login/index.vue') },
  { path: '/update', name: 'update', component: () => import('@/views/login/update.vue') },
  { path: '/404', name: '404', component: () => import('@/views/error/404.vue') },
  { path: '/500', name: '500', component: () => import('@/views/error/500.vue') },
  { path: '/chatings', name: 'chatings', component: () => import("@/views/chat/chating.vue") }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // 路由跳转要清除之前所有的请求缓存
  CancelToken.clearPending()

  const hasToken = getToken()
  if (hasToken) {
    if (to.fullPath === '/login') {
      next({ path: '/' })
    } else {
      if (!to.matched.length) {
        next({ path: '/404' })
      }
      next()
    }
  } else {
    if (to.fullPath === '/login') {
      next() // 判断是否是 /login 跳 /login 防止无线递归循环
    } else {
      next({ path: '/login' })
    }
  }
})

export default router