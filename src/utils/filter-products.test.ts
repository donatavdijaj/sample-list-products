import { describe, expect, it } from 'vitest'
import { filterProducts } from './filter-products.ts'
import type { Product } from './types.ts'

describe('filterProducts', () => {
	it('returns only products below the specified max price', () => {
		const products: Product[] = [
			{ id: 1, name: 'Product 1', price: 50 },
			{ id: 2, name: 'Product 2', price: 150 },
			{ id: 3, name: 'Product 3', price: 75 },
		]
		const result = filterProducts(products, 100)
		expect(result).toEqual([
			{ id: 1, name: 'Product 1', price: 50 },
			{ id: 3, name: 'Product 3', price: 75 },
		])
	})

	it('returns an empty array when no products are below the specified max price', () => {
		const products: Product[] = [
			{ id: 1, name: 'Product 1', price: 150 },
			{ id: 2, name: 'Product 2', price: 200 },
		]
		const result = filterProducts(products, 100)
		expect(result).toEqual([])
	})

	it('returns all products if all are below the specified max price', () => {
		const products: Product[] = [
			{ id: 1, name: 'Product 1', price: 50 },
			{ id: 2, name: 'Product 2', price: 75 },
		]
		const result = filterProducts(products, 100)
		expect(result).toEqual(products)
	})

	it('handles an empty product list', () => {
		const products: Product[] = []
		const result = filterProducts(products, 100)
		expect(result).toEqual([])
	})

	it('handles products with price equal to max price', () => {
		const products: Product[] = [
			{ id: 1, name: 'Product 1', price: 100 },
			{ id: 2, name: 'Product 2', price: 50 },
		]
		const result = filterProducts(products, 100)
		expect(result).toEqual(products)
	})
})
