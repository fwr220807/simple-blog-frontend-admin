/*
* @Description: posts 页面的请求 api
* @Author: Wren Fan
* @Date: 2022-12-27 15:42:37
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-27 15:42:37
**/

import request from '@/utils/request'

export const getArticlesListReq = (page: number) => request({
  url: '/article',
  method: 'get',
  params: {
    page,
  },
})
