<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import ListProducts from './components/ListProducts.vue'
</script>

<template>
    <div class="h-dvh w-dvw flex flex-col">
      <nav class="border-b border-gray-200 bg-white flex gap-5 h-16 px-5">
        <img class="size-8 self-center" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
        <div class="flex gap-5">
          <a href="#" class="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900" aria-current="page">Store</a>
          <a href="#" class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">Deleted Items</a>
        </div>
      </nav>
      <div class="overflow-auto flex-1">
        <header class="py-5 px-12">
          <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">Store</h1>
        </header>
        <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <ListProducts/>
        </main>
      </div>
    </div>
  <VueQueryDevtools/>
</template>