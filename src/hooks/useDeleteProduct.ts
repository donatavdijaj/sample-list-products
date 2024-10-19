import { useMutation, useQueryClient } from '@tanstack/vue-query'

/**
 * https://dummyjson.com/docs/products#products-delete
 * Just simulating real deletion, local storage is used to persist across reloads
 */
export function useDeleteProduct() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ id }: { id: number }) => {
            const res = await fetch(`https://dummyjson.com/products/${id}`, {
                method: 'DELETE',
            })
            const data = await res.json()
            localStorage.setItem(`products-${data.id}-deleted`, 'true')
            await queryClient.invalidateQueries({ queryKey: ['products'] })
        },
    })
}
