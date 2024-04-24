<script setup>
import TheCard from './TheCard.vue'

const onClickAdd = () => {
  alert('Added')
}

const onClickFavorite = () => {
  alert('Favorite')
}
</script>

<template>
  <div class="px-14 py-11 grid grid-cols-4 gap-10">
    <TheCard
      :is-added="true"
      :is-favorite="true"
      :price="14444"
      imageUrl="/like-fill.svg"
      title="Air Max"
      :onClickAdd="onClickAdd"
      :onClickFavorite="onClickFavorite"
    />
  </div>
</template>

<style scoped></style>
