<script setup>
import TheCard from './TheCard.vue'

defineProps({
  items: Array,
  isFavourite: Boolean
})

const emit = defineEmits(['addToFavourite', 'addToCart'])
</script>

<template>
  <div class="grid grid-cols-4 gap-10" v-auto-animate>
    <TheCard
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :price="item.price"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :onClickFavourite="() => emit('addToFavourite', item)"
      :isFavourite="item.isFavourite"
      :onClickAdd="() => emit('addToCart', item)"
      :is-added="item.isAdded"
    />
  </div>
</template>

<style scoped></style>
