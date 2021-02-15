<template>
  <AppLoader v-if="isLoading" />
  <AppPage
      v-else
      title="Заказы"
  >
    <template #header>
      <AdminOrdersFilter v-model:filter="filter" />
    </template>
    <AdminOrdersList :items="orders" />
  </AppPage>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useOrders } from '@/use/orders'

import AppPage from '@/components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import AdminOrdersFilter from '@/components/admin/orders/AdminOrdersFilter'
import AdminOrdersList from '@/components/admin/orders/AdminOrdersList'

export default {
  name: 'AdminOrders',
  components: { AdminOrdersFilter, AdminOrdersList, AppLoader, AppPage },
  setup() {
    const {
      items: orders,
      load: loadOrders,
      filter
    } = useOrders()

    const isLoading = ref()

    onMounted(async () => {
      isLoading.value = true
      await loadOrders()
      isLoading.value = false
    })

    return {
      isLoading,
      filter,
      orders
    }
  }
}
</script>

<style scoped>

</style>
