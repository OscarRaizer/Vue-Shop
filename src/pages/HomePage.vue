<script setup>
import CardList from '../components/CardList.vue'
import { inject, onMounted, reactive, ref, watch } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'

const { cart, addToCart, removeFromCart } = inject('cart')

const items = ref([])

const filters = reactive({
  sortBy: '',
  searchQuery: ''
})

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

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 500)

const addToFavourite = async (item) => {
  try {
    if (!item.isFavourite) {
      const obj = {
        item_id: item.id
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

const fetchFavourites = async () => {
  try {
    const { data: favourites } = await axios.get(`https://74ebad0d9d6b3a51.mokky.dev/favourites`)

    items.value = items.value.map((item) => {
      const favourite = favourites.find((favourite) => favourite.item_id === item.id)

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

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: true
  }))
})

watch(filters, fetchItems)
</script>

<template>
  <div class="mb-14 flex items-center justify-between">
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
</template>

<style scoped></style>
