<template>
  <AppLoader v-if="isLoading" />
  <AppPage
      v-else
      title="Пользователи"
  >
    <template #header>
      <AppButton type="primary" text="Добавить" @action="modalIsOpen = true" />
    </template>
    <AdminUsersList/>
  </AppPage>
  <AppModal title="Добавить пользователя" @close="modalIsOpen = false" v-if="modalIsOpen">
    <AdminUsersEdit @action="modalIsOpen = false" />
  </AppModal>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useUsers } from '@/use/users'

import AppPage from '@/components/ui/AppPage'
import AdminUsersList from '@/components/admin/users/AdminUsersList'
import AppButton from '@/components/ui/AppButton'
import AdminUsersEdit from '@/components/admin/users/AdminUsersEdit'
import AppModal from '@/components/ui/AppModal'
import AppLoader from '@/components/ui/AppLoader'

export default {
  name: 'Users',
  components: {AppLoader, AppModal, AdminUsersEdit, AppButton, AdminUsersList, AppPage },
  setup() {
    const modalIsOpen = ref()
    const isLoading = ref()

    const {
      load: loadUsers
    } = useUsers()

    onMounted(async() => {
      isLoading.value = true
      await loadUsers()
      isLoading.value = false
    })

    return {
      isLoading,
      modalIsOpen
    }
  }
}
</script>

<style scoped>

</style>
