<script setup>
import HeaderApp from './components/HeaderApp.vue'
import CardList from './components/CardList.vue'
</script>

<template>
  <div class="bg-white w-4/5 mx-auto rounded-[20px] shadow-xl h-auto mt-20">
    <HeaderApp />
    <div class="px-14 py-11 flex items-center justify-between">
      <h2 class="text-3xl font-bold">Все кроссовки</h2>
    </div>
    <CardList />
  </div>
</template>

<style></style>
