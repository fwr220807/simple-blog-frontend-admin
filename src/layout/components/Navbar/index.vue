<script lang="ts" setup>
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'

const appStore = useAppStore()
const opened = computed(() => appStore.sidebar.opened)

const userStore = useUserStore()
const avatar = computed(() => userStore.avatar)

const toggleSidebar = appStore.toggleSidebar
// 退出登陆
const router = useRouter()
const logout = async () => {
  await userStore.logout()
  ElMessage({ message: '退出登录成功', type: 'success' })
  router.push('/login?redirect=/')
}
</script>

<template>
  <div class="navbar">
    <Hamburger :is-active="opened" class="hamburger-container" @toggle-sidebar="toggleSidebar" />
    <Breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown trigger="click">
        <div class="avatar-wrapper" w-80px h-80px>
          <img :src="avatar" class="user-avatar">
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>
                Dashboard
              </el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/fwr220807/simple-blog-frontend-admin">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              Logout
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>
