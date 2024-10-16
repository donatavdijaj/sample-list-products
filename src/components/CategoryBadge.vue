<script setup lang="ts">
const props = defineProps({
	category: String,
})

const colors = {
	'bg-red-100 text-red-700 ring-red-300': props.category === 'beauty',
	'bg-lime-100 text-lime-700 ring-lime-300': props.category === 'fragrances',
	'bg-purple-100 text-purple-700 ring-purple-300':
		props.category === 'furniture',
	'bg-green-100 text-green-700 ring-green-300': props.category === 'groceries',
	'bg-blue-100 text-blue-700 ring-blue-300':
		props.category === 'home-decoration',
	'bg-yellow-100 text-yellow-700 ring-yellow-300':
		props.category === 'kitchen-accessories',
	'bg-gray-100 text-gray-700 ring-gray-300': props.category === 'laptops',
	'bg-stone-100 text-stone-700 ring-stone-300':
		props.category === 'mens-shirts',
	'bg-gray-300 text-white ring-black': props.category === 'mens-shoes',
	'bg-amber-100 text-amber-700 ring-amber-300':
		props.category === 'mens-watches',
	'bg-neutral-100 text-neutral-700 ring-neutral-300':
		props.category === 'mobile-accessories',
	'bg-rose-100 text-rose-700 ring-rose-300': props.category === 'motorcycle',
	'bg-indigo-100 text-indigo-700 ring-indigo-300':
		props.category === 'skin-care',
	'bg-fuchsia-100 text-fuchsia-700 ring-fuchsia-300':
		props.category === 'smartphones',
	'bg-violet-100 text-violet-700 ring-violet-300':
		props.category === 'sports-accessories',
	'bg-teal-100 text-teal-700 ring-teal-300': props.category === 'sunglasses',
	'bg-slate-100 text-slate-700 ring-slate-300': props.category === 'tablets',
	'bg-zinc-100 text-zinc-700 ring-zinc-300': props.category === 'tops',
	'bg-white text-gray-700 ring-gray-300': props.category === 'vehicle',
	'bg-emerald-100 text-emerald-700 ring-emerald-300':
		props.category === 'womens-bags',
	'bg-pink-100 text-pink-700 ring-pink-300':
		props.category === 'womens-dresses',
	'bg-cyan-100 text-cyan-700 ring-cyan-300':
		props.category === 'womens-jewellery',
	'bg-orange-100 text-orange-700 ring-orange-300':
		props.category === 'womens-shoes',
	'bg-sky-100 text-sky-700 ring-sky-300': props.category === 'womens-watches',
}
</script>

<template>
  <span
      class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
      :class="colors"
  >
    <slot/>
  </span>
</template>