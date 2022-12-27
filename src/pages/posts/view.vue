<script lang="ts" setup name="postsView">
import { computed, onMounted, reactive, toRefs } from 'vue'
import { getArticlesListReq } from '@/api/posts'
import { useAppStore } from '@/store/app'
const state = reactive({
  articlesList: [],
})

onMounted(async () => {
  const result = await getArticlesListReq(1)
  state.articlesList = result.data
})

const appStore = useAppStore()
const website = computed(() => appStore.website)

const { articlesList } = toRefs(state)
</script>

<template>
  <div>
    <el-table :data="articlesList" stripe>
      <el-table-column prop="title" label="标题">
        <template #default="scope">
          <div>
            <a :href="website ? `${website}/#/article/${scope.row.routeName}` : ``" rel="noopener" target="_blank">{{ scope.row.title }}</a>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="category.title" label="栏目" width="180" />
      <el-table-column prop="createdAt" label="创建时间" width="180" />
      <el-table-column prop="updatedAt" label="修改于" width="180" />
      <el-table-column prop="" label="操作" width="180" />
    </el-table>
    <!-- 分页器 -->
  </div>
</template>

<style lang="less" scoped>

</style>
