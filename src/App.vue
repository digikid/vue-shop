<template>
  <component
      :is="layout + '-layout'"
      v-if="layout"
  />
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import MainLayout from '@/layout/MainLayout'
import AuthLayout from '@/layout/AuthLayout'

export default {
  name: 'App',
  components: {AuthLayout, MainLayout},
  setup() {
    const route = useRoute()
    const layout = computed(() => route.meta.layout)

    return {
      layout
    }
  }
}
</script>

<style>

</style>
