import axios, { AxiosResponse } from 'axios'
import CancelToken from "./CancelToken"
import { message } from 'ant-design-vue'
import type { Result } from './type'
import { getToken, removeToken } from '@/utils/auth'
import router from "@/router"

// const baseURL = process.env.NODE_ENV === 'development' ? '/api' : 'http://chrisying.cn/chat/api'
const baseURL = 'http://chrisying.cn/chat/api'

const instance = axios.create({
  baseURL,
  timeout: 5000
})

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

instance.interceptors.request.use(
  config => {
    // 请求开始前，检查一下是否已经有该请求了，有则取消掉该请求
    CancelToken.removePending(config)
    // 把当成请求添加进去
    CancelToken.addPending(config)
    
    const token = getToken()
    token && (config.headers.Authorization = `Bearer ${token}`)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (res: AxiosResponse<Result>) => {
    const { data } = res
    if (res.status === 200 && data.status === 200) {
      return Promise.resolve(res)
    } else {
      message.error(data.msg)
      return Promise.reject(res)
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message.warning('请先登录后操作')
          removeToken()
          router.push('/login')
          break
        case 403:
          message.warning('登录过期，请重新登录')
          removeToken()
          router.push('/login')
          break
        case 404:
          message.error('网络请求不存在')
          break
        case 500:
          message.error('服务器内部错误')
          break
        default:
          message.error(error.response.data.msg || '未知错误')
      }
    }
    return Promise.reject(error)
  }
)

const createRequest = (methods: 'get' | 'post') => {
  const requset = instance[methods]
  return async function <T = any>(url: string, data = {}) {
    try {
      const { data: result } = await requset<Result<T>>(url, createPayload(methods, data))
      return result
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message)
      }
      return Promise.reject(err.data)
    }
  }
}

const createPayload = (methods: 'get' | 'post', data = {}) => {
  let payload
  if (methods === 'get') {
    payload = {
      params: data
    }
  } else {
    payload = data
  }

  return payload
}

export const httpGet = createRequest('get')

export const httpPost = createRequest('post')



export default instance
