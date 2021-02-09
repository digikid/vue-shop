<template>
  <AppPage title="Корзина товаров" back>
    <div class="cart">
      <h3 class="text-center" v-if="!items.length">В корзине пока ничего нет</h3>
      <CartTable v-else :items="items" />
      <hr>
      <CartTotal :total="total" />
      <CartActions/>
    </div>
  </AppPage>
</template>

<script>
import { useCart } from '@/use/cart'

import CartTable from '@/components/cart/CartTable'
import CartTotal from '@/components/cart/CartTotal'
import CartActions from '@/components/cart/CartActions'
import AppPage from '@/components/ui/AppPage'

export default {
  name: 'Cart',
  components: {AppPage, CartActions, CartTotal, CartTable },
  setup() {
    const {
      items,
      total
    } = useCart()

    return {
      items,
      total
    }
  }
}
</script>

<style scoped>
.cart {
  width: 100%;
}
</style>
