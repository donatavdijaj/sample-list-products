<script setup lang="ts">
import {
    ChevronLeftIcon,
    ChevronDoubleLeftIcon,
    ChevronRightIcon,
    ChevronDoubleRightIcon,
} from '@heroicons/vue/20/solid'
import { computed } from 'vue'

type Props = {
    current: number
    total: number
    resultsPerPage: number
}

type Emits = {
    (e: 'update:current', value: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const totalPages = computed(() => Math.ceil(props.total / props.resultsPerPage))
</script>

<template>
    <div class="flex items-center justify-between">
        <div class="flex flex-1 items-center justify-between sm:hidden">
            <a
                href="#"
                class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                :class="{ 'cursor-not-allowed opacity-50': current === 0 }"
                @click.prevent="current > 0 && emit('update:current', current - 1)"
            >
                Previous
            </a>
            <p v-if="totalPages > 0" class="text-xs text-gray-600">
                <span class="font-medium">{{ current * resultsPerPage + 1 }}</span>
                {{ ' ' }}
                to
                {{ ' ' }}
                <span class="font-medium">{{ Math.min((current + 1) * resultsPerPage, total) }}</span>
                {{ ' ' }}
                of
                {{ ' ' }}
                <span class="font-medium">{{ total }}</span>
                {{ ' ' }}
                results
            </p>
            <p v-else class="text-sm text-gray-700">No results found.</p>
            <a
                href="#"
                class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                :class="{ 'cursor-not-allowed opacity-50': current === totalPages - 1 }"
                @click.prevent="current < totalPages - 1 && emit('update:current', current + 1)"
            >
                Next
            </a>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p v-if="totalPages > 0" class="text-sm text-gray-700">
                    Showing
                    {{ ' ' }}
                    <span class="font-medium">{{ current * resultsPerPage + 1 }}</span>
                    {{ ' ' }}
                    to
                    {{ ' ' }}
                    <span class="font-medium">{{ Math.min((current + 1) * resultsPerPage, total) }}</span>
                    {{ ' ' }}
                    of
                    {{ ' ' }}
                    <span class="font-medium">{{ total }}</span>
                    {{ ' ' }}
                    results
                </p>
                <p v-else class="text-sm text-gray-700">No results found.</p>
            </div>
            <div>
                <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <a
                        href="#"
                        class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        :class="{ 'cursor-not-allowed opacity-50': current === 0 || total < 1 }"
                        @click.prevent="current > 0 && emit('update:current', 0)"
                    >
                        <span class="sr-only">Previous</span>
                        <ChevronDoubleLeftIcon class="h-5 w-5" aria-hidden="true" />
                    </a>
                    <a
                        href="#"
                        class="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        :class="{ 'cursor-not-allowed opacity-50': current === 0 || total < 1 }"
                        @click.prevent="current > 0 && emit('update:current', current - 1)"
                    >
                        <span class="sr-only">Previous</span>
                        <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
                    </a>
                    <a
                        href="#"
                        class="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        :class="{ 'cursor-not-allowed opacity-50': current === totalPages - 1 || total < 1 }"
                        @click.prevent="current < totalPages - 1 && emit('update:current', current + 1)"
                    >
                        <span class="sr-only">Next</span>
                        <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                    </a>
                    <a
                        href="#"
                        class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        :class="{ 'cursor-not-allowed opacity-50': current === totalPages - 1 || total < 1 }"
                        @click.prevent="current < totalPages - 1 && emit('update:current', totalPages - 1)"
                    >
                        <span class="sr-only">Next</span>
                        <ChevronDoubleRightIcon class="h-5 w-5" aria-hidden="true" />
                    </a>
                </nav>
            </div>
        </div>
    </div>
</template>
