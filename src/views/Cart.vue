<template>
  <AppLoader v-if="isLoading" />
  <div class="card" v-else>
    <h1>Корзина</h1>

    <h3 class="text-center" v-if="!items.length">В корзине пока ничего нет</h3>
    <table class="table" v-else>
      <thead>
      <tr>
        <th>Наименование</th>
        <th>Количество</th>
        <th>Цена (шт)</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.title }}</td>
        <td>
          <button class="btn danger" @click="dec(item)">-</button>
          {{ item.count }} шт.
          <button class="btn primary" @click="inc(item)">+</button>
        </td>
        <td>{{ currency(item.price) }}</td>
      </tr>
      </tbody>
    </table>
    <hr>
    <p class="text-right"><strong>Всего: {{ currency(total) }}</strong></p>
    <p class="text-right">
      <button class="btn">Оплатить</button>
    </p>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { currency } from '@/utils/currency-format'
import AppLoader from '@/components/ui/AppLoader'

export default {
  name: 'Cart',
  components: { AppLoader },
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
