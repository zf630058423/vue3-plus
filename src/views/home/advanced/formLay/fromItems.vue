<template>
  <div class="from-items">
    <el-form
      :model="formData"
      ref="FormItems_rules"
      :inline="true"
      :rules="props.rules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item
        v-for="(item, index) in props.formItems"
        :key="index"
        :label="item.label + '：'"
        :prop="item.model"
      >
        <el-input
          v-if="item.type == 'ipt'"
          :placeholder="'请填写' + item.label"
          v-model="formData[item.model]"
          style="width: 380px"
        ></el-input>

        <el-input
          v-if="item.type == 'textarea'"
          :placeholder="'请填写' + item.label"
          type="textarea"
          v-model="formData[item.model]"
          style="width: 380px"
        ></el-input>

        <el-select
          v-else-if="item.type == 'select'"
          :placeholder="'请选择' + item.label"
          v-model="formData[item.model]"
          @change="item.func ? onAction(formData[item.model]) : ''"
          style="width: 380px"
        >
          <el-option
            v-for="(it, index) in item.opts"
            :key="index"
            :label="it.label"
            :value="it.value"
          ></el-option>
        </el-select>

        <el-switch
          v-else-if="item.type == 'switch'"
          v-model="formData[item.model]"
          style="width: 380px"
        ></el-switch>

        <el-radio-group v-else-if="item.type == 'radio'" v-model="formData[item.model]">
          <el-radio v-for="(it, index) in item.opts" :key="index" :label="it.value">{{
            it.label
          }}</el-radio>
        </el-radio-group>

        <el-checkbox-group v-else-if="item.type == 'checkbox'" v-model="formData[item.model]">
          <el-checkbox
            v-for="(it, index) in item.opts"
            :key="index"
            :label="it.value"
            :name="item.name"
            >{{ it.label }}</el-checkbox
          >
        </el-checkbox-group>

        <el-date-picker
          v-else-if="item.type == 'date'"
          :start-placeholder="item.pickerDate.type == 'daterange' ? '开始日期' : ''"
          :end-placeholder="item.pickerDate.type == 'daterange' ? '结束日期' : ''"
          :value-format="item.pickerDate.formatValue"
          v-model="formData[item.model]"
          :type="item.pickerDate.type"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  formItems: Array,
  form_Data: Object,
  rules: Object,
})

const formData = ref({})

onMounted(() => {
  formData.value = props.form_Data
})
</script>

<!-- 
 组件需要传递的属性说明：
 formItems: [
        {
          label: '省份名称',
          type: 'ipt',
          model: 'cityName'
        },
        {
          label: '选择时间',
          type: 'date',
          model: 'time1',
          pickerDate: {
            type: 'date',
            formatValue: 'yyyy-MM-dd'
          },
        },
        {
          label: '选择城市',
          type: 'select',
          model: 'city',
          func:true,
          opts: [
            {
              label: '哈尔滨',
              value: '1'
            },
            {
              label: '齐齐哈尔',
              value: '2'
            },
            {
              label: '牡丹江',
              value: '3'
            },
            {
              label: '佳木斯',
              value: '4'
            },
          ]
        },
        {
          label: '喜欢的运动',
          type: 'checkbox',
          model: 'sports',
          opts: [
            {
              label: '篮球',
              value: '1',
              name: 'ball'
            },
            {
              label: '羽毛球',
              value: '2',
              name: 'ball'
            },
            {
              label: '足球',
              value: '3',
              name: 'ball'
            },
          ]
        },
        ]
      
label 元素名称
type 元素类型
model 双向绑定的值
对于选择时间的表单元素
         pickerDate 
                type 表单类型
                formatValue 获得的时间格式
对于 select checkbox radio
        opts 
                存储的是每一项的值和名称

 form_Data Object
       存储的是 你要双向绑定的值 必须写 不能传空对象 否则会报错

rules Object 
      表单校验规则
      rules: {
        cityName: [
          { required: true, message: '请输入cityName', trigger: 'blur' }
        ],
      }

注意 调用.validate 需要调用子组件中表单的ref的.validate方法 
       this.$refs.FormItems.$refs.FormItems_rules.validate((valid) => {
        console.log(valid);
      })
-->
