/*
* @Description: 仪表盘页面的 api
* @Author: Wren Fan
* @Date: 2022-12-15 12:04:26
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-15 12:04:26
**/

import request from '@/utils/request'

export const hitokotoReq = () => request({
  url: 'https://v1.hitokoto.cn/?c=d&c=e&c=j',
  method: 'get',
})
