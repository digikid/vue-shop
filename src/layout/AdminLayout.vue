<template>
  <TheNavbar/>
  <div class="container with-nav">
    <AppMessage />
    <RouterView/>
  </div>
</template>

<script>
import AppMessage from '@/components/ui/AppMessage'
import TheNavbar from '@/components/TheNavbar'

export default {
  name: 'AdminLayout',
  components: {TheNavbar, AppMessage }
}
</script>

<style scoped>

</style>
