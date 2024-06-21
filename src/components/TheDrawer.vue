<script setup>
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'

defineProps({
  totalPrice: Number,
  vatPrice: Number
})

const emit = defineEmits(['createOrder'])
</script>

<template>
  <div class="fixed w-full h-full bg-black opacity-80 z-10 top-0"></div>
  <div class="flex flex-col bg-white z-20 fixed top-0 right-0 w-1/4 h-full p-8 opacity-100">
    <DrawerHead />
    <CartItemList />
    <div class="flex flex-col gap-4 mt-auto text-base">
      <div class="flex items-center justify-between">
        <span class="text-">Итого:</span>
        <div class="flex-1 border-b border-dashed border-b-slate-300 mt-auto"></div>
        <b class="font-semibold">{{ totalPrice }}</b>
      </div>
      <div class="flex items-center justify-between gap-1">
        <span>Налог 10%:</span>
        <div class="flex-1 border-b border-dashed border-b-slate-300 mt-auto"></div>
        <b class="font-semibold">{{ vatPrice }}</b>
      </div>
      <button
        :disabled="!totalPrice"
        @click="emit('createOrder')"
        class="flex gap-2 justify-center items-center bg-lime-500 text-white p-4 rounded-2xl hover:scale-105 transition hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:scale-100"
      >
        <span>Оформить заказ</span>
        <img class="fill-zinc-200" src="/arrow-next.svg" alt="arrow" />
      </button>
    </div>
  </div>
</template>

<style scoped></style>
