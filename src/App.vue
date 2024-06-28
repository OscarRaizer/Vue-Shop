<script setup>
import { computed, provide, ref, watch } from 'vue'
import HeaderApp from './components/HeaderApp.vue'
import TheDrawer from './components/TheDrawer.vue'

/*CART (START)*/
const cart = ref([])

const drawerDisplay = ref(false)

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

const openDrawer = () => {
  drawerDisplay.value = true
}

const closeDrawer = () => {
  drawerDisplay.value = false
}

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const vatPrice = computed(() => Math.round(totalPrice.value * 10) / 100)
/*CART (END)*/

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', {
  cart,
  openDrawer,
  closeDrawer,
  addToCart,
  removeFromCart
})
</script>

<template>
  <TheDrawer :totalPrice="totalPrice" :vat-price="vatPrice" v-if="drawerDisplay" />
  <div class="bg-white w-4/5 mx-auto rounded-t-3xl shadow-xl h-auto mt-20">
    <HeaderApp :total-price="totalPrice" @open-drawer="openDrawer" />
    <div class="px-14 py-8">
      <router-view></router-view>
    </div>
  </div>
</template>

<style></style>
