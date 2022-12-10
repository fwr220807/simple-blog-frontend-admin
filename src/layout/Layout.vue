<!--
* @Description: App 布局入口
* @Author: Wren Fan
* @Date: 2022-11-28 18:22:58
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-28 18:22:58
-->
<script lang="ts" setup>
import { computed } from 'vue'
import { resize } from './resize'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import RightPanel from '@/components/RightPanel/index.vue'
import { Device } from '@/constant/device'
import { useAppStore } from '@/store/app'
import { useSettingsStore } from '@/store/settings'

const { sidebar, device } = resize()

const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    mobile: device.value === Device.Mobile,
  }
})

const appStore = useAppStore()
// 关闭 Sidebar
const handleClickOutside = () => {
  appStore.closeSidebar(false)
}

const settingsStore = useSettingsStore()
const showSettings = computed(() => settingsStore.showSettings)
const fixedHeader = computed(() => settingsStore.fixedHeader)
</script>

<template>
  <div :class="classObj" class="app-wrapper" relative flex h-full w-full>
    <!-- mobile 状态下 Sidebar 侧边栏打开状态下的灰幕，点击隐藏 Sidebar -->
    <div v-if="classObj.mobile && sidebar.opened"
         class="drawer-bg bg-#000"
         absolute top-0 opacity-30 w-full h-full z-999
         @click="handleClickOutside"
    />
    <Sidebar class="sidebar-container" h-full w-210px z-1001 />
    <div class="main-container" h-full w-full>
      <div :class="{ 'fixed-header': fixedHeader }">
        <Navbar />
        <TagsView />
      </div>
      <AppMain />
      <RightPanel v-if="showSettings">
        <Settings />
      </RightPanel>
    </div>
  </div>
</template>

<style lang="less" scoped>
.app-wrapper {
  .sidebar-container {
      transition: width 0.28s;
      box-shadow:var(--sidebar-box-shadow);
    }
  .main-container {
    flex: 1;
    background-color: #fff;
  }
}

.hideSidebar {
  .sidebar-container {
    width: 54px;
    :deep(.el-sub-menu)  {
      .el-sub-menu__icon-arrow  {
        display: none;
      }
    }
  }
}

.mobile {
  .sidebar-container {
    position: fixed;
    top: 0;
    width: 210px;
    box-shadow: none;
    transition: transform .28s;
  }

  &.openSidebar {
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transform: translate(-210px);
    }
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
