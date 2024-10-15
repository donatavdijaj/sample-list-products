<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProductItem from "./ProductItem.vue";
import { downloadProductList } from './download-product-list.ts'
import { Product } from './types.ts'

const data = ref<Product[]>([])

onMounted(async () => {
	data.value = await downloadProductList()
})
</script>

<template>
  <ul v-for="product in data" :key="product.id">
    <ProductItem :="product" />
  </ul>
</template>

<style scoped>
</style>
