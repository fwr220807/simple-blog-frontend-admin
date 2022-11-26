import request from '@/utils/request'

export const loginReq = (data: any) => request({
  url: '/login',
  method: 'post',
  data,
})
