<template>
  <AdminNavbar/>
  <div class="container with-nav">
    <AppMessage />
    <RouterView/>
  </div>
</template>

<script>
import AdminNavbar from '@/components/admin/AdminNavbar'
import AppMessage from '@/components/ui/AppMessage'

export default {
  name: 'AdminLayout',
  components: { AppMessage, AdminNavbar }
}
</script>

<style scoped>

</style>
