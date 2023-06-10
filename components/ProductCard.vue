<template>
  <div class="card flex flex-col items-center">
    <img
      :src="`/images/${Number(image)}.jpg`"
      alt=""
      class="h-40 w-40 rounded-lg"
    />
    <h1 class="text-lg">{{ name }}</h1>
    <p class="text-md">{{ price }} $</p>
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded-sm mt-2"
      @click="addToCart()"
    >
      Add to Cart
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCartStore } from '~/store/cart'

export default defineComponent({
  name: 'ProductCard',
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const cart = useCartStore()

    function addToCart() {
      cart.addItem(props.id, props.name, props.price, props.image)
    }

    return { addToCart }
  },
})
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem;
  border-radius: 10%;
}

img {
  margin-bottom: 1rem;
}

h1 {
  margin-bottom: 0.5rem;
}

p {
  margin-bottom: 0.5rem;
}
</style>
