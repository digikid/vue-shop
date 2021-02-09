<template>
  <AppPage title="Каталог товаров">
    <div class="products">
      <ProductsFilter v-model:filter="filter" />
      <ProductsList :products="products"/>
    </div>
  </AppPage>
</template>

<script>
import { useProducts } from '@/use/products'

import AppPage from '@/components/ui/AppPage'
import ProductsFilter from '@/components/products/ProductsFilter'
import ProductsList from '@/components/products/ProductsList'

export default {
  name: 'Shop',
  components: { ProductsList, ProductsFilter, AppPage },
  setup() {
    const {
      items: products,
      filter
    } = useProducts()

    return {
      products,
      filter
    }
  }
}
</script>

<style scoped>
.products {
  display: flex;
}
</style>
