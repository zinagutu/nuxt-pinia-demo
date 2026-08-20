<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useProductStore } from '~/stores/products';
import { useCartStore } from '~/stores/cart';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

const { products, loading, error } = storeToRefs(productStore);
const { cartCount } = storeToRefs(cartStore);

await productStore.fetchProducts();

const product = computed(() =>
  productStore.getProductBySlug(String(route.params.slug))
);

const related = computed(() =>
  products.value
    .filter(item => item.category === product.value?.category && item.id !== product.value?.id)
    .slice(0, 4)
);
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

    <NuxtLink class="back-link" to="/">
      Back to products
    </NuxtLink>

    <p v-if="loading" class="status">
      Loading...
    </p>

    <p v-else-if="error" class="status status-error">
      {{ error }}
    </p>

    <p v-else-if="!product" class="status status-error">
      Product not found
    </p>

    <section v-else class="product-detail">
      <div class="product-hero">
        <img
          :src="product.image"
          :alt="product.title"
        />
      </div>

      <div class="product-info">
        <p class="kicker">{{ product.category }}</p>
        <h1>{{ product.title }}</h1>
        <p class="price">£{{ product.price }}</p>
        <NuxtLink
          v-if="product.rating"
          class="reviews-link"
          :to="`/products/${route.params.slug}/reviews`"
        >
          Rated {{ product.rating.rate }} / 5 · See all {{ product.rating.count }} reviews
        </NuxtLink>
        <p class="product-desc">{{ product.description }}</p>

        <button class="btn" @click="cartStore.addToCart(product)">
          Add to cart
        </button>
      </div>
    </section>

    <section v-if="related.length" class="related">
      <p class="kicker">More from this collection</p>
      <h2>You may also like</h2>
      <div class="product-grid">
        <ProductCard
          v-for="item in related"
          :key="item.id"
          :product="item"
        />
      </div>
    </section>
  </main>
</template>
