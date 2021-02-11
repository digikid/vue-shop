<template>
  <div
      v-if="products.length"
      class="products-table"
  >
    <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
    />
  </div>
  <p
      class="empty"
      v-else
  >
    Каталог продуктов пуст.
  </p>
</template>

<script>
import ProductCard from '@/components/product/ProductCard'

export default {
  name: 'ProductsList',
  components: { ProductCard },
  props: {
    products: Array,
    default: []
  }
}
</script>

<style scoped>
.products-table {
  width: 750px;
}

.empty {
  width: 750px;
  text-align: center;
  padding: 1rem;
  margin: 0;
}
</style>
