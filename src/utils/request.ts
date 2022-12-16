// import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getToken } from './cookies'
import { useUserStore } from '@/store/user'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
// // 泛型接口,T的类型支持
// export interface IResponseData<T = any> {
//   code: number
//   message?: string
//   data: T
// }

// // 通用的请求函数
// export async function request<T>(config: AxiosRequestConfig) {
//   return service
//     .request<IResponseData<T>>(config)
//     .then(res => res.data.data)
// }

service.interceptors.request.use((config) => {
  const userStore = useUserStore()

  if (userStore.token)
    config.headers!.Authorization = `Bearer ${getToken()}`

  return config
}, (error) => {
  return Promise.reject(error)
})

service.interceptors.response.use((response) => {
  const res = response.data
  // 如果没有 code 属性，则是外部链接
  if (res.code && res.code !== 200) {
    ElMessage({
      message: res.message || 'Error',
      type: 'error',
      duration: 5 * 1000,
    })

    // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      // to re-login
      ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        confirmButtonText: 'Re-Login',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        const userStore = useUserStore()
        userStore.resetState().then(() => {
          location.reload()
        })
      })
    }
    return Promise.reject(new Error(res.message || 'Error'))
  }
  else {
    return res
  }
}, (error) => {
  ElMessage({
    message: error.message || 'Error',
    type: 'error',
    duration: 5 * 1000,
  })

  return Promise.reject(error)
})

export default service
