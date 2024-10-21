<script setup lang="ts">
import StarIcon from './StarIcon.vue'

type Props = {
    rating: number
}

defineProps<Props>()
</script>

<template>
    <h4 class="sr-only">Reviews</h4>
    <div class="flex items-center gap-2">
        <p class="text-base text-gray-700">
            {{ rating }}
            <span class="sr-only">out of 5 stars</span>
        </p>
        <div class="flex items-center">
            <StarIcon v-for="i in [0, 1, 2, 3, 4]" :key="rating" :active="rating > i" aria-hidden="true" />
        </div>
    </div>
</template>
