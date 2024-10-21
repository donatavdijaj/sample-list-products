import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import type { Product } from '../utils/types.ts'
import { type Ref } from 'vue'

type Props = {
    skip: Ref<number>
    limit: Ref<number>
    q?: Ref<string>
    sort?: Ref<string>
    category?: Ref<string>
    maxPrice?: Ref<number | null>
}

type ApiResponse = {
    products: Product[]
    total: number
    skip: number
    limit: number
}

const baseURL = 'https://dummyjson.com/products'

export default function useProducts({ skip, limit, q, sort, category, maxPrice }: Props) {
    return useQuery({
        placeholderData: keepPreviousData,
        queryKey: ['products', skip, limit, q, sort, category, maxPrice],
        queryFn: async () => {
            let sortBy = ''
            let order = ''

            if (sort) [sortBy, order] = sort.value.split('-')

            const params = new URLSearchParams({
                limit: limit.value.toString(),
                skip: skip.value.toString(),
                q: q?.value.toString() ?? '',
                sortBy,
                order,
            })

            const url = `${baseURL}/search?${params.toString()}`
            const res = await fetch(url)
            let data = (await res.json()) as ApiResponse

            if (category?.value) {
                data.products = data.products.filter((item) => item.category === category.value)
            }

            data.products = data.products.filter(({ id }) => !localStorage.getItem(`products-${id}-deleted`))

            if (maxPrice?.value) {
                data.products = data.products.filter((item) => item.price < (maxPrice.value || 0))
            }

            return data
        },
    })
}
