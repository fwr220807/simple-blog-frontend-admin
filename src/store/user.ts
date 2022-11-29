/*
* @Description:
* @Author: Wren Fan
* @Date: 2022-11-28 18:25:25
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-28 18:25:25
**/
import { defineStore } from 'pinia'
import { getToken, removeToken, setToken } from '@/utils/cookies'
import { loginReq } from '@/api/user'
import type { ObjType } from '@/typings/common'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getToken(),
      name: '',
      avatar: '',
      roles: [],
    }
  },
  actions: {
    resetToken() {
      return new Promise((resolve) => {
        this.$reset()
        removeToken()
        resolve(null)
      })
    },
    login(data: ObjType) {
      // 返回 Promise，方便使用者获取成功状态后的操作
      return new Promise((resolve, reject) => {
        loginReq(data).then((res: ObjType) => {
          if (res.code === 200) {
            this.token = res.data.token
            setToken(res.data.token)
            resolve(null)
          }
          else {
            reject(res)
          }
        }).catch((error: any) => {
          reject(error)
        })
      })
    },
  },
})
