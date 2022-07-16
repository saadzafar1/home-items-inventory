<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
</script>

<template>
    <Navbar />
  <main class="mt-4">
    <RouterView />
  </main>
</template>

<style>


</style>
