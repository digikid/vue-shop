<template>
  <AppPage title="Войти в систему">
    <AppAuth />
  </AppPage>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { error } from '@/utils/error'

import AppPage from '@/components/ui/AppPage'
import AppAuth from '@/components/auth/AppAuth'

export default {
  name: 'Auth',
  components: {AppAuth, AppPage },
  setup() {
    const route = useRoute()
    const store = useStore()

    if (route.query.message) {
      store.dispatch('setMessage', {
        value: error(route.query.message.toUpperCase()),
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>

</style>
