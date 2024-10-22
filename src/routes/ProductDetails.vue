<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProduct } from '../hooks/useProduct.ts'
import Rating from '../components/Rating.vue'
import CategoryBadge from '../components/CategoryBadge.vue'
import { capitalize } from '../utils/capitalize.ts'
import { ShieldCheckIcon, TruckIcon, BanknotesIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline'
import { currencyFormatter } from '../utils/formatters.ts'

const route = useRoute()
const { data: product } = useProduct({ id: route.params.id.toString() })
</script>

<template>
    <article v-if="product" class="flex size-full flex-col gap-5 p-10">
        <div class="flex gap-5">
            <div class="grid size-96 place-items-center overflow-hidden rounded-lg bg-gray-100">
                <img :src="product.thumbnail" :alt="product.title" class="object-cover object-center" />
            </div>

            <section aria-labelledby="product-information-heading" class="flex flex-1 flex-col gap-5">
                <h2 id="product-information-heading" class="sr-only">Product Information</h2>

                <div class="flex justify-between pr-10">
                    <h1 class="text-xl font-semibold text-gray-900">{{ product.title }}</h1>
                    <p class="text-xl font-semibold text-gray-900">{{ currencyFormatter.format(product.price) }}</p>
                </div>

                <Rating :rating="product.rating" />

                <div class="flex w-3/4 flex-col gap-2">
                    <h2 class="sr-only">Description</h2>
                    <p class="text-sm text-gray-500" v-html="product.description" />
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

                <div class="border-t border-gray-200 pt-5">
                    <h2 class="text-base font-semibold text-gray-900">Product Information</h2>

                    <div class="grid grid-cols-2 pt-5 text-gray-500">
                        <dl class="flex gap-2">
                            <dt class="font-semibold">Stock:</dt>
                            <dd>{{ product.stock }}</dd>
                        </dl>
                        <dl class="flex gap-2">
                            <dt class="font-semibold">Brand:</dt>
                            <dd>{{ product.brand }}</dd>
                        </dl>
                        <dl class="flex gap-2">
                            <dt class="font-semibold">Weight:</dt>
                            <dd>{{ product.weight }} kg</dd>
                        </dl>
                        <dl class="flex gap-2">
                            <dt class="font-semibold">Dimensions:</dt>
                            <dd>
                                {{ product?.dimensions.width }} x {{ product?.dimensions.height }} x
                                {{ product?.dimensions.depth }} cm
                            </dd>
                        </dl>
                    </div>
                </div>
            </section>
        </div>

        <section aria-labelledby="policies-heading" class="pt-7">
            <h2 id="policies-heading" class="sr-only">Our Policies</h2>

            <dl class="grid grid-cols-2 justify-evenly gap-5 sm:grid-cols-4">
                <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                    <dt>
                        <ShieldCheckIcon class="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <span class="mt-4 text-sm font-semibold text-gray-900">Warranty Information</span>
                    </dt>
                    <dd class="mt-1 text-sm text-gray-500">{{ product?.warrantyInformation }}</dd>
                </div>
                <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                    <dt>
                        <TruckIcon class="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <span class="mt-4 text-sm font-semibold text-gray-900">Shipping Information</span>
                    </dt>
                    <dd class="mt-1 text-sm text-gray-500">{{ product?.shippingInformation }}</dd>
                </div>
                <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                    <dt>
                        <BanknotesIcon class="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <span class="mt-4 text-sm font-semibold text-gray-900">Return Policy</span>
                    </dt>
                    <dd class="mt-1 text-sm text-gray-500">{{ product?.returnPolicy }}</dd>
                </div>
                <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                    <dt>
                        <ShoppingBagIcon class="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <span class="mt-4 text-sm font-semibold text-gray-900">Minimum Order Quantity</span>
                    </dt>
                    <dd class="mt-1 text-sm text-gray-500">
                        {{ product?.minimumOrderQuantity }}
                        {{ product?.minimumOrderQuantity > 1 ? 'items' : 'item' }}
                    </dd>
                </div>
            </dl>
        </section>

        <section aria-labelledby="reviews-heading" class="p-10">
            <h2 id="reviews-heading" class="text-lg font-medium text-gray-900">Reviews</h2>
            <div class="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
                <div
                    v-for="review in product.reviews"
                    :key="review.reviewerName"
                    class="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
                >
                    <div
                        class="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8"
                    >
                        <Rating :rating="review.rating" />

                        <div class="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                            <h3 class="text-sm font-medium text-gray-900">{{ review.comment }}</h3>

                            <div class="mt-3 space-y-6 text-sm text-gray-500" v-html="review.comment" />
                        </div>
                    </div>

                    <div
                        class="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3"
                    >
                        <p class="font-medium text-gray-900">{{ review.reviewerName }}</p>
                        <time
                            :datetime="review.date"
                            class="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                        >
                            {{ new Date(review.date).toLocaleString() }}
                        </time>
                    </div>
                </div>
            </div>
        </section>
    </article>
</template>
