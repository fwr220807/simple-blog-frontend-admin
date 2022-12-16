import request from '@/utils/request'
// import { request } from '@/utils/request'

// 登陆 API
export const loginReq = (data: any) => request({
  url: '/login',
  method: 'post',
  data,
})
// 获取用户信息 API
export const getInfoReq = () => request({
  url: '/user/getUserInfo',
  method: 'post',
})
