<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProduct } from '../hooks/useProduct.ts'
import Rating from '../components/Rating.vue'
import CategoryBadge from '../components/CategoryBadge.vue'
import { capitalize } from '../utils/capitalize.ts'
import { ShieldCheckIcon, TruckIcon, BanknotesIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const { data: product } = useProduct({ id: route.params.id.toString() })
</script>

<template>
    <section v-if="product">
        <div class="flex gap-5">
            <div class="grid size-96 place-items-center overflow-hidden rounded-lg bg-gray-100">
                <img :src="product.thumbnail" :alt="product.title" class="object-cover object-center" />
            </div>

            <div class="flex flex-1 flex-col gap-5">
                <div class="flex justify-between">
                    <h1 class="text-xl font-medium text-gray-900">{{ product.title }}</h1>
                    <p class="text-xl font-medium text-gray-900">${{ product.price }}</p>
                </div>

                <Rating :rating="product.rating" />

                <div class="flex w-3/4 flex-col gap-2">
                    <h2 class="text-sm font-medium text-gray-900">Description</h2>

                    <div class="text-sm text-gray-500" v-html="product.description" />
                </div>

                <div class="flex gap-2">
                    <p
                        class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
                    >
                        #{{ product.id }}
                    </p>
                    <CategoryBadge :category="product.category">
                        {{ capitalize(product.category) }}
                    </CategoryBadge>

                    <p
                        class="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-700/40"
                    >
                        {{ product?.discountPercentage }}% OFF
                    </p>

                    <p
                        class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-700/40"
                    >
                        {{ product?.availabilityStatus }}
                    </p>
                </div>

                <div class="mt-8 border-t border-gray-200 pt-8">
                    <h2 class="text-base font-semibold text-gray-900">Product Information</h2>

                    <ul role="list" class="grid grid-cols-2 text-gray-500">
                        <li>
                            <strong>Stock:</strong>
                            {{ product.stock }}
                        </li>
                        <li>
                            <strong>Brand:</strong>
                            {{ product.brand }}
                        </li>
                        <li>
                            <strong>Weight:</strong>
                            {{ product.weight }} kg
                        </li>
                        <li>
                            <strong>Dimensions:</strong>
                            {{ product?.dimensions.width }} x {{ product?.dimensions.height }} x
                            {{ product?.dimensions.depth }} cm
                        </li>
                    </ul>
                </div>

                <section aria-labelledby="policies-heading" class="grid grid-cols-2 gap-5">
                    <h2 id="policies-heading" class="sr-only">Our Policies</h2>

                    <dl class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                            <dt>
                                <ShieldCheckIcon
                                    class="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                />
                                <span class="mt-4 text-sm font-medium text-gray-900">Warranty Information</span>
                            </dt>
                            <dd class="mt-1 text-sm text-gray-500">{{ product?.warrantyInformation }}</dd>
                        </div>
                    </dl>

                    <dl class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                            <dt>
                                <TruckIcon class="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                <span class="mt-4 text-sm font-medium text-gray-900">Shipping Information</span>
                            </dt>
                            <dd class="mt-1 text-sm text-gray-500">{{ product?.shippingInformation }}</dd>
                        </div>
                    </dl>

                    <dl class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                            <dt>
                                <BanknotesIcon class="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                <span class="mt-4 text-sm font-medium text-gray-900">Return Policy</span>
                            </dt>
                            <dd class="mt-1 text-sm text-gray-500">{{ product?.returnPolicy }}</dd>
                        </div>
                    </dl>

                    <dl class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                            <dt>
                                <ShoppingBagIcon
                                    class="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                />
                                <span class="mt-4 text-sm font-medium text-gray-900">Minimum Order Quantity</span>
                            </dt>
                            <dd class="mt-1 text-sm text-gray-500">
                                {{ product?.minimumOrderQuantity }}
                                {{ product?.minimumOrderQuantity > 1 ? 'items' : 'item' }}
                            </dd>
                        </div>
                    </dl>
                </section>
            </div>
        </div>

        <!-- Reviews Section -->
        <div id="reviews" class="mt-10">
            <h2 class="text-xl font-semibold text-gray-900">Customer Reviews</h2>
            <div class="mt-6 space-y-8">
                <div v-for="(review, index) in product.reviews" :key="index" class="rounded-lg bg-white p-6 shadow">
                    <div class="flex items-center">
                        <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
                            <!-- Initials Avatar -->
                            <span class="font-bold text-gray-500">
                                {{ review.reviewerName.charAt(0) }}
                            </span>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-sm font-medium text-gray-900">
                                {{ review.reviewerName }}
                            </h3>
                            <p class="text-sm text-gray-500">{{ new Date(review.date).toLocaleString() }}</p>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="flex items-center">
                            <Rating :rating="review.rating" />
                            <p class="ml-2 text-sm text-gray-700">{{ review.rating }} / 5</p>
                        </div>
                        <p class="mt-2 text-gray-700">{{ review.comment }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
