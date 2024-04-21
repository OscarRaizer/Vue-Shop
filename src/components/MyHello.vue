<script setup>
const props = defineProps({
  title: String,
  have: Boolean,
  price: Number
})

console.log(props)
</script>

<template>
  <div class="product">
    <h1>Товар: {{ title }}</h1>
    <h1>Наличие: {{ have }}</h1>
    <h1>Цена: {{ price }}</h1>
    <slot></slot>
  </div>
</template>

<style>
.product {
  background-color: rgb(45, 45, 45);
  padding: 25px;
  border: 1px solid palevioletred;
  border-radius: 2%;
}
</style>
