<!-- 

依托于fontawesome进行二次封装

fontawesome官网：  https://fontawesome.com

下载依赖：
pnpm add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/vue-fontawesome@latest-3

main.js文件引入
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

引入自定义组件 就是下面封装的Icon组件，在main文件全局引入
import Icon from './components/Icon/Icon.vue'

//注册fontawesome组件
app.component('font-awesome-icon', FontAwesomeIcon)

//注册自定义组件
app.component('Zf-Icon', Icon)

以前使用
 <font-awesome-icon icon="fa-solid fa-user-secret"></font-awesome-icon>

现在使用 icon根据官网直接引入即可
<Zf-Icon icon='user'/>
 
 现在封装Icon.vue如下：
-->

<template>
  <!-- 我们需要对这个组件进行二次封装 -->
  <i class="zf-icon" :class="{ [`zf-icon--${type}`]: type }">
    <font-awesome-icon v-bind="filteredProps"></font-awesome-icon>
  </i>
</template>
<script setup>
import { computed } from 'vue'
import { omit } from 'lodash-es'

defineOptions({
  name: 'Zf-Icon',
})

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  //图标大小
  size: {
    type: String,
  },
  //rotation动画(旋转)
  rotation: {
    type: [Number, String],
  },
  //翻转
  flip: {
    type: [Number, String],
  },
  //下面是动画效果相关的属性
  beat: Boolean,
  'beat-fade': Boolean,
  bounce: Boolean,
  fade: Boolean,
  shake: Boolean,
  spin: Boolean,
  'spin-reverse': Boolean,
  'spin-pulse': Boolean,
  //下面是自定义属性
  //主题类型
  type: {
    type: String,
  },
  //自定义颜色
  color: {
    type: String,
  },
})
//我们使用omit可以将我们不需要的属性进行过滤
const filteredProps = computed(() => omit(props, ['type']))
</script>

<style lang="scss" scoped></style>
