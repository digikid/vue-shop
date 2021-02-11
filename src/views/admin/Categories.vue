<template>
  <AppPage title="Категории">
    <template #header>
      <AppButton type="primary" text="Добавить" @action="modalIsOpen = true" />
    </template>
    <AdminCategoriesList />
    <AppModal title="Добавить категорию" @close="modalIsOpen = false" v-if="modalIsOpen">
      <CategoryEdit @action="modalIsOpen = false" />
    </AppModal>
  </AppPage>
</template>

<script>
import { ref } from 'vue'

import AppPage from '@/components/ui/AppPage'
import AppButton from '@/components/ui/AppButton'
import AppModal from '@/components/ui/AppModal'
import CategoryEdit from '@/components/category/CategoryEdit'
import AdminCategoriesList from '@/components/admin/categories/AdminCategoriesList'

export default {
  name: 'AdminCategories',
  components: { AdminCategoriesList, CategoryEdit, AppModal, AppButton, AppPage },
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
