<template>
  <!-- <ProgressSpinner v-if="isLoading" :class="size" /> -->
  <span class="loader"></span>
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
<style scoped>
.loader {
    width: 24px;
    height: 24px;
    border: 3px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
</style>
