<template>
  <nav class="sticky top-0 bg-blue-500 px-4 py-2 shadow-md z-10">
    <div class="mx-auto flex justify-between items-center">
      <a class="text-white text-xl font-bold" href="/">Ehsan Mall</a>
      <div class="flex md:flex space-x-4 items-center">
        <div class="relative">
          <button class="text-white" @click="toggleCartDropdown">
            <i
              class="fas fa-shopping-cart text-white hover:text-black cursor-pointer mr-4"
            ></i>
            <span class="text-white text-sm">{{ cartItemCount }}</span>
          </button>
          <div
            v-if="showCartDropdown"
            class="absolute right-0 mt-2 w-64 bg-white shadow-md rounded border border-gray-200 z-10 scroll"
          >
            <div
              v-for="(item, index) in cartItems"
              :key="index"
              class="p-2 flex items-center"
            >
              <img
                :src="`/images/${Number(item.image)}.jpg`"
                alt=""
                class="h-16 w-16 rounded-lg"
              />
              <div class="ml-2 flex flex-col">
                <h1 class="text-sm">{{ item.name }}</h1>
                <p class="text-sm">{{ item.price }} $</p>
                <button
                  class="bg-blue-500 text-white px-1 py-1 rounded-sm mt-1"
                  @click="removeItem(item.id)"
                >
                  Remove
                </button>
                <button
                  class="bg-blue-500 text-white px-1 py-1 rounded-sm mt-1"
                  @click="updateItem(item.quantity++)"
                >
                  Increase
                </button>
                <button
                  class="bg-blue-500 text-white px-4 py-2 rounded-sm mt-2"
                  @click="updateItem(item.quantity--)"
                >
                  Decrease
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import Vue from 'vue'
import { useCartStore } from '~/store/cart'

export default Vue.extend({
  name: 'NavBar',
  data() {
    return {
      showCartDropdown: false,
    }
  },
  computed: {
    cartItems(): any[] {
      const cartStore = useCartStore()
      return cartStore.items
    },
    cartItemCount(): number {
      const cartStore = useCartStore()
      return cartStore.items.length
    },
  },
  methods: {
    toggleCartDropdown() {
      this.showCartDropdown = !this.showCartDropdown
    },
    addToCart(item: any) {
      const cartStore = useCartStore()
      cartStore.addItem(item.id, item.name, item.price, item.image)
    },
    removeItem(item: any) {
      const cartStore = useCartStore()
      cartStore.removeItem(item.id)
    },
    updateItem(item: any) {
      const cartStore = useCartStore()
      cartStore.updateItem(item.id, item.quantity)
    },
  },
})
</script>
