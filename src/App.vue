<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { BuildingStorefrontIcon } from '@heroicons/vue/24/solid'
import { useQueryClient } from '@tanstack/vue-query'

const queryClient = useQueryClient()

function restoreDeletedItems() {
    for (const k of Object.keys(localStorage)) {
        if (k.includes('deleted')) localStorage.removeItem(k)
    }

    queryClient.invalidateQueries({ queryKey: ['products'] })
}
</script>

<template>
    <div class="flex h-dvh w-dvw flex-col">
        <nav class="flex h-16 w-full gap-8 border-b border-gray-200 px-5">
            <BuildingStorefrontIcon class="size-8 self-center text-indigo-700" />
            <RouterLink
                to="/"
                class="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                aria-current="page"
            >
                Store
            </RouterLink>
            <button
                @click="restoreDeletedItems"
                class="ml-auto self-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
            >
                Restore deleted items
            </button>
        </nav>
        <div class="flex-1 overflow-auto">
            <header class="px-12 pt-5">
                <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">Store</h1>
            </header>
            <main>
                <RouterView />
            </main>
        </div>
    </div>
    <VueQueryDevtools />
</template>
