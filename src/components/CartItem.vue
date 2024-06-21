<script setup>
const emit = defineEmits(['onClickRemove'])

defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number
})
</script>

<template>
  <div class="flex gap-5 content-center border border-slate-200 p-5 rounded-2xl">
    <img class="w-20" :src="imageUrl" :alt="title" />
    <div class="flex flex-col gap-1">
      <span>{{ title }}</span>
      <div class="flex justify-between">
        <span class="font-bold">{{ price }}</span>
        <img
          @click="emit('onClickRemove')"
          class="hover:scale-110 cursor-pointer"
          src="/close.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
