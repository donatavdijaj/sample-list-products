<script setup lang="ts">
import { useDeleteProduct } from '../hooks/useDeleteProduct.ts'
import { capitalize } from '../utils/capitalize.ts'
import CategoryBadge from './CategoryBadge.vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import Rating from './Rating.vue'

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
    <RouterLink
        :to="'/' + id.toString()"
        class="flex w-[550px] gap-5 rounded-lg border bg-white p-2 text-left text-base"
    >
        <div class="size-64 overflow-hidden rounded-lg bg-gray-100">
            <img :src="thumbnail" :alt="title" class="object-cover object-center" />
        </div>
        <div class="flex flex-1 flex-col justify-between">
            <div class="flex flex-col gap-0">
                <h2 class="flex items-baseline gap-2 text-xl font-semibold tracking-tight text-gray-900">
                    {{ title }}
                </h2>

                <section aria-labelledby="information-heading" class="mt-1 flex flex-col gap-5">
                    <h3 id="information-heading" class="sr-only">Product information</h3>

                    <p class="font-medium text-gray-900">${{ price }}</p>

                    <Rating :rating />
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
                    @click.stop.prevent="handleDelete"
                    type="button"
                    :disabled="isPending"
                    class="flex gap-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
                >
                    <TrashIcon class="size-5" />
                </button>
            </section>
        </div>
    </RouterLink>
</template>
