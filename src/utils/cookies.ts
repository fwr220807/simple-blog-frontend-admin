/*
* @Description: cookies 的封装
* @Author: Wren Fan
* @Date: 2022-11-29 10:12:34
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-29 10:12:34
**/
import Cookies from 'js-cookie'
import { CookiesKeys } from '@/constant/key'

export const getToken = () => Cookies.get(CookiesKeys.TOKEN)
export const setToken = (token: string) => Cookies.set(CookiesKeys.TOKEN, token)
export const removeToken = () => Cookies.remove(CookiesKeys.TOKEN)

export const getSidebarStatus = () => Cookies.get(CookiesKeys.SIDEBARSTATUS)
export const setSidebarStatus = (sidebarStatus: string) => Cookies.set(CookiesKeys.SIDEBARSTATUS, sidebarStatus)

export const getLanguage = () => Cookies.get(CookiesKeys.LANGUAGE)
export const setLanguage = (language: string) => Cookies.set(CookiesKeys.LANGUAGE, language)

export const getSize = () => Cookies.get(CookiesKeys.SIZE)
export const setSize = (size: string) => Cookies.set(CookiesKeys.SIZE, size)

export const getTheme = () => Cookies.get(CookiesKeys.THEME)
export const setTheme = (color: string) => Cookies.set(CookiesKeys.THEME, color)
