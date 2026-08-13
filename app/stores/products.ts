import { defineStore } from 'pinia';

interface Product {
    id: number,
    title: string
    price: number
    image: string
    description?: string
    category?: string
    rating?: {
        rate: number
        count: number
    }
};

export const useProductStore = defineStore('products', {
    state: () => ({
        products: [] as Product[],
        loading: false,
        error: null as string | null
    }),

    getters: {
        productCount: (state) => state.products.length,
        getProductBySlug: (state) => {
            return (slug: string) => state.products.find(product => slugify(product.title) === slug)
        },
    },
    actions: {
        async fetchProducts() {
            this.loading = true,
            this.error = null
            try {
                this.products = await $fetch<Product[]>(
                    'https://fakestoreapi.com/products'
                )
            } catch (error) {
                this.error = 'Failed to load products'
            } finally {
                this.loading = false
            }
        }
    }
});