<template>
  <AppPage
      v-if="product"
      back
      center
      :title="product.title"
  >
    <ProductsDetail :product="product" />
  </AppPage>
  <h3
      class="text-center text-white"
      v-else
  >
    Товар не найден.
  </h3>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '@/use/products'
import { useCategories } from '@/use/categories'

import AppPage from '@/components/ui/AppPage'
import ProductsDetail from '@/components/product/ProductDetail'

export default {
  name: 'Product',
  components: {ProductsDetail, AppPage },
  setup() {
    const route = useRoute()
    const { items: products } = useProducts()
    const { items: categories } = useCategories()

    const { id } = route.params

    const product = computed(() => products.value.find(product => product.id === id))
    const category = computed(() => categories.value.find(category => category.type === product.value.category).title)

    return {
      product,
      category
    }
  }
}
</script>

<style scoped>

</style>
