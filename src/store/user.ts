/*
* @Description:
* @Author: Wren Fan
* @Date: 2022-11-28 18:25:25
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-28 18:25:25
**/
import { defineStore } from 'pinia'
import { getToken, removeToken, setToken } from '@/utils/cookies'
import { getInfoReq, loginReq } from '@/api/user'
import type { ObjType } from '@/typings/common'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getToken(),
      username: '',
      email: '',
      name: '',
      avatar: '',
      website: '',
      roles: [] as Array<string>,
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
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfoReq().then((response: ObjType) => {
          const { data } = response
          if (!data)
            throw new Error('Verification failed, please Login again.')

          const { username, email, name, avatar, website, role } = data
          this.username = username
          this.email = email
          this.name = name
          this.avatar = avatar
          this.website = website
          this.roles = [role]

          resolve(data)
        }).catch((error: any) => {
          reject(error)
        })
      })
    },
  },
})
