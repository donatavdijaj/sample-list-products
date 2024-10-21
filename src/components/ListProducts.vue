<script setup lang="ts">
import { Product } from '../utils/types.ts'
import ProductItem from './ProductItem.vue'

defineProps({
    products: Array<Product>,
})
</script>

<template>
    <div class="mb-5 flex w-full justify-end px-52"></div>
    <ul role="list" class="flex max-w-xl flex-col items-center gap-5">
        <ProductItem
            class="w-full"
            v-for="product in products"
            :key="product.id"
            :="product"
            :ratingsCount="product.reviews.length"
        />
    </ul>
</template>
