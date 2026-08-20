<script setup lang="ts">
import type { CartItem } from '@/types/cart'

defineProps<{
  item: CartItem
}>()

const cartStore = useCartStore()
</script>

<template>
  <div class="cart-item">
    <img :src="item.product.image" :alt="item.product.title" width="96" />

    <div class="cart-item-info">
      <h2>{{ item.product.title }}</h2>
      <div class="cart-item-meta">
        <p class="price">£{{ item.product.price }}</p>
        <div class="quantity-control">
          <button
            class="btn-qty"
            type="button"
            :disabled="item.quantity <= 1"
            aria-label="Decrease quantity"
            @click="cartStore.removeFromCart(item.product)"
          >
            −
          </button>
          <span class="quantity">{{ item.quantity }}</span>
          <button
            class="btn-qty"
            type="button"
            aria-label="Increase quantity"
            @click="cartStore.addToCart(item.product)"
          >
            +
          </button>
        </div>
      </div>
    </div>

    <button class="btn btn-remove" @click="cartStore.removeFromCart(item.product)">
      Remove
    </button>
  </div>
</template>
