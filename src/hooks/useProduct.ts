import { useQuery } from '@tanstack/vue-query'
import { Product } from '../utils/types.ts'
import { baseURL } from '../utils/constants.ts'

export function useProduct({ id }: { id: string }) {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const res = await fetch(`${baseURL}/${id}`)
            return (await res.json()) as Product
        },
    })
}
