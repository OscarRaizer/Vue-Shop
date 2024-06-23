<script setup>
import { inject } from 'vue'

const { closeDrawer } = inject('cart')

defineProps({
  title: String,
  description: String,
  imageUrl: String
})
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-5 p-4 h-full">
    <img height="120" width="120" :src="imageUrl" alt="Cart image" />
    <h2 class="font-bold text-xl">{{ title }}</h2>
    <p class="text-slate-400 text-center">{{ description }}</p>
    <button
      @click="closeDrawer"
      class="flex w-full gap-2 justify-center items-center bg-lime-500 text-white p-4 rounded-2xl hover:scale-105 transition hover:bg-lime-600"
    >
      <img class="fill-zinc-200 rotate-180" src="/arrow-next.svg" alt="arrow" />
      <span>Вернуться назад</span>
    </button>
  </div>
</template>

<style scoped></style>
