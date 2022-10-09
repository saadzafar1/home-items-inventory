<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { useAuthStore } from '@/stores/auth'

const { autoSigninUser } = useAuthStore()
autoSigninUser()
</script>

<template>
  <Navbar />
  <main class="mt-4">
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>
