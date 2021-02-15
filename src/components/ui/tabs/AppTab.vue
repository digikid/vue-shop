<template>
  <div
    :class="['tabs__item', {
      'is-active': isActive
    }]"
    v-show="isActive"
  >
    <slot/>
  </div>
</template>

<script>
import { onBeforeMount, ref, inject, watch } from 'vue'

export default {
  name: 'AppTab',
  props: ['title'],
  setup(props) {
    const isActive = ref(false)
    const tabs = inject('TabsProvider')

    watch(
      () => tabs.selectedIndex,
      () => {
        isActive.value = props.title === tabs.selectedIndex
      }
    )

    onBeforeMount(() => {
      isActive.value = props.title === tabs.selectedIndex
    })

    return {
      isActive
    }
  }
}
</script>

<style scoped>

</style>
