/*
* @Description: app 仓库用到的请求 api
* @Author: Wren Fan
* @Date: 2022-12-27 17:12:42
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-27 17:12:42
**/

import request from '@/utils/request'

// 获取博客网站相关信息 API
export const getBlogInfoReq = () => request({
  url: '/blog/getBlogInfo',
  method: 'post',
})
