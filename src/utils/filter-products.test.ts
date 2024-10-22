import { describe, expect, it } from 'vitest'
import { filterProducts } from './filter-products.ts'
import type { Product } from './types.ts'

describe('filterProducts', () => {
    it('returns only products below the specified max price', () => {
        const products: Partial<Product>[] = [
            { id: 1, title: 'Product 1', price: 50 },
            { id: 2, title: 'Product 2', price: 150 },
            { id: 3, title: 'Product 3', price: 75 },
        ]
        const result = filterProducts(products as Product[], 100)
        expect(result).toEqual([
            { id: 1, title: 'Product 1', price: 50 },
            { id: 3, title: 'Product 3', price: 75 },
        ])
    })

    it('returns an empty array when no products are below the specified max price', () => {
        const products: Partial<Product>[] = [
            { id: 1, title: 'Product 1', price: 150 },
            { id: 2, title: 'Product 2', price: 200 },
        ]
        const result = filterProducts(products as Product[], 100)
        expect(result).toEqual([])
    })

    it('returns all products if all are below the specified max price', () => {
        const products: Partial<Product>[] = [
            { id: 1, title: 'Product 1', price: 50 },
            { id: 2, title: 'Product 2', price: 75 },
        ]
        const result = filterProducts(products as Product[], 100)
        expect(result).toEqual(products)
    })

    it('handles an empty product list', () => {
        const products: Partial<Product>[] = []
        const result = filterProducts(products as Product[], 100)
        expect(result).toEqual([])
    })

    it('handles products with price equal to max price', () => {
        const products: Partial<Product>[] = [
            { id: 1, title: 'Product 1', price: 100 },
            { id: 2, title: 'Product 2', price: 50 },
        ]
        const result = filterProducts(products as Product[], 100)
        expect(result).toEqual(products)
    })

    it('returns all free products if max price is 0', () => {
        const products: Partial<Product>[] = [
            { id: 1, title: 'Product 1', price: 100 },
            { id: 2, title: 'Product 2', price: 0 },
            { id: 3, title: 'Product 3', price: 0 },
            { id: 4, title: 'Product 4', price: 12 },
        ]
        const result = filterProducts(products as Product[], 0)
        expect(result).toEqual([products[1], products[2]])
    })

    it('handles products with very large price values', () => {
        const products: Partial<Product>[] = [
            { id: 1, title: 'Product 1', price: 1e10 },
            { id: 2, title: 'Product 2', price: 5e11 },
            { id: 3, title: 'Product 3', price: 1e12 },
        ]
        const result = filterProducts(products as Product[], 5e11)
        expect(result).toEqual([
            { id: 1, title: 'Product 1', price: 1e10 },
            { id: 2, title: 'Product 2', price: 5e11 },
        ])
    })

    it('handles products with floating-point prices accurately', () => {
        const products: Partial<Product>[] = [
            { id: 1, title: 'Product 1', price: 99.99 },
            { id: 2, title: 'Product 2', price: 100.0 },
            { id: 3, title: 'Product 3', price: 100.01 },
        ]
        const result = filterProducts(products as Product[], 100.0)
        expect(result).toEqual([
            { id: 1, title: 'Product 1', price: 99.99 },
            { id: 2, title: 'Product 2', price: 100.0 },
        ])
    })
})
