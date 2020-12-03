import { UserData } from "/@/api"
import { message } from 'ant-design-vue'
import router from '/@/router'
import type { Module } from "vuex"
import { UserLoginResp, obj, Result } from "/@/api/type"
import { getToken, getUserInfo, setRemember, setToken, setUserInfo, storageClear } from "/@/utils/auth"

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
    login({ commit }, data: obj) {
      return new Promise((resolve, reject) => {
        UserData.login(data).then((res: Result<UserLoginResp>) => {
          setRemember(data.remember ? 1 : 0) // 记住我
          commit('setToken', res.data.token)
          commit('setUserInfo', res.data.userInfo)
          message.success('登录成功')
          setTimeout(() => {
            if (res.data.userInfo.isnew) {
              router.replace('/update')
            } else {
              router.replace('/')
            }
          }, 1500)
          resolve(res)
        }, err => reject(err))
      })
    },
    logout({ commit }) {
      commit('setToken', '')
      storageClear()
    }
  }
}

export default user