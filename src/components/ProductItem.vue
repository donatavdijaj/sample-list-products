<script setup lang="ts">
import { useDeleteProduct } from '../hooks/useDeleteProduct.ts'
import { capitalize } from '../utils/capitalize.ts'
import CategoryBadge from './CategoryBadge.vue'
import StarIcon from './StarIcon.vue'

const props = defineProps({
    id: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true },
    ratingsCount: { type: Number, required: true },
    price: { type: Number, required: true },
})

const { mutate, isPending } = useDeleteProduct()
const handleDelete = () => mutate({ id: props.id })
</script>

<template>
    <li class="flex rounded-lg border p-2 text-left text-base">
        <div class="flex items-start gap-5">
            <figure class="size-64 overflow-hidden rounded-lg bg-gray-100">
                <img :src="thumbnail" :alt="title" class="object-cover object-center" />
            </figure>
            <div class="flex h-full flex-col justify-between">
                <div class="flex flex-col pr-4">
                    <h2 class="flex items-baseline gap-2 text-xl font-semibold text-gray-900">
                        {{ title }}
                    </h2>

                    <section aria-labelledby="information-heading" class="mt-1">
                        <h3 id="information-heading" class="sr-only">Product information</h3>

                        <p class="font-medium text-gray-900">${{ price }}</p>

                        <div class="mt-4">
                            <h4 class="sr-only">Reviews</h4>
                            <div class="flex items-center">
                                <p class="text-sm text-gray-700">
                                    {{ rating }}
                                    <span class="sr-only">out of 5 stars</span>
                                </p>
                                <div class="ml-1 flex items-center">
                                    <StarIcon
                                        v-for="i in [0, 1, 2, 3, 4]"
                                        :key="rating"
                                        :active="rating > i"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div class="ml-4 hidden lg:flex lg:items-center">
                                    <span class="text-gray-300" aria-hidden="true">&middot;</span>
                                    <a href="#" class="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        See all {{ ratingsCount }} reviews
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <section aria-labelledby="actions-heading" class="flex w-full items-baseline justify-between">
                    <h3 id="actions-heading" class="sr-only">Product actions</h3>

                    <div class="flex gap-1">
                        <span
                            class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
                        >
                            #{{ id }}
                        </span>
                        <CategoryBadge :category="category">{{ capitalize(category) }}</CategoryBadge>
                    </div>

                    <button
                        @click="handleDelete"
                        type="button"
                        :disabled="isPending"
                        class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
                    >
                        {{ isPending ? 'Deleting...' : 'Delete' }}
                    </button>
                </section>
            </div>
        </div>
    </li>
</template>
