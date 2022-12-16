<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useTagsViewStore } from '@/store/tagsView'

const tagsViewStore = useTagsViewStore()
const cachedViews = computed(() => tagsViewStore.cachedViews)
const route = useRoute()
const key = computed(() => route.path)
</script>

<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <!-- cachedViews 保存的是路由 name，而 includes 属性对应的是组件的 name -->
        <!-- 而 vue3 script setup 会自动推断组件 name，所以需要我们手动控制组件的 name 与路由的 name 对应上 -->
        <!-- 借助 vite-plugin-vue-setup-extend 插件可以在 script 标签添加对应的组件 name -->
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="key" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style lang="less" scoped>
.app-main {
  min-height: calc(100vh - 30px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
  height: calc(100vh - 50px);
  overflow: auto;
}

.hasTagsView {
  .app-main {
    /* 82 = navbar + tags-view = 50 + 32 */
    min-height: calc(100vh - 82px);
  }

  .fixed-header+.app-main {
    padding-top: 82px;
  }
}
</style>
