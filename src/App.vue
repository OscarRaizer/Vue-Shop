<script setup>
import MyHello from './components/MyHello.vue'
</script>

<template>
  <div class="m-10 bg-red-90 text-white">
    <MyHello title="Adidas" have :price="12" class="m-100">
      <button>click me!</button>
    </MyHello>
  </div>
</template>

<style>
#app {
  display: flex;
  gap: 30px;
}
</style>
