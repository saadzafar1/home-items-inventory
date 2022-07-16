<template>
  <ProgressSpinner v-if="isLoading" :class="size" />
</template>
<script>
// import { defineProps } from 'vue'
export default {
  setup() {
    return {}
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'large',
    },
  },
}
</script>
<style scoped></style>
