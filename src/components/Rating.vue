<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/24/solid'

type Props = {
    rating: number
}

defineProps<Props>()
</script>

<template>
    <div class="flex items-center gap-2">
        <h4 class="sr-only">Rating</h4>
        <p class="text-base text-gray-700">
            {{ rating }}
            <span class="sr-only">out of 5 stars</span>
        </p>
        <div class="flex items-center">
            <StarIcon
                v-for="i in [0, 1, 2, 3, 4]"
                :key="rating"
                class="size-5"
                :class="{ 'text-yellow-500': rating > i, 'text-gray-300': rating <= i }"
                aria-hidden="true"
            />
        </div>
    </div>
</template>
