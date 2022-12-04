<script lang="ts" setup>
defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
})

const title = 'Simple Blog Admin'
const logo = 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
</script>

<template>
  <div class="sidebar-logo-container bg-#2b2f3a" relative w-full h-50px lh-50px text-center overflow-hidden
       :class="collapse ? 'collapse' : 'no-title'"
  >
    <Transition name="sidebarLogoFade">
      <!-- 侧边栏隐藏状态下的 logo，无标题，设置两个 router-link 标签是为了做整体的过渡动画 -->
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">
          {{ title }}
        </h1>
      </router-link>
      <!-- 侧边栏隐藏状态下的 logo，有标题 -->
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">
          {{ title }}
        </h1>
      </router-link>
    </Transition>
  </div>
</template>

<style lang="less" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container  {
  .sidebar-logo-link {
    height: 100%;
    width: 100%;

    .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
