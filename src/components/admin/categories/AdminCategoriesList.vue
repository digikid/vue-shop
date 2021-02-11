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
        v-for="(category, i) in pages[current]"
        :key="category.id"
    >
      <td>{{ index(i) }}</td>
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
        />
        <AppButton
            type="danger"
            text="Удалить"
            @action="remove(category)"
            v-if="!productsTotal(category)"
        />
      </td>
    </tr>
    </tbody>
  </table>
  <AppPagination
      :items="pages"
      :current="current"
      @to="to"
      @next="next"
      @prev="prev"
  />
</template>

<script>
import { useCategories } from '@/use/categories'
import { usePagination } from '@/use/pagination'

import AppButton from '@/components/ui/AppButton'
import AppPagination from '@/components/ui/AppPagination'

export default {
  name: 'AdminCategoriesList',
  components: { AppPagination, AppButton },
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
      remove,
      ...usePagination(categories)
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
