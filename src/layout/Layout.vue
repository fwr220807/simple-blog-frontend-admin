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
const showTagsView = computed(() => settingsStore.showTagsView)
</script>

<template>
  <div :class="classObj" class="app-wrapper" relative flex h-full>
    <!-- mobile 状态下 Sidebar 侧边栏打开状态下的灰幕，点击隐藏 Sidebar -->
    <div v-if="classObj.mobile && sidebar.opened" class="drawer-bg bg-#000" absolute top-0 opacity-30 w-full h-full
         z-999 @click="handleClickOutside"
    />
    <Sidebar class="sidebar-container" h-full w-210px z-1001 />
    <div :class="{ hasTagsView: showTagsView }" class="main-container" h-full>
      <div :class="{ 'fixed-header': fixedHeader }">
        <Navbar />
        <TagsView v-if="showTagsView" />
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
  width: 100%;

  // overflow: hidden;
  .sidebar-container {
    transition: width 0.28s;
    box-shadow: var(--sidebar-box-shadow);
  }

  .main-container {
    flex: 1;
    width: calc(100% - 210px);
    background-color: #fff;

    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9;
      width: calc(100% - 210px);
      transition: width 0.28s;
      box-shadow: var(--fixed-header-box-shadow);
    }
  }

}

.hideSidebar {
  .sidebar-container {
    width: 54px;

    :deep(.el-sub-menu) {
      .el-sub-menu__icon-arrow {
        display: none;
      }
    }
  }

  .main-container {
    .fixed-header {
      width: calc(100% - 54px);
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

  &.openSidebar {}

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transform: translate(-210px);
    }

    .fixed-header {
      width: 100%;
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
