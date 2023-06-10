import useCartStore from './cart'

export interface RootState {
  cart: typeof useCartStore
}
