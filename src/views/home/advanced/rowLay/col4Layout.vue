<template>
  <el-form ref="dataForm" :model="dataForm" label-width="120px">
    <ColLayout :cols="4" :gutter="10">
      <template #col_1>
        <el-form-item prop="code" label="单据编号：">
          <el-input v-model="dataForm.code" size="small" placeholder="请输入" />
        </el-form-item>
      </template>
      <template #col_2>
        <el-form-item prop="projectNumber" label="项目编号：">
          <el-input v-model="dataForm.projectNumber" size="small" placeholder="请输入" />
        </el-form-item>
      </template>
      <template #col_3>
        <el-form-item prop="projectName" label="项目名称：">
          <el-input v-model="dataForm.projectName" size="small" placeholder="请输入" />
        </el-form-item>
      </template>
      <template #col_4>
        <el-form-item prop="projectAddress" label="项目区域：">
          <el-input v-model="dataForm.projectAddress" size="small" placeholder="请输入" />
        </el-form-item>
      </template>
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
