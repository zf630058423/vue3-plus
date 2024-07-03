<template>
  <div>
    <el-autocomplete
      class="inline-input"
      v-model="inputValue"
      :fetch-suggestions="querySearch"
      placeholder="请输入菜单搜索"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script setup>
import { menuList } from '../navMenuList'
import { ref, onMounted } from 'vue'
import { menuStore } from '@/store/menu' //使用pinia存储数据

import { useRouter } from 'vue-router'

const store = menuStore()

const router = useRouter()

const { menuVuex } = store

const restaurants = ref([])
const inputValue = ref('')

const menus = ref([])

onMounted(() => {
  restaurants.value = loadAll()
})

const loadAll = () => {
  getMenuChildren(menuList)
  return menus.value
    ? menus.value.map((el) => ({
        ...el,
        value: el.name,
        address: el.name,
      }))
    : []
}

const getMenuChildren = (arr) => {
  if (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].level === 2) {
        menus.value.push(arr[i])
      } else {
        if (arr[i].children) {
          getMenuChildren(arr[i].children)
        }
      }
    }
  }
}

const querySearch = (queryString, cb) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // 调用 callback 返回建议列表的数据
  cb(results)
}

const createFilter = (queryString) => {
  return (restaurant) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}

const handleSelect = (item) => {
  const { url, name, level } = item
  menuVuex({ name, url, level })
  router.push({ path: url })
}
</script>

<style lang="scss">
::v-deep .el-autocomplete-suggestion__wrap {
  margin-bottom: -15px;
}

.vue-version {
  width: 100px;
  margin-left: 8px;
}
</style>
