<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>Название</th>
      <th>Тип</th>
      <th>Кол-во товаров</th>
      <th>Действия</th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="(category, i) in categories"
        :key="category.id"
    >
      <td>{{ i + 1 }}</td>
      <td>{{ category.title }}</td>
      <td>{{ category.type }}</td>
      <td>{{ productsTotal(category) }}</td>
      <td>
        <AppButton
            text="Посмотреть"
            @action="open(category)"
        />
        <AppButton
            type="primary"
            text="Изменить"
            @action="edit(category)"
            :disabled="productsTotal(category)"
        />
        <AppButton
            type="danger"
            text="Удалить"
            @action="remove(category)"
            :disabled="productsTotal(category)"
        />
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { useCategories } from '@/use/categories'

import AppButton from '@/components/ui/AppButton'

export default {
  name: 'AdminCategoriesList',
  components: { AppButton },
  setup() {
    const {
      items: categories,
      productsTotal,
      open,
      edit,
      remove
    } = useCategories()

    return {
      categories,
      productsTotal,
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
