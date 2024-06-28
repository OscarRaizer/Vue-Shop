<script setup>
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'
import axios from 'axios'
import { inject, ref } from 'vue'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})

const { cart } = inject('cart')

const orderId = ref(null)

const createOrder = async () => {
  try {
    const { data } = await axios.post(`https://74ebad0d9d6b3a51.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: props.totalPrice.value
    })

    cart.value = []
    orderId.value = data.id
    return data
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <div class="fixed w-full h-full bg-black opacity-80 z-10 top-0"></div>
  <div class="flex flex-col bg-white z-20 fixed top-0 right-0 w-1/4 h-full p-8 opacity-100">
    <DrawerHead />

    <div v-if="orderId || !totalPrice" class="flex h-full items-center">
      <InfoBlock
        v-if="!totalPrice && !orderId"
        image-url="/package-icon.png"
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
      />

      <InfoBlock
        v-if="orderId"
        image-url="/order-success-icon.png"
        title="Заказ оформлен"
        :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
      />
    </div>

    <div v-else class="flex flex-col justify-between h-full">
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
          @click="createOrder"
          class="flex gap-2 justify-center items-center bg-lime-500 text-white p-4 rounded-2xl hover:scale-105 transition hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:scale-100"
        >
          <span>Оформить заказ</span>
          <img class="fill-zinc-200" src="/arrow-next.svg" alt="arrow" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
