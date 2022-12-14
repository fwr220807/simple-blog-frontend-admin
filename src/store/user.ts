/*
* @Description:
* @Author: Wren Fan
* @Date: 2022-11-28 18:25:25
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-28 18:25:25
**/
import { defineStore } from 'pinia'
import { useTagsViewStore } from './tagsView'
import { getToken, removeToken, setToken } from '@/utils/cookies'
import { getUserInfoReq, loginReq } from '@/api/user'
import type { ObjType } from '@/typings/common'
import { resetRouter } from '@/router'

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
    // 清空重置状态
    resetState() {
      return new Promise((resolve) => {
        // 去除 token 的 cookies
        removeToken()
        // 重置状态
        this.$reset()
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
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfoReq().then((response: ObjType) => {
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
    logout() {
      return new Promise((resolve) => {
        this.resetState().then(() => {
          // 清除添加的动态路由
          resetRouter()
          // 清除 tagsViewStore 的记录
          const tagsViewStore = useTagsViewStore()
          tagsViewStore.deleteAllViews()
          resolve(null)
        })
      })
    },
  },
})
