import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { toSmallTF } from "/@/utils"
const Layout = () => import('/@c/Layout/index.vue')
// const chats = () => import('/@c/views/main/chats.vue')
// const settings = () => import('/@c/views/main/settings.vue')
// const welcome = () => import('/@c/views/main/welcome.vue')
const welcome = () => import('../views/main/welcome.vue')
const chats = () => import('../views/main/chats.vue')
const settings = () => import('../views/main/settings.vue')

const createRoute = (path: string, defaultCom: any, path2?: string, path2Com?: any, mainCom?: any): RouteRecordRaw[] => {
  let components
  if (mainCom) {
    components = {
      default: defaultCom,
      main: mainCom
    }
  } else {
    components = {
      default: defaultCom
    }
  }
  const route: RouteRecordRaw = {
    path,
    name: path,
    components
  }
  if (path2) {
    const route2: RouteRecordRaw = {
      path: `${path}/${path2}`,
      name: toSmallTF(`${path}/${path2}`),
      components: {
        default: defaultCom,
        main: path2Com
      }
    }
    return [route, route2]
  }
  return [route]
}

const aa = createRoute('chat', chats, 'settings', settings, welcome)

const routes: RouteRecordRaw[] = [
  {
    path: '/', name: 'home', component: Layout, redirect: '/chats',
    children: [
      // {
      //   path: 'chats', name: 'chats', components: {
      //     default: chats,
      //     main: welcome
      //   }
      // },
      // {
      //   path: 'chats/settings', name: 'chatsSettings', components: {
      //     default: () => import('/@/views/main/chats.vue'),
      //     main: () => import('/@/views/main/settings.vue')
      //   }
      // },
      // ...createRoute('chat', chats(), 'settings', settings(), welcome()),
      ...aa,

      { path: 'group', name: 'group', component: () => import('/@/views/main/group.vue') },
      { path: 'friends', name: 'friends', component: () => import('/@/views/main/friends.vue') },
      { path: 'zone', name: 'zone', component: () => import('/@/views/main/zone.vue') },
      { path: 'profile', name: 'profile', component: () => import("/@/views/main/profile.vue") },
      {
        path: 'messaging', name: 'messaging', components: {
          default: () => import("/@/views/main/chats.vue"),
          main: () => import("/@/views/main/messaging.vue")
        }
      },
      // {
      //   path: 'settings', name: 'settings', components: {
      //     default: () => import("/@/views/main/chats.vue"),
      //     main: () => import("/@/views/main/settings.vue")
      //   }
      // },
    ]
  },
  { path: '/login', name: 'login', component: () => import('/@/views/login/index.vue') },
  { path: '/update', name: 'update', component: () => import('/@/views/login/update.vue') }
]

console.log(routes);


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    else {
      return { top: 0 }
    }
  }
})

export default router