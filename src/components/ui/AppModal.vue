<template>
  <Teleport to="body">
    <div>
      <div class="modal-backdrop" @click="$emit('close')"></div>
      <div class="modal">
        <h3 v-if="title">{{ title }}</h3>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: 'AppModal',
  props: {
    title: {
      type: String
    }
  },
  emits: ['close']
}
</script>

<style scoped>
</style>
