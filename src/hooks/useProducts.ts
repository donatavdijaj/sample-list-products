import { type UseQueryOptions, useQuery } from '@tanstack/vue-query'
import { filterProducts } from '../utils/filter-products.ts'
import type { Product } from '../utils/types.ts'
import type { Ref } from 'vue'

type SearchProps = {
    q?: string | null
    sort?: string | null
    categories?: string | null
    priceMin?: number | null
    priceMax?: number | null
}

export default function useProducts(options?: Omit<UseQueryOptions, 'queryKey'>, search?: Ref<SearchProps>) {
    return useQuery({
        queryKey: ['products', search],
        queryFn: async () => {
            let sortBy = ''
            let order = ''

            if (search?.value?.sort) [sortBy, order] = search?.value?.sort?.split('-')

            const params = new URLSearchParams({
                q: search?.value?.q || '',
                sortBy,
                order,
            })

            const baseURL = 'https://dummyjson.com/products'

            const url = `${baseURL}/search?limit=300&${params.toString()}`
            console.log(url)
            const res = await fetch(url)
            let data = (await res.json()) as { products: Array<Product> }

            // if (search?.value?.categories && search?.value?.categories.length != 0) {
            //     data.products = data.products.filter(({ category }) => search?.value?.categories?.includes(category))
            // }

            if (search?.value.categories) {
                data.products = data.products.filter(({ category }) => category === search?.value.categories)
            }

            return data.products.filter(({ id }) => !localStorage.getItem(`products-${id}-deleted`)) as Array<Product>
        },
        select: (data) => filterProducts(data, 100) as Array<Product>,
        ...options,
    })
}
