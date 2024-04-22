<script setup></script>

<template>
  <div class="px-14 py-11 border-b border-slate-300">
    <div class="flex justify-between items-center">
      <div class="flex gap-4">
        <img class="w-10 h-fit" src="/logo.png" alt="logo" />
        <div>
          <h2 class="font-bold text-xl">VUE SNEAKERS</h2>
          <span class="text-slate-400">Магазин лучших кроссовок</span>
        </div>
      </div>
      <div>
        <ul class="flex gap-8">
          <li
            class="flex items-center justify-center gap-2.5 text-slate-600 hover:text-black cursor-pointer"
          >
            <img src="/cart.svg" alt="" />
            <span class="text-base font-semibold">1205p</span>
          </li>
          <li
            class="flex items-center justify-center gap-2.5 text-slate-500 hover:text-black cursor-pointer"
          >
            <img src="/heart.svg" alt="" />
            <span class="text-base">Закладки</span>
          </li>
          <li
            class="flex items-center justify-center gap-2.5 text-slate-500 hover:text-black cursor-pointer"
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
