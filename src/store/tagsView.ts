import { defineStore } from 'pinia'
import type { TagType } from '@/typings/store'

export const useTagsViewStore = defineStore('tagsView', {
  state: () => {
    return {
      // 存储打开过的路由页面
      visitedViews: [] as Array<TagType>,
      // 存储打开过的路由页面的 name 属性, 用于 AppMain 组件中 keepalive 的 include 属性使用
      cachedViews: [] as Array<string>,
    }
  },
  actions: {
    // 逻辑，尝试添加标签，如果标签已经存在，再尝试更新，更新的依据是 fullPath，带参数后 fullPath 与 path 会不同
    // 添加标签，并更新标签信息
    addAndUpdateView(view: TagType) {
      this.addCachedView(view)
      this.$patch((state) => {
        // 如果已经添加过了，就不再添加，并检查是否要更新
        for (let v of state.visitedViews) {
          if (v.path === view.path) {
            if (v.fullPath !== view.fullPath)
              v = Object.assign(v, view)

            return
          }
        }
        // 没有添加过，则添加 view
        state.visitedViews.push(
          Object.assign({}, view, {
            title: view.meta.title || 'no-name',
          }))
      })
    },
    // 删除所选标签
    deleteVisitedView(view: TagType) {
      this.deleteCachedView(view)
      return new Promise<Array<TagType>>((resolve) => {
        this.$patch((state) => {
          for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === view.path) {
              state.visitedViews.splice(i, 1)
              state.cachedViews.splice(i, 1)
              break
            }
          }
          resolve([...state.visitedViews])
        })
      })
    },
    // 删除除了选中标签外的其他标签
    deleteOthersViews(view: TagType) {
      this.deleteOthersCachedViews(view)
      return new Promise<Array<TagType>>((resolve) => {
        this.$patch((state) => {
          state.visitedViews = state.visitedViews.filter(v => v.meta.affix || v.path === view.path)
          resolve([...state.visitedViews])
        })
      })
    },
    // 删除所有标签，但保留 affix 标签
    deleteAllViews() {
      this.deleteAllCachedViews()
      return new Promise<Array<TagType>>((resolve) => {
        this.$patch((state) => {
          state.visitedViews = state.visitedViews.filter((tag: TagType) => tag.meta.affix)
          state.cachedViews = []
          resolve([...state.visitedViews])
        })
      })
    },
    // 添加缓存标签
    addCachedView(view: TagType) {
      this.$patch((state) => {
        if (view.name && typeof view.name === 'string') {
          if (state.cachedViews.includes(view.name))
            return
          if (!view.meta.noCache)
            state.cachedViews.push(view.name)
        }
      })
    },
    // 删除缓存标签
    deleteCachedView(view: TagType) {
      this.$patch((state) => {
        if (view.name && typeof view.name === 'string') {
          const index = state.cachedViews.indexOf(view.name)
          index > -1 && state.cachedViews.splice(index, 1)
        }
      })
    },
    // 删除其他的缓存标签
    deleteOthersCachedViews(view: TagType) {
      this.$patch((state) => {
        if (view.name && typeof view.name === 'string') {
          const index = state.cachedViews.indexOf(view.name)
          if (index > -1) {
            state.cachedViews = state.cachedViews.slice(index, index + 1)
          }
          else {
            // if index = -1, there is no cached tags
            state.cachedViews = []
          }
        }
      })
    },
    // 删除所有缓存标签
    deleteAllCachedViews() {
      this.$patch((state) => {
        state.cachedViews = []
      })
    },
  },
})
