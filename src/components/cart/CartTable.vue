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
        <button class="btn danger" @click="$emit('dec', item)">-</button>
        {{ item.count }} шт.
        <button class="btn primary" @click="$emit('inc', item)">+</button>
      </td>
      <td>{{ currency(item.price) }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { currency } from '@/utils/currency-format'

export default {
  name: 'CartTable',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  emits: ['dec', 'inc'],
  setup() {
    return {
      currency
    }
  }
}
</script>

<style scoped>

</style>
