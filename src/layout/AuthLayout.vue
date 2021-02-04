<template>
  <div class="container">
    <AppMessage/>
    <RouterView/>
  </div>
</template>

<script>
import AppMessage from '@/components/ui/AppMessage'
export default {
  name: 'AuthLayout',
  components: {AppMessage}
}
</script>

<style scoped>

</style>
