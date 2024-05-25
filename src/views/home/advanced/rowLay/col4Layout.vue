<template>
  <el-form ref="dataForm" :model="dataForm" label-width="120px">
    <ColLayout :cols="4" :gutter="10">
      <el-form-item slot="col_1" prop="code" label="单据编号：">
        <el-input v-model="dataForm.code" size="small" placeholder="请输入" />
      </el-form-item>
      <el-form-item slot="col_2" prop="projectNumber" label="项目编号：">
        <el-input v-model="dataForm.projectNumber" size="small" placeholder="请输入" />
      </el-form-item>
      <el-form-item slot="col_3" prop="projectName" label="项目名称：">
        <el-input v-model="dataForm.projectName" size="small" placeholder="请输入" />
      </el-form-item>
      <el-form-item slot="col_4" prop="projectAddress" label="项目区域：">
        <el-input v-model="dataForm.projectAddress" size="small" placeholder="请输入" />
      </el-form-item>
    </ColLayout>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'
import ColLayout from './colLayout.vue'

const dataForm = ref({
  code: '',
  projectNumber: '',
  projectName: '',
  projectAddress: '',
})
</script>
