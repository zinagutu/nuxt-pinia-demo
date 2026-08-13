<script setup lang="ts">
interface Product {
  id: number
  title: string
  price: number
  image: string
}

defineProps<{
  item: Product
}>()

const cartStore = useCartStore()
</script>

<template>
  <div class="cart-item">
    <img
      :src="item.image"
      :alt="item.title"
      width="96"
    />

    <div>
      <h2>{{ item.title }}</h2>
      <p class="price">£{{ item.price }}</p>
    </div>

    <button class="btn btn-remove" @click="cartStore.removeFromCart(item.id)">
      Remove
    </button>
  </div>
</template>
