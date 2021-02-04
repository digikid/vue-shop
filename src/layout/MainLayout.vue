<template>
  <TheNavbar/>
  <div class="container with-nav">
    <AppMessage/>
    <RouterView/>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
import AppMessage from '@/components/ui/AppMessage'

export default {
  name: 'MainLayout',
  components: {AppMessage, TheNavbar }
}
</script>

<style scoped>

</style>
