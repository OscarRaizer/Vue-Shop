<script setup>
import TheCard from './TheCard.vue'

defineProps({
  items: Array
})
</script>

<template>
  <div class="px-14 py-11 grid grid-cols-4 gap-10">
    <TheCard
      v-for="item in items"
      :key="item.id"
      :price="item.price"
      :imageUrl="item.imageUrl"
      :title="item.title"
    />
  </div>
</template>

<style scoped></style>
