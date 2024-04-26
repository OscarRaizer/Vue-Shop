<script setup>
import HeaderApp from './components/HeaderApp.vue'
import CardList from './components/CardList.vue'
// import TheDrawer from './components/TheDrawer.vue'
</script>

<template>
  <!--  <TheDrawer />-->
  <div class="bg-white w-4/5 mx-auto rounded-[20px] shadow-xl h-auto mt-20">
    <HeaderApp />
    <div class="px-14 py-8 flex items-center justify-between">
      <h2 class="text-3xl font-bold">Все кроссовки</h2>

      <select class="outline-0 border rounded-md focus:border-gray-400 p-2" name="frefrgrg" id="">
        <option>По названию</option>
        <option>По убыванию цены</option>
        <option>По возрастанию цены</option>
      </select>
      <div class="flex items-center gap-3 relative">
        <img class="absolute left-3" src="/search.svg" alt="" />
        <input
          class="border rounded-md outline-none focus:border-gray-400 p-2 pl-10"
          type="text"
          placeholder="Поиск..."
        />
      </div>
    </div>
    <CardList />
  </div>
</template>

<style></style>
