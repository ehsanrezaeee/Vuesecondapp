<template>
  <div class="container">
    <div class="row justify-content-center align-items-center gap-4">
      <div
        v-for="(product, index) in paginatedProducts"
        :key="'product-' + index"
        class="col-md-4 gap-2"
      >
        <div class="card flex flex-col items-center">
          <img
            :src="`/images/${Number(product.id)}.jpg`"
            alt=""
            class="h-40 w-40 rounded-lg mt-2"
          />
          <h1 class="text-lg">{{ product.attributes.name }}</h1>
          <p class="text-md">{{ product.attributes.price }} $</p>
          <button
            class="bg-blue-500 text-white px-2 py-1 rounded-sm mt-2 mb-2 hover:bg-blue-200 active:bg-green-300"
            @click="addToCart(product)"
          >
            افزودن به سبد
          </button>
        </div>
      </div>
      <b-pagination
        v-model="page"
        :total-rows="products.length"
        :per-page="pageSize"
        @change="handlePageChange"
      ></b-pagination>
    </div>
    <TheShoppingCart :modelValue="shoppingCart" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import axios from 'axios'
import { BPagination } from 'bootstrap-vue'
import TheShoppingCart from './TheShoppingCart.vue'

interface Product {
  id: string
  attributes: {
    name: string
    price: number
  }
  image: number
  amount: number
}

@Component({
  components: {
    BPagination,
    TheShoppingCart,
  },
})
export default class ProductList extends Vue {
  products: Product[] = []
  page: number = 1
  pageSize: number = 6
  shoppingCart: Product[] = []
  product: Product = {
    id: '',
    attributes: {
      name: '',
      price: 0,
    },
    image: 0,
    amount: 0,
  }

  get paginatedProducts() {
    const startIndex = (this.page - 1) * this.pageSize
    const endIndex = startIndex + this.pageSize
    return this.products.slice(startIndex, endIndex)
  }

  async fetchData() {
    const response = await axios.get('/api/products')
    this.products = response.data.data
  }

  handlePageChange(value: number) {
    this.page = value
    // No need to fetch data here, as the paginatedProducts computed property will update the displayed products
  }

  async created() {
    if (this.products.length === 0) {
      await this.fetchData()
    }
  }

  mounted() {
    this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]')
  }

  addToCart(product: Product) {
    let exist = false
    for (const cartI of this.shoppingCart) {
      if (cartI.id === product.id) {
        cartI.amount = cartI.amount + 1
        exist = true
        break
      }
    }
    if (!exist) {
      this.shoppingCart.push({
        ...product,
        amount: 1,
      })
    }
  }

  @Watch('shoppingCart', { deep: true })
  handler(newVal: Product[]) {
    localStorage.setItem('shoppingCart', JSON.stringify(newVal))
  }
}
</script>
