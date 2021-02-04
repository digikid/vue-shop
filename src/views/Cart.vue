<template>
  <AppLoader v-if="isLoading" />
  <div class="card" v-else>
    <h1>Корзина</h1>
    <h3 class="text-center" v-if="!items.length">В корзине пока ничего нет</h3>
    <CartTable v-else :items="items" />
    <hr>
    <CartTotal :total="total" />
    <CartActions/>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useCart } from '@/use/cart'

import AppLoader from '@/components/ui/AppLoader'
import CartTable from '@/components/cart/CartTable'
import CartTotal from '@/components/cart/CartTotal'
import CartActions from '@/components/cart/CartActions'

export default {
  name: 'Cart',
  components: {CartActions, CartTotal, CartTable, AppLoader },
  setup() {

    const {
      isLoading,
      items,
      total,
      load
    } = useCart()

    onMounted(load)

    return {
      isLoading,
      items,
      total
    }
  }
}
</script>

<style scoped>

</style>
