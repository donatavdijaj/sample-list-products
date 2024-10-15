import type { Product } from './types'

export function filterProducts(products: Product[], maxPrice: number) {
	return products.filter((product: Product) => maxPrice >= product.price)
}
