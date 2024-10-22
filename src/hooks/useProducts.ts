import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import type { Product } from '../utils/types.ts'
import { type Ref } from 'vue'
import { baseURL } from '../utils/constants.ts'
import { filterProducts } from '../utils/filter-products.ts'

type Props = {
    skip: Ref<number>
    limit: Ref<number>
    q?: Ref<string>
    sort?: Ref<string>
    category?: Ref<string>
    maxPrice?: Ref<number | undefined>
}

type ApiResponse = {
    products: Product[]
    total: number
    skip: number
    limit: number
}

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

            data.products = data.products.filter((item) => {
                const notDeleted = !localStorage.getItem(`products-${item.id}-deleted`)
                const matchesCategory = category?.value ? item.category === category.value : true
                // const withinMaxPrice = maxPrice?.value ? item.price <= maxPrice.value : true

                return notDeleted && matchesCategory // && withinMaxPrice
            })

            if (maxPrice?.value) data.products = filterProducts(data.products, maxPrice?.value)

            return data
        },
    })
}
