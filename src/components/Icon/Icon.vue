<template>
   <!-- 这个组件是fontawesome为我们提供的组件 -->
    <!-- 我们需要对这个组件进行一个二次封装 -->
    <!-- <font-awesome-icon icon="fa-solid fa-user-secret"></font-awesome-icon> -->

  <i class="zf-icon" :class="{[`zf-icon--${type}`]: type}">
    <font-awesome-icon v-bind="filteredProps"></font-awesome-icon>
  </i>
</template>
<script setup>
import { computed } from 'vue';
import {omit} from 'lodash-es'
import propObj from "./props"

defineOptions({
  name:'Zf-Icon'
})

const props = defineProps(propObj)

//我们使用omit可以将我们不需要的属性进行过滤
const filteredProps = computed(() => omit(props, ['type']))

</script>

<style lang="scss" scoped></style>