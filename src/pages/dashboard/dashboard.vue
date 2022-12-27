<script lang="ts" setup name="dashboard">
import { computed, onMounted, reactive, ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Card from './Card/index.vue'
import { useUserStore } from '@/store/user'
import { fetchHitokoto, fetchJinRiShiCi } from '@/api/dashboard'
import type { ObjType } from '@/typings/common'
import 'element-plus/es/components/message/style/css'

const { t } = useI18n()

const state = reactive({
  hitokoto: '',
  jinrishiju: '',
})

const userStore = useUserStore()
const username = computed(() => userStore.username)

const reqHitokoto = async () => {
  const hitokotoData: ObjType = await fetchHitokoto()
  state.hitokoto = hitokotoData.hitokoto
}
const reqJinrishijuData = async () => {
  const jinrishijuData: ObjType = await fetchJinRiShiCi()
  state.jinrishiju = jinrishijuData.content
}

const copyTextToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  ElMessage({ message: text, type: 'info' })
  ElMessage({ message: t('dashboard.textCopySuccess'), type: 'success' })
}

onMounted(async () => {
  reqHitokoto()
  reqJinrishijuData()
})

const { hitokoto, jinrishiju } = toRefs(state)

const cardDataState = ref({
  posts: 0,
})
const router = useRouter()
// 获取 Card 组件的 props 类型
type CardProps = InstanceType<typeof Card>['$props']
const cardData = computed<CardProps[]>(() => [
  {
    title: '博文',
    value: cardDataState.value.posts,
    icon: 'i-fluent:code-16-regular',
    actions: [
      {
        name: '撰写',
        primary: true,
        onClick() {
          router.push({ name: 'edit' })
        },
      },
      {
        name: '管理',
        onClick() {
          router.push({ name: 'view' })
        },
      },
    ],
  },
  {
    title: '栏目',
    value: cardDataState.value.posts,
    icon: 'i-ic:baseline-class',
    actions: [
      {
        name: '管理',
        primary: true,
        onClick() {
          router.push({ name: 'category' })
        },
      },
    ],
  },
  {
    title: '全部评论',
    value: cardDataState.value.posts,
    icon: 'i-fluent:comment-28-filled',
    actions: [
      {
        name: '管理',
        primary: true,
        onClick() {
          router.push({ name: 'comments' })
        },
      },
    ],
  },
  {
    title: '未读评论',
    value: cardDataState.value.posts,
    icon: 'i-fluent:comment-multiple-28-filled',
    actions: [
      {
        name: '查看',
        primary: true,
        onClick() {
          router.push({ name: 'comments' })
        },
      },
    ],
  },
  {
    title: '友链',
    value: cardDataState.value.posts,
    icon: 'i-ion:people',
    actions: [
      {
        name: '管理',
        primary: true,
        onClick() {
          router.push({ name: 'friends' })
        },
      },
    ],
  },
  {
    title: '友链申请',
    value: cardDataState.value.posts,
    icon: 'i-fluent:code-16-regular',
    actions: [
      {
        name: '查看',
        primary: true,
        onClick() {
          router.push({ name: 'friends' })
        },
      },
    ],
  },
])
</script>

<template>
  <div m-4>
    <!-- 欢迎 -->
    <el-row>
      <el-col :span="24">
        欢迎回来
      </el-col>
    </el-row>
    <!-- 一言 + 今日诗句 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <span>一言：{{ hitokoto }}</span>
        <button mx-10px @click="reqHitokoto">
          <i class="i-ep:refresh" />
        </button>
        <button @click="copyTextToClipboard(hitokoto)">
          <i class="i-ep:copy-document" />
        </button>
      </el-col>
      <el-col :span="12">
        <span>今日诗句：{{ jinrishiju }}</span>
        <button mx-10px @click="reqJinrishijuData()">
          <i class="i-ep:refresh" />
        </button>
        <button @click="copyTextToClipboard(jinrishiju)">
          <i class="i-ep:copy-document" />
        </button>
      </el-col>
    </el-row>
    <!-- 数据统计 -->
    <el-row>
      <el-col :span="24">
        数据统计
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <Card v-for="card in cardData" :key="card.title" v-bind="{ ...card }" />
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.el-row {
  margin-top: 16px;
}
</style>
