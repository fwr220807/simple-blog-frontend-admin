/*
* @Description: user 仓库用到的请求 api
* @Author: Wren Fan
* @Date: 2022-12-27 15:44:25
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-27 15:44:25
**/

import request from '@/utils/request'

// 登陆 API
export const loginReq = (data: any) => request({
  url: '/login',
  method: 'post',
  data,
})
// 获取用户信息 API
export const getUserInfoReq = () => request({
  url: '/user/getUserInfo',
  method: 'post',
})
// 获取博客网站相关信息 API
export const getBlogInfoReq = () => request({
  url: '/blog/getBlogInfo',
  method: 'post',
})
