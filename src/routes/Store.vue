<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import useProducts from '../hooks/useProducts.ts'
import { useCategories } from '../hooks/useCategories.ts'
import { computed, ref, watchEffect } from 'vue'
import Pagination from '../components/Pagination.vue'
import ProductItem from '../components/ProductItem.vue'

const router = useRouter()
const route = useRoute()

const q = ref(route.query.q?.toString() ?? '')
const sort = ref(route.query.sort?.toString() ?? '')
const category = ref(route.query.category?.toString() ?? '')
const maxPrice = ref(route.query.maxPrice ? Number(route.query.maxPrice.toString()) : null)
const currentPage = ref(route.query.currentPage ? Number(route.query.currentPage.toString()) : 0)
const limit = ref(10)
const skip = computed(() => currentPage.value * limit.value)

watchEffect(() =>
    router.replace({
        query: {
            q: q.value || undefined,
            sort: sort.value || undefined,
            category: category.value || undefined,
            currentPage: currentPage.value || undefined,
            limit: limit.value || undefined,
            skip: skip.value || undefined,
            maxPrice: maxPrice.value || undefined,
        },
    })
)

const { data } = useProducts({
    skip,
    limit,
    q,
    sort,
    category,
    maxPrice,
})
const { data: categories } = useCategories()
</script>

<template>
    <div class="flex size-full flex-col items-center gap-5 px-20 pb-5">
        <form @submit.prevent class="flex flex-col items-center gap-5">
            <input
                v-model="q"
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div class="flex items-baseline gap-2">
                <select
                    name="sort"
                    v-model="sort"
                    class="block w-full max-w-40 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                    <option value="" disabled selected>Sort</option>
                    <optgroup label="Price">
                        <option value="price-desc">Highest Price</option>
                        <option value="price-asc">Lowest Price</option>
                    </optgroup>
                    <optgroup label="Rating">
                        <option value="rating-desc">Best Rated</option>
                        <option value="rating-asc">Worst Rated</option>
                    </optgroup>
                </select>

                <select
                    name="categories"
                    v-model="category"
                    class="block w-full max-w-40 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                    <option value="" disabled selected>Pick a category</option>
                    <option v-for="category in categories" :key="category.slug" :value="category.slug">
                        {{ category.name }}
                    </option>
                </select>

                <input
                    class="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    type="text"
                    name="maxPrice"
                    placeholder="Max Price"
                    id="maxPrice"
                    v-model="maxPrice"
                />
            </div>
        </form>
        <Pagination
            v-if="data"
            class="w-full"
            :current="currentPage"
            :total="data.total"
            :results-per-page="limit"
            @update:current="(value) => (currentPage = value)"
        />
        <ul role="list" v-if="data" class="flex max-w-xl flex-col items-center gap-5">
            <ProductItem
                class="w-full"
                v-for="product in data.products"
                :key="product.id"
                :="product"
                :ratingsCount="product.reviews.length"
            />
        </ul>
        <Pagination
            v-if="data"
            class="w-full"
            :current="currentPage"
            :total="data.total"
            :results-per-page="limit"
            @update:current="(value) => (currentPage = value)"
        />
    </div>
</template>
