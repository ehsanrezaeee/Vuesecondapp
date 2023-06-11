<template>
  <div>
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasRightLabel">
          $ {{ totalSum }} مبلغ
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div
          v-for="(product, index) in modelValue"
          :key="'cart-product-' + index"
          class="card mb-3"
        >
          <div class="row">
            <div class="col-md-4">
              <img
                :src="`/images/${Number(product.id)}.jpg`"
                alt=""
                class="img-fluid rounded-start"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">
                  {{ product.attributes.name }}
                </h5>
                <p>{{ product.attributes.price }} x $ {{ product.amount }}</p>
                <div class="d-grid">
                  <button
                    class="btn btn-outline-secondary"
                    @click="removeFromCart(product)"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['modelValue'],
  computed: {
    totalSum() {
      let sum = 0
      for (const p of this.modelValue) {
        sum += p.attributes.price * p.amount
      }
      return sum
    },
  },
  methods: {
    removeFromCart(product) {
      const shoppingCart = this.modelValue
      const productIndex = shoppingCart.findIndex(
        (item) => item.id === product.id
      )
      shoppingCart[productIndex].amount -= 1
      if (shoppingCart[productIndex].amount < 1) {
        shoppingCart.splice(productIndex, 1)
      }

      this.$emit('update:modelValue', shoppingCart)
    },
  },
}
</script>
