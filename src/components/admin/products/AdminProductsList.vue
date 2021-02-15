<template>
  <table class="table" v-if="products.length">
    <thead>
      <tr>
        <th>#</th>
        <th>Название</th>
        <th>Изображение</th>
        <th>Цена</th>
        <th>Категория</th>
        <th>Количество</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr
          v-for="(product, i) in pages[current]"
          :key="product.id"
      >
        <td>{{ index(i) }}</td>
        <td>{{ product.title }}</td>
        <td>
          <img :src="product.img" :alt="product.title">
        </td>
        <td>{{ price(product) }}</td>
        <td>{{ category(product) }}</td>
        <td>{{ product.count }}</td>
        <td>
          <AppButton text="Посмотреть" @action="open(product)" />
          <AppButton type="primary" text="Изменить" @action="edit(product)" />
          <AppButton type="danger" text="Удалить" @action="remove(product)" />
        </td>
      </tr>
    </tbody>
  </table>
  <p v-else>Ничего не найдено.</p>
  <AppPagination
      :items="pages"
      :current="current"
      @to="to"
      @next="next"
      @prev="prev"
  />
</template>

<script>
import { computed } from 'vue'
import { useProducts } from '@/use/products'
import { usePagination } from '@/use/pagination'

import AppButton from '@/components/ui/AppButton'
import AppPagination from '@/components/ui/AppPagination'

export default {
  name: 'AdminProductsList',
  components: { AppPagination, AppButton },
  props: {
    items: Array
  },
  setup(props) {
    const {
      category,
      price,
      open,
      edit,
      remove
    } = useProducts()

    const products = computed(() => props.items)

    return {
      products,
      category,
      price,
      open,
      edit,
      remove,
      ...usePagination(products)
    }
  }
}
</script>

<style scoped>
.table img {
  width: 50px;
}

.table td:last-child {
  width: 100px;
}

.table .btn {
  width: 150px;
  margin: 5px 0;
}
</style>
