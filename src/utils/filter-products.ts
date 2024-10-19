import type { Product } from './types.ts'

export function filterProducts(products: Product[], maxPrice: number) {
    return products.filter((product: Product) => maxPrice >= product.price)
}
