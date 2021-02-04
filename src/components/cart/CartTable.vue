<template>
  <table class="table" v-if="items.length">
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
</template>

<script>
import { useCart } from '@/use/cart'
import { currency } from '@/utils/currency-format'

export default {
  name: 'CartTable',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup() {
    const {
      inc,
      dec
    } = useCart()

    return {
      inc,
      dec,
      currency
    }
  }
}
</script>

<style scoped>

</style>
