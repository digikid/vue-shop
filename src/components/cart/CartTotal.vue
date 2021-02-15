<template>
  <p class="text-right"><strong>Всего: {{ currency(total) }}</strong></p>
</template>

<script>
import { currency } from '@/utils/format/currency'

export default {
  name: 'CartTotal',
  props: {
    total: {
      type: Number,
      required: true
    }
  },
  setup() {
    return {
      currency
    }
  }
}
</script>

<style scoped>

</style>
