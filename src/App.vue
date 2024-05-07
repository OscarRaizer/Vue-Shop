<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import axios from 'axios'
import HeaderApp from './components/HeaderApp.vue'
import CardList from './components/CardList.vue'
// import TheDrawer from './components/TheDrawer.vue'

const items = ref([])

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

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://74ebad0d9d6b3a51.mokky.dev/items/`, {
      params
    })
    items.value = data
  } catch (err) {
    console.log(err)
  }
}

onMounted(fetchItems)
watch(filters, fetchItems)
</script>

<template>
  <!--  <TheDrawer />-->
  <div class="bg-white w-4/5 mx-auto rounded-t-3xl shadow-xl h-auto mt-20">
    <HeaderApp />
    <div class="px-14 py-8 flex items-center justify-between">
      <h2 class="text-3xl font-bold">Все кроссовки</h2>
      <div class="flex gap-8">
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
    <CardList :items="items" />
  </div>
</template>

<style></style>
