<script setup lang="ts">
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();

const {
    items,
    cartCount,
    totalPrice
} = storeToRefs(cartStore);

</script>

<template>
  <main class="page">
    <div class="topbar">
      <NuxtLink to="/" class="brand">
        <div class="brand-mark">Maison <span>Nord</span></div>
        <div class="brand-sub">Objects for everyday living</div>
      </NuxtLink>

      <NuxtLink class="back-link" to="/">
        Back to products
      </NuxtLink>
    </div>

    <header class="page-header">
      <div>
        <p class="kicker">Basket</p>
        <h1>Cart</h1>
      </div>
      <p class="meta">{{ cartCount }} items selected</p>
    </header>

    <div class="cart-layout">
      <div class="cart-list">
        <CartItem
          v-for="item in items"
          :key="item.product.id"
          :item="item"
        />
      </div>

      <aside class="summary">
        <p class="kicker">Amount due</p>
        <h2>
          Total: £{{ totalPrice.toFixed(2) }}
        </h2>

        <button class="btn btn-ghost" @click="cartStore.clearCart()">
          Clear cart
        </button>
      </aside>
    </div>
  </main>
</template>
