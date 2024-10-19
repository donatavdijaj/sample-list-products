import { useQuery } from '@tanstack/vue-query'

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('https://dummyjson.com/products/categories')
            return (await res.json()) as Array<{
                slug: string
                name: string
                url: string
            }>
        },
        staleTime: Infinity,
    })
}
