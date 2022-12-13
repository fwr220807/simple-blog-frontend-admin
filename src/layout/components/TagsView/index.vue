<!--
* @Description: tagsView 组件
* @Author: Wren Fan
* @Date: 2022-12-9 09:55:25
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-10 09:55:25
-->
<script lang="ts" setup>
import { resolve } from 'path'
import type { ComponentPublicInstance } from 'vue'
import { computed, nextTick, reactive, ref, toRefs, watch } from 'vue'
import type { RouteLocationPathRaw } from 'vue-router'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ScrollPane from './ScrollPane.vue'
import { useTagsViewStore } from '@/store/tagsView'
import { usePermissionStore } from '@/store/permission'
import type { RouteMetaType, RouterType } from '@/typings/router'
import type { TagType } from '@/typings/store'
import { useAppStore } from '@/store/app'
import { Device } from '@/constant/device'

const state = reactive({
  visible: false, // 控制右键菜单的显示与关闭
  top: 0, // 控制右键菜单显示的位置
  left: 0,
  selectedTag: {} as TagType, // 存储右键选中的 Tag
  affixTags: [] as Array<TagType>, // 存储 meta.affix:true 属性的 Tag
})

const { t } = useI18n()

const tagsViewStore = useTagsViewStore()
const visitedViews = computed(() => tagsViewStore.visitedViews)

const permissionStore = usePermissionStore()
const routes = computed(() => {
  return permissionStore.routes
})
// 筛选出路由 meta 属性的 affix = true 的项的方法
const filterAffixTags = (routes: RouterType, basePath = '/') => {
  let tags: Array<TagType> = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: route.meta,
      })
    }

    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1)
        tags = [...tags, ...tempTags]
    }
  })

  return tags
}
// 初始化，将 affixTags 标签添加到仓库中
const initTags = () => {
  const affixTags = (state.affixTags = filterAffixTags(routes.value))
  for (const tag of affixTags) {
    if (tag.name)
      tagsViewStore.addAndUpdateView(tag)
  }
}
initTags()

const router = useRouter()
const route = useRoute()
// 调用 tagsViewStore 仓库的 addAndUpdateView 方法添加 tags 到仓库
const addAndUpdateTag = () => {
  const { name } = route
  if (name) {
    const tag: TagType = {
      fullPath: route.fullPath,
      path: route.path,
      name: route.name,
      meta: route.meta as RouteMetaType,
      query: route.query,
    }
    tagsViewStore.addAndUpdateView(tag)
  }
}
// tagsRef 类型代表联合 RouterLink 暴露的类型（$props）和组件实例的类型（$el）
const tagsRef = ref<Array<InstanceType<typeof RouterLink> & ComponentPublicInstance> | null>(null)
// scrollContainer 的类型获取 ScrollPane 组件暴露的 moveToTarget 方法
const scrollContainer = ref<InstanceType<typeof ScrollPane> | null>(null)
const moveToCurrentTag = () => {
  nextTick(() => {
    if (tagsRef.value) {
      for (const tag of tagsRef.value) {
        if ((tag.$props.to as RouteLocationPathRaw).path === route.path) {
          scrollContainer.value?.moveToTarget(tag, tagsRef.value)

          break
        }
      }
    }
  })
}
// 监听路由路径变化，添加当前路径到仓库中
watch(() => route.path, () => {
  addAndUpdateTag()
  moveToCurrentTag()
}, { immediate: true })
// 判断所选标签是否是当前路由的，用于当前显示标签的样式控制
const isActive = (tag: TagType) => tag.path === route.path
// 判断所选标签是否是粘滞的
const isAffix = (tag: TagType) => tag.meta && tag.meta.affix
// 删除激活的 tags 后的行为
const toLastView = (visitedViews: Array<TagType>, view: TagType) => {
  const latestView = visitedViews[visitedViews.length - 1]
  if (latestView) {
    router.push(latestView.fullPath)
  }
  else {
    // 如果删除后没有一个标签，默认重定向至首页
    if (view.name === 'Dashboard')
      router.replace({ path: `/redirect${view.fullPath}` })
    else
      router.push('/')
  }
}
// 删除选中的标签
const closeSelectedTag = (view: TagType) => {
  tagsViewStore.deleteVisitedView(view).then((visitedViews) => {
    if (isActive(view))
      toLastView(visitedViews, view)
  })
}
// 打开右键菜单，计算菜单的显示位置
const appStore = useAppStore()
const tagsViewContainer = ref<HTMLElement | null>(null)
const openMenu = (tag: TagType, event: PointerEvent) => {
  const menuMinWidth = 105
  const offsetLeft = tagsViewContainer.value?.getBoundingClientRect().left as number
  const offsetWidth = tagsViewContainer.value?.offsetWidth as number
  const maxLeft = offsetWidth - menuMinWidth
  const left = event.clientX - offsetLeft + 15

  state.left = Math.min(maxLeft, left) + (appStore.device === Device.Mobile ? 0 : appStore.sidebar.opened ? 210 : 54)
  state.top = event.clientY
  state.visible = true
  state.selectedTag = tag
}
// 关闭右键菜单行为
const closeMenu = () => {
  state.visible = false
}
// 通过监听右键菜单的显示，来添加监听关闭右键菜单
watch(
  () => state.visible,
  (value) => {
    if (value)
      document.body.addEventListener('click', closeMenu)
    else
      document.body.removeEventListener('click', closeMenu)
  },
)
// 右键菜单的四个选项事件回调函数
// 刷新视图标签
const refreshSelectedTag = (view: TagType) => {
  const { fullPath } = view
  nextTick(() => {
    router.replace({
      path: `/redirect${fullPath}`,
    })
  })
}
// 关闭其他标签
const closeOthersTags = () => {
  router.push(state.selectedTag)
  tagsViewStore.deleteOthersViews(state.selectedTag)
}
// 关闭所有标签
// 删除所有标签 -> 判断所选标签是否是粘滞 -> 是则不再操作 -> 否则移动到最后一个标签
const closeAllTags = (view: TagType) => {
  tagsViewStore.deleteAllViews().then((visitedViews) => {
    if (state.affixTags.some(tag => tag.path === view.path))
      return

    toLastView(visitedViews, view)
  })
}
// ScrollPane 组件的自定义事件 scroll 的回调函数
const handleScroll = () => {
  closeMenu()
}

