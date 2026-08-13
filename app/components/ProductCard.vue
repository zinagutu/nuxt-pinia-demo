<script setup lang="ts">
interface Product {
  id: number
  title: string
  price: number
  image: string
}

defineProps<{
  product: Product
}>()

const cartStore = useCartStore()
</script>

<template>
  <article class="product-card">
    <NuxtLink :to="`/products/${slugify(product.title)}`" class="product-card-link">
      <img
        :src="product.image"
        :alt="product.title"
        width="150"
      />

      <h2>{{ product.title }}</h2>
    </NuxtLink>

    <p class="price">£{{ product.price }}</p>

    <button class="btn" @click="cartStore.addToCart(product)">
      Add to cart
    </button>
  </article>
</template>
