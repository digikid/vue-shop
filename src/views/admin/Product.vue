<template>
  <AppPage title="Редактирование товара" back>
    <AdminProductsEdit />
  </AppPage>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import AdminProductsEdit from '@/components/admin/products/AdminProductsEdit'

export default {
  name: 'AdminProduct',
  components: { AdminProductsEdit, AppPage }
}
</script>

<style scoped>

</style>
