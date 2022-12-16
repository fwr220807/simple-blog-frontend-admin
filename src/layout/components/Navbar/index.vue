<script lang="ts" setup>
import { computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'

const { t, locale } = useI18n()

const appStore = useAppStore()
const opened = computed(() => appStore.sidebar.opened)

const userStore = useUserStore()
const avatar = computed(() => userStore.avatar)

const toggleSidebar = appStore.toggleSidebar
const toggleLanguage = appStore.toggleLanguage
// 监听 language，修改正在显示的语言
watch(() => appStore.language, (value) => {
  // 等菜单收起来后再改变语言，防止发生菜单容器错动
  setTimeout(() => {
    locale.value = value
  }, 300)
})

const router = useRouter()
// 退出登陆
const logout = async () => {
  await userStore.logout()
  ElMessage({ message: t('message.logoutSuccess'), type: 'success' })
  router.push('/login?redirect=/')
}
</script>

<template>
  <div class="navbar" h-50px flex justify-between items-center>
    <!-- 左边栏目，包含打开关闭侧边栏按钮组件 Hamburger 和 显示路由路径的面包屑组件 Breadcrumb -->
    <div class="left-menu" flex items-center>
      <Hamburger :is-active="opened" class="hamburger-container" @toggle-sidebar="toggleSidebar" />
      <Breadcrumb class="breadcrumb-container" />
    </div>
    <!-- 右边栏目，包含头像和退出登录等相关功能 -->
    <div class="right-menu" mr-30px select-none>
      <el-dropdown trigger="click">
        <div class="avatar-wrapper" w-40px h-40px flex items-baseline>
          <img :src="avatar" class="user-avatar" border-rd-10px>
          <span ml-8px text-10px><i class="i-ep:caret-bottom" /></span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>
                {{ t('navbar.dashboard') }}
              </el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/fwr220807/simple-blog-frontend-admin">
              <el-dropdown-item>{{ t('navbar.github') }}</el-dropdown-item>
            </a>
            <el-dropdown-item @click="toggleLanguage">
              {{ t('navbar.changeLanguage') }}
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              {{ t('navbar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="less" scoped>
.navbar {
  background-color: #fff;
  box-shadow: var(--navbar-box-shadow);
}
</style>
