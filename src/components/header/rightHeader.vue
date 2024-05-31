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
// import { mapActions } from 'vuex'
import { menuList } from '../navMenuList'
import { ref, onMounted } from 'vue'

const restaurants = ref([])
const inputValue = ref('')
const vueValue = ref('2')
const vueVersion = ref([
  { id: 2, label: 'vue2.0', value: '2' },
  { id: 3, label: 'vue3.0', value: '3' },
])

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
  // this.menuVuex({ name, url, level })
  // this.$router.push({ path: url })
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
