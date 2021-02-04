<template>
  <AppLoader v-if="isLoading" />
  <div class="card" v-else>
    <h1>Корзина</h1>
    <h3 class="text-center" v-if="!items.length">В корзине пока ничего нет</h3>
    <CartTable v-else :items="items" @inc="inc" @dec="dec"></CartTable>
    <hr>
    <CartTotal :total="total" />
    <CartActions/>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { currency } from '@/utils/currency-format'

import AppLoader from '@/components/ui/AppLoader'
import CartTable from '@/components/cart/CartTable'
import CartTotal from '@/components/cart/CartTotal'
import CartActions from '@/components/cart/CartActions'

export default {
  name: 'Cart',
  components: {CartActions, CartTotal, CartTable, AppLoader },
  setup() {
    const store = useStore()
    const items = computed(() => store.getters['card/all'])

    const total = computed(() => items.value.reduce((accumulator, current) => accumulator + current.price * current.count, 0))

    const isLoading = computed(() => !store.getters['card/isLoaded'])

    const inc = item => {
      store.dispatch('card/update', {
        ...item,
        count: item.count + 1
      })
    }

    const dec = item => {
      if (item.count > 1) {
        store.dispatch('card/update', {
          ...item,
          count: item.count - 1
        })
      } else {
        store.dispatch('card/remove', item.id)
      }
    }

    onMounted(() => {
      store.dispatch('card/load')
    })

    return {
      isLoading,
      items,
      currency,
      total,
      inc,
      dec
    }
  }
}
</script>

<style scoped>

</style>
