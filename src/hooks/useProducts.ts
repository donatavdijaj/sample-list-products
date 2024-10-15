import { type UseQueryOptions, useQuery } from '@tanstack/vue-query'
import { filterProducts } from '../utils/filter-products.ts'

export default function useProducts(options: UseQueryOptions) {
	return useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const res = await fetch('https://dummyjson.com/products?limit=100')
			const data = await res.json()
			return data.products
		},
		select: (data) => filterProducts(data, 100),
		...options,
	})
}
