import { defineStore } from 'pinia'

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    totalItems(state) {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
  },
  actions: {
    addItem(productId: number, name: string, price: number, image: string) {
      const item = this.items.find((item) => item.id === productId)

      if (item) {
        item.quantity++
      } else {
        this.items.push({ id: productId, name, price, image, quantity: 1 })
      }
    },
    removeItem(productId: number) {
      this.items = this.items.filter((item) => item.id !== productId)
    },
    updateItem(productId: number, quantity: number) {
      const item = this.items.find((item) => item.id === productId)

      if (item && quantity > 0) {
        item.quantity = quantity
      } else {
        this.removeItem(productId)
      }
    },
  },
})
export default useCartStore
