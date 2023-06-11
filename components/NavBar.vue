<template>
  <nav class="sticky top-0 bg-gray-500 px-4 py-2 shadow-md z-10 mb-2">
    <div class="mx-auto flex justify-between items-center">
      <a class="text-white text-xl font-bold" href="/">Ehsan Mall</a>
      <div class="flex md:flex space-x-4 items-center">
        <button
          class="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          <font-awesome-icon :icon="['fas', 'cart-shopping']" />
          سبد خرید
        </button>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'NavBar',
})
</script>
