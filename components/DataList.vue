<template>
  <div>
    <div class="flex flex-col md:grid md:grid-cols-3 md:gap-4">
      <ProductCard
        v-for="product in paginatedProducts"
        :id="product.id"
        :key="product.id"
        :name="product.attributes.name"
        :price="product.attributes.price"
        :image="Number(product.id)"
      />
    </div>
    <b-pagination
      v-model="page"
      :total-rows="products.length"
      :per-page="pageSize"
      @change="handlePageChange"
    ></b-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import axios from 'axios'
import { BPagination } from 'bootstrap-vue'

interface Product {
  id: string
  attributes: {
    name: string
    price: number
  }
  image: number
}

@Component({
  components: {
    BPagination,
  },
})
export default class ProductList extends Vue {
  products: Product[] = []
  page: number = 1
  pageSize: number = 6

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
}
</script>
