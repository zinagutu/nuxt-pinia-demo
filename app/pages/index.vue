<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useProductStore } from '~/stores/products';
import { useCartStore } from '~/stores/cart';

const productStore = useProductStore();
const cartStore = useCartStore();

const {
    products,
    loading,
    error
} = storeToRefs(productStore);

const { cartCount } = storeToRefs(cartStore);

await productStore.fetchProducts();

</script>

<template>
  <main class="page">
    <div class="topbar">
      <NuxtLink to="/" class="brand">
        <div class="brand-mark">Maison <span>Nord</span></div>
        <div class="brand-sub">Objects for everyday living</div>
      </NuxtLink>

      <NuxtLink class="cart-chip" to="/cart">
        Cart
        <strong>{{ cartCount }}</strong>
      </NuxtLink>
    </div>

    <header class="page-header">
      <div>
        <p class="kicker">Catalog</p>
        <h1>Products</h1>
      </div>
      <p class="meta">{{ products.length }} pieces in the collection</p>
    </header>

    <p v-if="loading" class="status">
      Loading...
    </p>

    <p v-else-if="error" class="status status-error">
      {{ error }}
    </p>

    <div v-else class="product-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </main>
</template>
