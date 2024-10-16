<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import useProducts from '../hooks/useProducts'
import ProductItem from './ProductItem.vue'

const { data } = useProducts()

const sortType = ref<'asc' | 'desc' | null>(null)
const currentSortMessage = computed(() => {
	if (sortType.value) {
		return sortType.value === 'desc' ? 'Price descending' : 'Price ascending'
	}
	return 'Sort by price'
})

watch(sortType, () => {
	// TODO: fix sorting, useQueryClient.setData
	// switch (sortType.value) {
	// 	case 'desc':
	// 		data.value.sort((a, b) => a.price - b.price)
	// 		break
	// 	case 'asc':
	// 		data.value.sort((a, b) => b.price - a.price)
	// 		break
	// 	default:
	// 		data.value.sort((a, b) => a.id - b.id)
	// 		break
	// }
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
  <div class="w-full flex justify-end px-52 mb-5">
    <button @click="sortByPrice" class="rounded-md bg-indigo-600
    px-2.5 py-1.5 text-sm font-semibold text-white
    shadow-sm hover:bg-indigo-500 focus-visible:outline
     focus-visible:outline-2 focus-visible:outline-offset-2
     focus-visible:outline-indigo-600">{{ currentSortMessage }}</button>
  </div>
  <ul role="list" class="flex flex-col gap-5 items-center">
      <ProductItem v-for="product in data" :key="product.id" :="product" :ratingsCount="product.reviews.length" />
  </ul>
</template>