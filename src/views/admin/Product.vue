<template>
  <AppPage title="Редактирование товара" back>
    <ProductEdit />
  </AppPage>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import ProductEdit from '@/components/product/ProductEdit'

export default {
  name: 'AdminProduct',
  components: { ProductEdit, AppPage }
}
</script>

<style scoped>

</style>
