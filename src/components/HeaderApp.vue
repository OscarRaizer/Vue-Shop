<script setup>
const emit = defineEmits(['openDrawer'])

defineProps({
  totalPrice: Number
})
</script>

<template>
  <div class="px-14 py-11 border-b border-slate-300">
    <div class="flex justify-between items-center">
      <RouterLink to="/">
        <div class="flex gap-4">
          <img class="w-10 h-fit" src="/logo.png" alt="logo" />
          <div>
            <h2 class="font-bold text-xl">VUE SNEAKERS</h2>
            <span class="text-slate-400">Магазин лучших кроссовок</span>
          </div>
        </div>
      </RouterLink>
      <div>
        <ul class="flex gap-8">
          <li
            @click="() => emit('openDrawer')"
            class="flex items-center justify-center gap-2.5 text-slate-600 hover:text-black hover:border-b-2 cursor-pointer"
          >
            <img src="/cart.svg" alt="" />
            <span class="text-base font-semibold">{{ totalPrice }}</span>
          </li>
          <RouterLink to="/favourites">
            <li
              class="flex items-center justify-center gap-2.5 text-slate-500 hover:text-black cursor-pointer hover:border-b-2"
            >
              <img src="/heart.svg" alt="" />
              <span class="text-base">Закладки</span>
            </li>
          </RouterLink>

          <li
            class="flex items-center justify-center gap-2.5 text-slate-500 hover:text-black cursor-pointer hover:border-b-2"
          >
            <img src="/profile.svg" alt="" />
            <span class="text-base">Профиль</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style></style>
