<script setup>
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavourite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavourite: Function
})
</script>
<template>
  <div
    class="flex flex-col justify-between bg-white px-8 py-5 relative border-2 rounded-[40px] border-slate-100 hover:-translate-y-1 hover:shadow-xl transition cursor-pointer"
  >
    <img
      class="absolute top-5 hover:scale-125 transition duration-300"
      width="32"
      height="32"
      :src="!isFavourite ? '/like.svg' : '/like-fill.svg'"
      alt="favourite"
      @click="onClickFavourite"
    />
    <img class="h-[133px] w-fit pb-3.5" :src="imageUrl" alt="Sneaker" />
    <p class="mb-3.5">{{ title }}</p>
    <div class="flex justify-between items-center">
      <div class="flex flex-col">
        <span class="uppercase">Цена:</span>
        <b>{{ price }} руб</b>
      </div>
      <img
        class="hover:-translate-y-1 hover:shadow-xl transition"
        width="32"
        height="32"
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="Add"
        @click="onClickAdd"
      />
    </div>
  </div>
</template>

<style></style>
