<template>
  <AppPage title="Редактирование пользователя" back>
    <AdminUsersEdit/>
  </AppPage>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import AdminUsersEdit from '@/components/admin/users/AdminUsersEdit'

export default {
  name: 'User',
  components: { AdminUsersEdit, AppPage }
}
</script>

<style scoped>

</style>
