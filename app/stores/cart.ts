import { defineStore } from 'pinia';

interface Product {
    id: number
    title: string
    price: number
    image: string
};

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as Product[],
    }),

    getters: {
        cartCount: (state) => state.items.length,

        totalPrice: (state) =>
            state.items.reduce(
                (total, item) => total + item.price,
                0
        ),

        hasItems: (state) => state.items.length > 0,
    },

    actions: {
        addToCart(product: Product) {
            this.items.push(product)
        },

        removeFromCart(productId: number) {
            this.items = this.items.filter(
                item => item.id !== productId
            )
        }, 

        clearCart() {
            this.items = []
        }
    },
    persist: true
})