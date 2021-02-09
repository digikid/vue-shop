<template>
  <table class="table">
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
          v-for="(product, i) in products"
          :key="product.id"
      >
        <td>{{ i + 1 }}</td>
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
</template>

<script>
import { useProducts } from '@/use/products'

import AppButton from '@/components/ui/AppButton'

export default {
  name: 'AdminProductsList',
  components: { AppButton },
  setup() {
    const {
      items: products,
      category,
      price,
      open,
      edit,
      remove
    } = useProducts()

    return {
      products,
      category,
      price,
      open,
      edit,
      remove
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
