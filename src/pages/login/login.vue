<!--
* @Description: 登陆页面
* @Author: Wren Fan
* @Date: 2022-11-25 16:35:49
* @LastEditTime: 2022-11-25 16:35:49
* @LastEditors: Wren Fan
-->
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { nextTick, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/store/user'
import { useSleep } from '@/hooks/useCommon'
import type { ObjType } from '@/typings/common'

const { t } = useI18n()
// form
const loginForm = reactive({
  username: 'admin',
  password: 'admin888',
})
// el-form 的规则
const rules: FormRules = {
  username: [{ required: true, message: t('login.usernameIsNotEmptyRule') }],
  password: [
    { required: true, message: t('login.passwordIsNotEmptyRule') },
    { min: 6, max: 18, message: t('login.passwordLengthRule') },
  ],
}

// 状态
const state: ObjType = reactive({
  otherQuery: {},
  redirect: undefined,
})
// 除去 redirect 参数
const getOtherQuery = (query: any) => {
  return Object.keys(query).reduce((acc: any, cur: any) => {
    if (cur !== 'redirect')
      acc[cur] = query[cur]

    return acc
  }, {})
}
const route = useRoute()
watch(() => route.query, (query) => {
  if (query) {
    state.redirect = query.redirect
    state.otherQuery = getOtherQuery(query)
  }
}, { immediate: true })

// 检测是否在大写状态，如果是则控制 capsTooltip 显示提示
const capsTooltip = ref(false)
const checkCapsLock = function (e: KeyboardEvent) {
  const { key } = e
  capsTooltip.value
    = Boolean(key) && key.length === 1 && key >= 'A' && key <= 'Z'
}

// 控制登陆
const router = useRouter()
const loading = ref(false)
const tipMessage = ref('')
const loginFormEl = ref<FormInstance>()
// 登陆请求
const loginReq = function () {
  loading.value = true
  const userStore = useUserStore()
  userStore
    .login(loginForm)
    .then(() => {
      ElMessage({ message: t('message.loginSuccess'), type: 'success' })
      // 如果 login 页面是重定向进来，则回到 redirect 页面
      router.push({ path: state.redirect || '/', query: state.otherQuery })
    })
    .catch((error) => {
      tipMessage.value = error.msg
      useSleep(30).then(() => loading.value = false)
    })
}

const handleLogin = function () {
  loginFormEl.value?.validate((isValid: boolean) => {
    if (isValid)
      loginReq()
    else return false
  })
}

// 控制显示密码实际内容
const password = ref<HTMLElement>()
const passwordType = ref('password')
const showPwd = function () {
  if (passwordType.value === 'password')
    passwordType.value = ''
  else passwordType.value = 'password'

  nextTick(() => {
    password.value?.focus()
  })
}
</script>

<template>
  <div class="login-container" min-h-screen w-screen overflow-hidden>
    <el-form ref="loginFormEl" class="login-form" :model="loginForm" :rules="rules" autocomplete="on"
             label-position="left"
    >
      <!-- 标题 -->
      <div class="title-container" relative>
        <h3 class="title" text-26px text-gray-1 m-x-auto m-t-0 m-b-40px text-center font-bold>
          {{ t('login.title') }}
        </h3>
      </div>
      <!-- 用户名 -->
      <el-form-item prop="username">
        <span class="svg-container" flex justify-center items-center text-gray-4 inline-block text-4 p-l-11px>
          <div i-ooui:user-avatar />
        </span>
        <el-input ref="username" v-model="loginForm.username" :placeholder="t('login.username')" name="username"
                  type="text" tabindex="2" autocomplete="on"
        />
      </el-form-item>
      <!-- 密码 + 大小写提示 -->
      <!-- tirrger 和 trigger-keys 设置防止自身触发提示 -->
      <el-tooltip v-model:visible="capsTooltip" trigger="" :trigger-keys="[]" content="Caps lock is On"
                  placement="right"
      >
        <el-form-item prop="password">
          <span class="svg-container" flex justify-center items-center text-gray-4 inline-block text-4 p-l-11px>
            <div i-ri:lock-password-fill />
          </span>
          <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
                    :placeholder="t('login.password')" name="password" tabindex="2" autocomplete="on" @keyup="checkCapsLock"
                    @blur="capsTooltip = false" @keyup.enter="handleLogin"
          />
          <span class="show-pwd" absolute right-14px text-4 cursor-pointer select-none text-gray-4 @click="showPwd">
            <div :class="
              passwordType === 'password' ? 'i-ph:eye-closed' : 'i-ph:eye'
            "
            />
          </span>
        </el-form-item>
      </el-tooltip>
      <!-- 登录按钮 -->
      <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px; padding: 15px 15px"
                 @click.prevent="handleLogin"
      >
        {{ t('login.login') }}
      </el-button>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.login-container {
  --light-gray: #eee;
  --bg: #2d3a4b;
  --dark-gray: #889aa4;
  --cursor: #fff;
  --light-bg: rgba(0, 0, 0, 0.1);
  background-color: var(--bg);

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .el-form-item {
      position: relative;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;

      :deep(.el-input) {
        height: 47px;
        width: 85%;

        .el-input__wrapper {
          background-color: transparent;
          box-shadow: none;

          input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 0px;
            color: var(--light-gray);
            height: 47px;
            caret-color: var(--cursor);

            // 解决输入框色调色差问题 #283443
            &:-webkit-autofill {
              box-shadow: 0 0 0px 1000px #283443 inset !important;
              -webkit-text-fill-color: var(--cursor) !important;
            }
          }
        }
      }
    }
  }
}
</style>
