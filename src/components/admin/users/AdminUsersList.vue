<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>Имя</th>
      <th>Email</th>
      <th>Тип</th>
      <th>Действия</th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="(user, i) in pages[current]"
        :key="user.id"
    >
      <td>{{ index(i) }}</td>
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
      <td>{{ roles[user.role] }}</td>
      <td>
        <AppButton
            type="primary"
            text="Изменить"
            @action="edit(user)"
        />
        <AppButton
            type="danger"
            text="Удалить"
            @action="remove(user)"
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
import { useUsers } from '@/use/users'
import { usePagination } from '@/use/pagination'

import AppButton from '@/components/ui/AppButton'
import AppPagination from '@/components/ui/AppPagination'

export default {
  name: 'AdminUsersList',
  components: { AppPagination, AppButton },
  setup() {
    const {
      items: users,
      roles,
      open,
      edit,
      remove
    } = useUsers()

    return {
      users,
      roles,
      open,
      edit,
      remove,
      ...usePagination(users)
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
