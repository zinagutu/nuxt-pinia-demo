import { defineStore } from 'pinia';
import type { Product } from '@/types/product'
import type { CartItem } from '@/types/cart'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as CartItem[],
    }),

    getters: {
        cartCount: (state) =>
            state.items.reduce((total, item) => total + item.quantity, 0),

        totalPrice: (state) =>
            state.items.reduce(
                (total, item) => total + item.product.price * item.quantity,
                0
            ),

        hasItems: (state) => state.items.length > 0,

    },

    actions: {
        addToCart(product: Product) {
            const existingItem = this.items.find(
                item => item.product.id === product.id
            );

            if (existingItem) {
                existingItem.quantity++
            } else {
                this.items.push({ product, quantity: 1 })
            }
        },

        removeFromCart(product: Product) {
            const existingItem = this.items.find(
                item => item.product.id === product.id
            );

            if (existingItem) {
                existingItem.quantity--
            }

            if (existingItem?.quantity === 0) {
                this.items = this.items.filter(
                    item => item.product.id !== product.id
                )
            }
        },

        clearCart() {
            this.items = []
        }
    },
    persist: true
})