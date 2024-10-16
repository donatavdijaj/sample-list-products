import { type UseQueryOptions, useQuery } from '@tanstack/vue-query'
import { filterProducts } from '../utils/filter-products.ts'
import type { Product } from '../utils/types.ts'

export default function useProducts(
	options?: Omit<UseQueryOptions, 'queryKey'>,
) {
	return useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const res = await fetch('https://dummyjson.com/products?limit=100')
			const data = (await res.json()) as { products: Array<Product> }
			return data.products.filter(
				({ id }) => !localStorage.getItem(`products-${id}-deleted`),
			) as Array<Product>
		},
		select: (data) => filterProducts(data, 100) as Array<Product>,
		...options,
	})
}
