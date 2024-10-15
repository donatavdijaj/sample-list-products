<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'
import ProductItem from "./ProductItem.vue";
import { downloadProductList } from './download-product-list.ts'
import {filterProducts} from "./filter-products.ts";
import { Product } from './types.ts'

const data = ref<Product[]>([])

onMounted(async () => {
	data.value = filterProducts(await downloadProductList(), 100)
})

const sortType = ref<'asc' | 'desc' | null>(null)
const currentSortMessage = computed(()=>{
  if (sortType.value) {
    return sortType.value === 'desc' ? 'Price descending' : 'Price ascending'
  }
  return 'ID ascending'
})

watch(sortType,()=>{
  switch (sortType.value) {
    case 'desc':
      data.value.sort((a, b) => a.price - b.price)
      break
    case 'asc':
      data.value.sort((a, b) => b.price - a.price)
      break
    default:
      data.value.sort((a, b) => a.id - b.id)
      break
  }
})

function sortByPrice() {
  switch (sortType.value) {
    case 'desc':
      sortType.value = 'asc'
      break
    case 'asc':
      sortType.value = null
      break
    default:
      sortType.value = 'desc'
      break
  }
}

</script>

<template>
  <button @click="sortByPrice">Sort by price</button>
  <p>Current sort: {{ currentSortMessage }}</p>
  <ul v-for="product in data" :key="product.id">
    <ProductItem :="product" />
  </ul>
</template>

<style scoped>
</style>
