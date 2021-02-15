<template>
  <AppPage title="Товары">
    <template #header>
      <AppButton type="primary" text="Добавить" @action="modalIsOpen = true" />
    </template>
    <AdminProductsFilter v-model:filter="filter" />
    <AdminProductsList :items="products" />
  </AppPage>
  <AppModal title="Добавить товар" @close="modalIsOpen = false" v-if="modalIsOpen">
    <AdminProductsEdit @action="modalIsOpen = false" />
  </AppModal>
</template>

<script>
import { ref } from 'vue'
import { useProducts } from '@/use/products'

import AppPage from '@/components/ui/AppPage'
import AppButton from '@/components/ui/AppButton'
import AppModal from '@/components/ui/AppModal'
import AdminProductsFilter from '@/components/admin/products/AdminProductsFilter'
import AdminProductsList from '@/components/admin/products/AdminProductsList'
import AdminProductsEdit from '@/components/admin/products/AdminProductsEdit'

export default {
  name: 'AdminProducts',
  components: { AdminProductsFilter, AdminProductsList, AdminProductsEdit, AppModal, AppButton, AppPage },
  setup() {
    const {
      items: products,
      filter
    } = useProducts()

    const modalIsOpen = ref()

    return {
      products,
      filter,
      modalIsOpen
    }
  }
}
</script>

<style scoped>

</style>
