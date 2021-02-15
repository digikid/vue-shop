<template>
  <AppPage title="Редактирование категории" back>
    <AdminCategoriesEdit />
  </AppPage>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import AdminCategoriesEdit from '@/components/admin/categories/AdminCategoriesEdit'

export default {
  name: 'AdminCategory',
  components: { AdminCategoriesEdit, AppPage }
}
</script>

<style scoped>

</style>
