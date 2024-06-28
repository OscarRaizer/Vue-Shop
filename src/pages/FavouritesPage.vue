<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import CardList from '../components/CardList.vue'

const favourites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://74ebad0d9d6b3a51.mokky.dev/favourites?_relations=items'
    )
    favourites.value = data.map((obj) => obj.item)
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <div class="mb-14">
    <h2 class="text-3xl font-bold">Мои закладки</h2>
  </div>
  <CardList :items="favourites" />
</template>

<style scoped></style>
