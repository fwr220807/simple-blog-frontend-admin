import { defineStore } from 'pinia'
// RouteLocationNormalizedLoaded 为 useRoute 的实例类型
import type { TagType } from '@/typings/store'

export const useTagsViewStore = defineStore('tagsView', {
  state: () => {
    return {
      // 存储打开过的路由页面
      visitedViews: [] as Array<TagType>,
    }
  },
  actions: {
    // 添加标签
    addView(view: TagType) {
      this.$patch((state) => {
        // 如果已经添加过了，就不再添加
        if (state.visitedViews.some(v => v.path === view.path))
          return
        // 添加 view
        state.visitedViews.push(
          Object.assign({}, view, {
            title: view.meta.title || 'no-name',
          }))
      })
    },
    // 删除所选标签
    deleteVisitedView(view: TagType) {
      return new Promise<Array<TagType>>((resolve) => {
        this.$patch((state) => {
          for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === view.path) {
              state.visitedViews.splice(i, 1)
              break
            }
          }
          resolve([...state.visitedViews])
        })
      })
    },
    // 删除除了选中标签外的其他标签
    deleteOthersViews(view: TagType) {
      return new Promise<Array<TagType>>((resolve) => {
        this.$patch((state) => {
          state.visitedViews = state.visitedViews.filter(v => v.meta.affix || v.path === view.path)
          resolve([...state.visitedViews])
        })
      })
    },
    // 删除所有标签，但保留 affix 标签
    deleteAllViews() {
      return new Promise<Array<TagType>>((resolve) => {
        this.$patch((state) => {
          state.visitedViews = state.visitedViews.filter((tag: TagType) => tag.meta.affix)
          resolve([...state.visitedViews])
        })
      })
    },
  },
})
