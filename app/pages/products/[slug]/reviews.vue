<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useProductStore } from '~/stores/products';
import { useCartStore } from '~/stores/cart';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

const { loading, error } = storeToRefs(productStore);
const { cartCount } = storeToRefs(cartStore);

await productStore.fetchProducts();

const product = computed(() =>
  productStore.getProductBySlug(String(route.params.slug))
);

const reviews = computed(() =>
  product.value ? buildReviews(product.value) : []
);

const pageSize = 5
const visibleCount = ref(pageSize)

const visibleReviews = computed(() =>
  reviews.value.slice(0, visibleCount.value)
)

const hasMore = computed(() =>
  visibleCount.value < reviews.value.length
)

function loadMore() {
  visibleCount.value = Math.min(
    visibleCount.value + pageSize,
    reviews.value.length
  )
}
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

    <NuxtLink class="back-link" :to="`/products/${route.params.slug}`">
      Back to product
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

    <template v-else>
      <header class="page-header">
        <div>
          <p class="kicker">{{ product.category }}</p>
          <h1>Reviews</h1>
        </div>
        <p v-if="product.rating" class="meta">
          {{ product.title }} · {{ product.rating.rate }} / 5 · {{ reviews.length }} reviews
        </p>
      </header>

      <div v-if="reviews.length" class="review-list">
        <article
          v-for="review in visibleReviews"
          :key="review.id"
          class="review-card"
        >
          <div class="review-top">
            <strong>{{ review.author }}</strong>
            <span class="review-stars">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</span>
          </div>
          <p class="review-body">{{ review.body }}</p>
          <p class="review-date">{{ review.date }}</p>
        </article>

        <button
          v-if="hasMore"
          class="btn load-more"
          type="button"
          @click="loadMore"
        >
          View more
        </button>
      </div>

      <p v-else class="status">
        No reviews yet.
      </p>
    </template>
  </main>
</template>
