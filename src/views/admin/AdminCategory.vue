<template>
  <AppPage title="Редактирование категории" back>
    <CategoryEdit />
  </AppPage>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import CategoryEdit from '@/components/category/CategoryEdit'

export default {
  name: 'AdminCategory',
  components: { CategoryEdit, AppPage }
}
</script>

<style scoped>

</style>
