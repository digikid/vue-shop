<template>
  <AppPage title="Товары">
    <template #header>
      <AppButton type="primary" text="Добавить" @action="modalIsOpen = true" />
    </template>
    <AdminProductsList />
    <AppModal title="Добавить товар" @close="modalIsOpen = false" v-if="modalIsOpen">
      <ProductEdit @action="modalIsOpen = false" />
    </AppModal>
  </AppPage>
</template>

<script>
import { ref } from 'vue'
import AppPage from '@/components/ui/AppPage'
import AppButton from '@/components/ui/AppButton'
import AdminProductsList from '@/components/admin/products/AdminProductsList'
import AppModal from '@/components/ui/AppModal'
import ProductEdit from '@/components/product/ProductEdit'

export default {
  name: 'AdminProducts',
  components: { ProductEdit, AppModal, AdminProductsList, AppButton, AppPage },
  setup() {
    const modalIsOpen = ref()

    return {
      modalIsOpen
    }
  }
}
</script>

<style scoped>

</style>
