import { UserData } from "@/api"
import { message } from 'ant-design-vue'
import router from '@/router'
import type { Module } from "vuex"
import { UserLoginResp, Result, ILogin } from "@/api/type"
import { getToken, getUserInfo, setRemember, setToken, setUserInfo, storageClear } from "@/utils/auth"

interface State {
  token: string | null,
  userInfo: object
}

const user: Module<State, any> = {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: getUserInfo() // 用户信息
  },
  mutations: {
    setToken(state: State, token: string) {
      state.token = token
      setToken(token)
    },
    setUserInfo(state: State, userInfo: object) {
      state.userInfo = userInfo
      setUserInfo(userInfo)
    }
  },
  actions: {
    async login({ commit }, data: ILogin) {
      return new Promise((resolve, reject) => {
        UserData.login(data.form).then((res: Result<UserLoginResp>) => {
          setRemember(data.form.remember ? 1 : 0) // 记住我
          if (res.data) {
            commit('setToken', res.data.token)
            commit('setUserInfo', res.data.userInfo)
            message.success('登录成功')

            // socket 通知 该用户已上线
            const onlineInfo = {
              token: res.data.token,
              userInfo: res.data.userInfo
            }
            data.cb && data.cb(onlineInfo)

            setTimeout(() => {
              if (res.data && res.data.userInfo.isnew) {
                router.replace('/update')
              } else {
                router.replace('/')
              }
            }, 1500)
          }
          resolve(res)
        }, err => reject(err))
      })
    },
    async logout({ commit }) {
      commit('setToken', null)
      storageClear()
    }
  }
}

export default user