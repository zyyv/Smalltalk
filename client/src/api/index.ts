import { httpGet, httpPost } from "./axios"
export const UserData = {
  // 获取验证码
  sendSms: async (data: object) => {
    return httpPost('/user/sendSmsCode', data)
  },
  login: async (data: object) => {
    return httpPost('/user/login', data)
  },
  update: async (data: object) => {
    return httpPost('/user/update', data)
  }
}