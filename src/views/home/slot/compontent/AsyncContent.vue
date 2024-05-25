<template>
  <div>
    <slot name="loading" v-if="isLoading"></slot>
    <slot name="error" v-else-if="error" :error="error">{{ error }}</slot>
    <slot name="default" v-else :content="content">{{ content }}</slot>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  contentPromise: Promise,
})

const isLoading = ref(true)
const content = ref(null)
const error = ref(null)

onMounted(async () => {
  try {
    content.value = await props.contentPromise
    error.value = null
  } catch (err) {
    content.value = null
    error.value = { originError: err, message: err.message }
  } finally {
    isLoading.value = false
  }
})
</script>
