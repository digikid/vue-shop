<template>
  <div
      class="product-controls"
      @click.stop
  >
    <AppButton
        type="danger"
        text="-"
        @action="dec(product)"
        :disabled="!productCount(product)"
    />
    <strong>
      {{ productCount(product) }}
    </strong>
    <AppButton
        type="primary"
        text="+"
        @action="inc(product)"
        :disabled="productCount(product) >= product.count"
    />
  </div>
</template>

<script>
import { useCart } from '@/use/cart'

import AppButton from '@/components/ui/AppButton'

export default {
  name: 'ProductControls',
  components: {AppButton},
  props: {
    product: Object
  },
  setup() {
    const {
      productCount,
      inc,
      dec
    } = useCart()

    return {
      productCount,
      inc,
      dec
    }
  }
}
</script>

<style scoped>

</style>
