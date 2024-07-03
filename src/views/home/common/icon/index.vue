<template>
  <div class="text-input content_overflow">
    <RowLayout title="封装Icon组件" remark="调用方法： <Zf-Icon icon='user'/>" :source="zfIconCode">
      <div class="row">
        <div class="row_item">
          <div class="row_item_title">图标设置</div>
          <div class="row_item_content">
            <Zf-Icon icon="user" class="regular" />
            <Zf-Icon icon="file" />
            <Zf-Icon icon="folder" />
            <Zf-Icon icon="folder-open" />
            <Zf-Icon icon="bars" />
          </div>
        </div>
        <div class="row_item">
          <div class="row_item_title">图标颜色</div>
          <div class="row_item_content">
            <Zf-Icon icon="cog" type="primary" color="sky" />
            <Zf-Icon icon="compass" type="primary" color="skyblue" />
            <Zf-Icon icon="spinner" type="primary" color="#ccc" />
            <Zf-Icon icon="coffee" type="primary" color="blue" />
            <Zf-Icon icon="compact-disc" type="primary" color="green" />
          </div>
        </div>
        <div class="row_item">
          <div class="row_item_title">图标大小</div>
          <div class="row_item_content">
            <Zf-Icon icon="user-secret" size="2xs" type="primary" />
            <Zf-Icon icon="user-secret" size="xs" type="primary" />
            <Zf-Icon icon="user-secret" size="sm" type="primary" />
            <Zf-Icon icon="user-secret" size="lg" type="primary" />
            <Zf-Icon icon="user-secret" size="xl" type="primary" />
            <!-- <Zf-Icon icon="user-secret" size="3x" type="primary" /> -->
          </div>
        </div>
        <div class="row_item">
          <div class="row_item_title">图标动画</div>
          <div class="row_item_content">
            <Zf-Icon icon="heart" type="primary" beat />
            <Zf-Icon icon="circle-info" type="primary" beat-fade />
            <Zf-Icon icon="basketball" type="primary" bounce />
            <Zf-Icon icon="triangle-exclamation" type="primary" fade />
            <Zf-Icon icon="bell" type="primary" shake />
          </div>
        </div>
        <div class="row_item">
          <div class="row_item_title">旋转与翻转</div>
          <div class="row_item_content">
            <Zf-Icon icon="user-secret" rotation="90" />
            <Zf-Icon icon="bars" rotation="270" />
            <Zf-Icon icon="shield-halved" rotation="180" />
            <Zf-Icon icon="file" flip="horizontal" />
            <Zf-Icon icon="folder-open" flip="both" />
          </div>
        </div>
      </div>
    </RowLayout>
  </div>
</template>
<script setup>
import RowLayout from '@/layouts/rowLayout/index.vue'
import zfIconCode from './compontent/zfIcon.vue?raw'
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  flex-direction: column;

  &_item {
    display: flex;
    flex-direction: column;
    margin-top: 32px;

    &_title {
      text-align: center;
      font-size: 14px;
      margin-bottom: 4px;
      // border-bottom: 1px solid #ccc;
    }

    &_content {
      display: flex;
      justify-content: space-around;
      margin: 8px 0;
    }
  }
}
</style>
