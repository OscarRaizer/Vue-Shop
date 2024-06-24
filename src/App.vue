<script setup>
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'
import axios from 'axios'
import HeaderApp from './components/HeaderApp.vue'
import CardList from './components/CardList.vue'
import TheDrawer from './components/TheDrawer.vue'

const items = ref([])
const cart = ref([])

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const drawerDisplay = ref(false)

const openDrawer = () => {
  drawerDisplay.value = true
}

const closeDrawer = () => {
  drawerDisplay.value = false
}

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const vatPrice = computed(() => Math.round(totalPrice.value * 10) / 100)

const filters = reactive({
  sortBy: '',
  searchQuery: ''
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const fetchFavourites = async () => {
  try {
    const { data: favourites } = await axios.get(`https://74ebad0d9d6b3a51.mokky.dev/favourites`)

    items.value = items.value.map((item) => {
      const favourite = favourites.find((favourite) => favourite.cardId === item.id)

      if (!favourite) {
        return item
      }
      return {
        ...item,
        isFavourite: true,
        favouriteId: favourite.id
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const addToFavourite = async (item) => {
  try {
    if (!item.isFavourite) {
      const obj = {
        cardId: item.id
      }
      item.isFavourite = true
      const { data } = await axios.post(`https://74ebad0d9d6b3a51.mokky.dev/favourites`, obj)
      item.favouriteId = data.id
    } else {
      item.isFavourite = false
      await axios.delete(`https://74ebad0d9d6b3a51.mokky.dev/favourites/${item.favouriteId}`)
      item.favouriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://74ebad0d9d6b3a51.mokky.dev/items`, {
      params
    })
    items.value = data.map((obj) => ({
      ...obj,
      isFavourite: false,
      favouriteId: null,
      isAdded: false
    }))
  } catch (err) {
    console.log(err)
  }
}

const createOrder = async () => {
  try {
    const { data } = await axios.post(`https://74ebad0d9d6b3a51.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: totalPrice.value
    })

    cart.value = []

    return data
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavourites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})
watch(filters, fetchItems)

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: true
  }))
})

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
  <TheDrawer
    :totalPrice="totalPrice"
    :vat-price="vatPrice"
    v-if="drawerDisplay"
    @create-order="createOrder"
  />
  <div class="bg-white w-4/5 mx-auto rounded-t-3xl shadow-xl h-auto mt-20">
    <HeaderApp :total-price="totalPrice" @open-drawer="openDrawer" />
    <div class="px-14 py-8 flex items-center justify-between">
      <h2 class="text-3xl font-bold">Все кроссовки</h2>
      <div class="flex gap-8 overflow-hidden">
        <select
          @change="onChangeSelect"
          class="outline-0 border rounded-md focus:border-gray-400 p-2 px-2 cursor-pointer"
        >
          <option value="name">По названию</option>
          <option value="-price">По убыванию цены</option>
          <option value="price">По возрастанию цены</option>
        </select>
        <div class="flex items-center gap-3 relative">
          <img class="absolute left-3" src="/search.svg" alt="" />
          <input
            @input="onChangeSearchInput"
            class="border rounded-md outline-none focus:border-gray-400 p-2 pl-10"
            type="text"
            placeholder="Поиск..."
          />
        </div>
      </div>
    </div>
    <CardList :items="items" @add-to-favourite="addToFavourite" @add-to-cart="onClickAddPlus" />
  </div>
</template>

<style></style>
