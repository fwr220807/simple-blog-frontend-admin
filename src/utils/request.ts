import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getToken } from './cookies'
import { useUserStore } from '@/store/user'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

service.interceptors.request.use((config) => {
  const userStore = useUserStore()

  if (userStore.token)
    config.headers!['X-Token'] = getToken()

  return config
}, (error) => {
  return Promise.reject(error)
})

service.interceptors.response.use((response) => {
  const res = response.data

  if (res.code !== 200) {
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
        userStore.resetToken().then(() => {
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
