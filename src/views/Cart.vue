<template>
  <AppPage title="Корзина товаров" back>
    <div class="cart">
      <h3 class="text-center" v-if="!items.length">В корзине пока ничего нет</h3>
      <CartTable v-else :items="items" />
      <div
          v-if="total"
          class="cart-total"
      >
        <hr>
        <p class="text-right"><strong>Всего: {{ currency(total) }}</strong></p>
      </div>
      <p
          v-if="total && isAuthenticated"
          class="text-right"
      >
        <AppButton text="Оплатить" @action="buyHandler" />
      </p>
      <CartAuth v-if="total && !isAuthenticated"/>
    </div>
  </AppPage>
</template>

<script>
import { useCart } from '@/use/cart'
import { useAuth } from '@/use/auth'
import { useOrders } from '@/use/orders'
import { currency } from '@/utils/format/currency'

import CartTable from '@/components/cart/CartTable'
import AppPage from '@/components/ui/AppPage'
import CartAuth from '@/components/cart/CartAuth'
import AppButton from '@/components/ui/AppButton'

export default {
  name: 'Cart',
  components: {AppButton, CartAuth, AppPage, CartTable },
  setup() {
    const {
      items,
      total
    } = useCart()

    const {
      isAuthenticated,
      user
    } = useAuth()

    const { add: addOrder } = useOrders()

    const buyHandler = async () => {
      await addOrder({
        user: user.value,
        items: items.value
      })
    }

    return {
      items,
      total,
      isAuthenticated,
      buyHandler,
      currency
    }
  }
}
</script>

<style scoped>
.cart {
  width: 100%;
}
</style>
