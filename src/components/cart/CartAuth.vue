<template>
  <h3>Войдите в систему или создайте аккаунт для совершения покупки</h3>
  <AppAuth />
</template>

<script>
import AppAuth from '@/components/auth/AppAuth'

export default {
  name: 'CartAuth',
  components: { AppAuth }
}
</script>

<style scoped>

</style>
