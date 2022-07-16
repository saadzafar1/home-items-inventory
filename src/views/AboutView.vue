<template>
  <div class="about">
    <h1>{{ bar }}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bar: ''
    }
  },
  methods: {
    change() {
      this.bar = 'ok'
    }
  },

  created() {
    this.change();
    this.bar='not ok'
  }
}
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