const { visible, top, left, selectedTag } = toRefs(state)
</script>

<template>
  <div ref="tagsViewContainer" class="tags-view-container">
    <!-- tagsView -->
    <ScrollPane ref="scrollContainer" @scroll="handleScroll">
      <div class="tags-view-wrapper">
        <!-- 此处的 to 属性的 RouteLocationPathRaw 类型拓展了 fullPath?: string 属性，在 @/typings.d.ts -->
        <RouterLink v-for="tag in visitedViews" :key="tag.path" ref="tagsRef" class="tags-view-item" :class="isActive(tag) ? 'active' : ''" :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }" @contextmenu.prevent="openMenu(tag, $event)" @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''">
          {{ t(`route.${tag.title}`) }}
          <span v-if="!isAffix(tag)" class="icon-close" @click.prevent="closeSelectedTag(tag)"><i class="i-ep:close" /></span>
        </RouterLink>
      </div>
    </ScrollPane>
    <!-- 右键菜单栏 -->
    <ul v-show="visible" :style="{ left: `${left}px`, top: `${top}px` }" class="contextmenu" absolute m-0 z-3000 p-x-5px p-y-0 border-rd-4px text-12px font-normal>
      <li @click="refreshSelectedTag(selectedTag)">
        {{ t('tagsView.refresh') }}
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        {{ t('tagsView.close') }}
      </li>
      <li @click="closeOthersTags">
        {{ t('tagsView.close-others') }}
      </li>
      <li @click="closeAllTags(selectedTag)">
        {{ t('tagsView.close-all') }}
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.tags-view-container {
  height: var(--tag-view-height);
  width: 100%;
  background: var(--tags-view-background);
  border-bottom: 1px solid var(--tags-view-border-bottom);
  box-shadow: var(--tags-view-box-shadow);
  // position: relative;

  .tags-view-wrapper {
    .tags-view-item {
      // width: 200px;
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 27px;
      line-height: 26px;
      border: 1px solid var(--tags-view-item-border-color);
      color: var(--tags-view-item-color);
      background: var(--tags-view-item-background);
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 3px;
      border-radius: 3px;

      &:first-of-type {
        margin-left: 10px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: var(--tags-view-item-active-background);
        color: var(--tags-view-item-active-color);
        border-color: var(--tags-view-item-active-border-color);

        &::before {
          content: '';
          background-color: var(--tags-view-background);
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }

      .icon-close {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;

        &:hover {
          background-color: var(--tags-view-close-icon-hover-background);
          color: var(--tags-view-close-icon-hover-color);
        }

        i {
          font-size: 12px;
        }
      }

    }
  }
  .contextmenu {
    background: var(--tags-view-contextmenu-background);
    color: var(--tags-view-contextmenu-color);
    box-shadow: var(--tags-view-contextmenu-box-shadow);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: var(--tags-view-contextmenu-hover-background);
      }
    }
  }
}
</style>
