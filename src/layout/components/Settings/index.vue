<!--
* @Description: 设置页面
* @Author: Wren Fan
* @Date: 2022-11-30 16:54:15
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-30 16:54:15
-->

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { reactive, toRefs, watch } from 'vue'
import { useSettingsStore } from '@/store/settings'
const { t } = useI18n()

const settingsStore = useSettingsStore()

const state = reactive({
  theme: settingsStore.theme,
  fixedHeader: settingsStore.fixedHeader,
  showTagsView: settingsStore.showTagsView,
  showSidebarLogo: settingsStore.showSidebarLogo,
  sidebarTextTheme: settingsStore.sidebarTextTheme,
})

const themeChange = (theme: string) => {
  settingsStore.changeSetting('theme', theme)
}

watch(() => state.fixedHeader, () => {
  settingsStore.changeSetting('fixedHeader', state.fixedHeader)
})
watch(() => state.showTagsView, () => {
  settingsStore.changeSetting('showTagsView', state.showTagsView)
})
watch(() => state.showSidebarLogo, () => {
  settingsStore.changeSetting('showSidebarLogo', state.showSidebarLogo)
})
watch(() => state.sidebarTextTheme, () => {
  settingsStore.changeSetting('sidebarTextTheme', state.sidebarTextTheme)
})
const { fixedHeader, showTagsView, showSidebarLogo, sidebarTextTheme } = toRefs(state)
</script>

<template>
  <div class="drawer-container" text-14px break-words>
    <div>
      <h3 class="drawer-title">
        {{ t('settings.title') }}
      </h3>

      <div class="drawer-item">
        <span>{{ t('settings.theme') }}</span>
        <ThemePicker style="float: right;height: 26px;margin: -3px 8px 0 0;"
                     @change="themeChange"
        />
      </div>

      <div class="drawer-item">
        <span>{{ t('settings.showTagsView') }}</span>
        <el-switch v-model="showTagsView"
                   class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>{{ t('settings.showSidebarLogo') }}</span>
        <el-switch v-model="showSidebarLogo"
                   class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>{{ t('settings.fixedHeader') }}</span>
        <el-switch v-model="fixedHeader"
                   class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>{{ t('settings.sidebarTextTheme') }}</span>
        <el-switch v-model="sidebarTextTheme"
                   class="drawer-switch"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.drawer-container {
  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    display: flex;
    justify-content: space-between;
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;

    span {
      line-height: 32px;
    }
  }
}
</style>
