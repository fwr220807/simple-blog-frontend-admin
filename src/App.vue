<script setup lang="ts">
import { onMounted } from "vue";
import { login } from "./api/user";

const click = async function () {
  const result = await login({
    email: "admin@admin.com",
    password: "admin888",
  });

  console.log(result);
};
</script>

<template>
  <!-- HelloWorld
  <button @click="click">
    按钮
  </button> -->
  <router-view />
</template>

<style></style>
