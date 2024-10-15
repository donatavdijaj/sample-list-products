<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query'
import { colors } from '../utils/colors.ts'

const props = defineProps({
	id: Number,
	thumbnail: String,
	title: String,
	category: String,
	rating: Number,
	price: Number,
})

const bgColor = colors.get(props.category)

const queryClient = useQueryClient()

function deleteItem() {
	queryClient.setQueryData(['products'], (prev) =>
		prev.filter(({ id }) => id !== props.id),
	)
}
</script>

<template>
  <li class="flex-row" :style="{ background: bgColor }">
    <img class="thumbnail" :src="thumbnail" :alt="title" />
    <div class="flex-column">
      <div class="flex-row gap-2 align-baseline">
        <h1 class="id">#{{ id }}</h1>
        <h2 class="title">{{ title }}</h2>
        <button @click="deleteItem">Delete</button>
      </div>
      <div class="flex-row gap-5">
        <p>{{ category }}</p>
        <p>Rating: {{ rating }}</p>
        <p>${{ price }}</p>
      </div>
    </div>
  </li>
</template>

<style scoped>
  .id {
    color: gray;
    font-weight: normal;
    font-style: italic;
    font-size: 1em;
  }

  .title {
    font-size: 1.3em;
    font-weight: 400;
    font-style: normal;
  }

  .thumbnail {
    width: 150px;
    height: 150px;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
  }

  .align-baseline {
    align-items: baseline;
  }

  .gap-2 {
    gap: 0.6rem;
  }

  .gap-5 {
    gap: 1.25rem;
  }
</style>