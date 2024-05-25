<template>
  <div class="simple-upload">
    <el-upload
      v-show="!disabled"
      class="upload-btn"
      :action="uploadUrl"
      :on-change="uploadChange"
      :on-success="onSuccessHandler"
      :before-upload="beforeAvatarUpload"
      multiple
    >
      <div class="upload-box">
        <!-- <el-button>点击上传</el-button> -->
        <img class="img" :src="uploadImg" alt="" />
        <div>点击上传</div>
      </div>
      <!-- Todo 站不支持 上传pdf、 -->
      <div slot="tip" class="el-upload__tip">只可上传大小不超过10M，格式为png、jpg、jpeg的文件</div>
    </el-upload>
    <div class="img-box">
      <div v-for="(item, index) in imgList" :key="index" class="img-box-item">
        <div class="img-box-item-mask"></div>
        <div class="img-enlarge el-icon-search" @click="enlargeImg(item)"></div>
        <div v-show="!disabled" class="img-del el-icon-delete" @click="deleteImg(index)"></div>
        <div class="upload-img" :style="{ backgroundImage: 'url(' + item.url + ')' }"></div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import uploadImg from '@/assets/upload/images/upload.png'
import { ElMessage } from 'element-plus'

const props = defineProps({
  curImgList: {
    type: Array,
    default: () => [],
  },
  curDisabled: {
    type: Boolean,
    default: false,
  },
  //上传接口路径 需后台提供接口
  uploadUrl: {
    type: String,
    default: 'https://jsonplaceholder.typicode.com/posts/',
  },
})

// const uploadImg = uploadImg
const imgList = ref([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const uploading = ref(false)

watch(
  () => props.curImgList,
  (newVal, oldVal) => {
    imgList.value = newVal
  }
)

watch(
  () => props.curDisabled,
  (newVal, oldVal) => {
    disabled.value = newVal
  }
)

onMounted(() => {
  imgList.value = curImgList.value
  disabled.value = curDisabled.value
})

const onSuccessHandler = (row) => {
  if (row.code === 100) {
    imgList.value.push({ url: row.data })
  }
}

const deleteImg = (index) => {
  imgList.value.splice(index, 1)
}

const enlargeImg = (item) => {
  dialogImageUrl.value = item.url
  dialogVisible.value = true
}

const beforeAvatarUpload = (file) => {
  const isJPG =
    // file.raw.type === 'application/pdf' ||  TODO 暂不支持pdf
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/xls' ||
    file.type === 'image/xlsx' ||
    file.type === 'image/jpg'
  const isLt10M = file.size / 1024 / 1024 < 10

  if (!isJPG) {
    return ElMessage({
      message: '上传文件只能是 png/jpg/jpeg 格式!',
      type: 'error',
    })
  }
  if (!isLt10M) {
    return ElMessage({
      message: '上传文件不能超过 10MB!',
      type: 'error',
    })
  }
}

const uploadChange = () => {
  uploading.value = true
}
</script>
<style lang="scss" scoped>
.simple-upload {
  text-align: left;
  .upload-btn {
    margin-bottom: 24px;
    :deep(.el-upload__tip) {
      margin-top: 4px;
      font-size: 12px;
      color: #717378;
      line-height: 20px;
    }
  }
  .upload-box {
    display: flex;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #dce1e6;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    color: #717378;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    padding: 10px;
    font-size: 14px;
    .img {
      margin-right: 5px;
      display: block;
    }
  }
  .img-box {
    display: flex;
    align-items: center;
    .img-box-item {
      width: 140px;
      height: 140px;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      margin-right: 16px;
      margin-bottom: 16px;
    }
    .img-enlarge {
      position: absolute;
      top: 58px;
      left: 34px;
      font-size: 24px;
      color: #fff;
      cursor: pointer;
      display: none;
    }
    .img-del {
      position: absolute;
      top: 58px;
      left: 82px;
      cursor: pointer;
      display: none;
      font-size: 24px;
      color: #fff;
    }
    .img-box-item-mask {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: none;
    }
    .img-box-item:hover {
      .img-del,
      .img-enlarge,
      .img-box-item-mask {
        display: inline-block;
      }
    }
    .upload-img {
      width: 140px;
      height: 140px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
}
</style>
