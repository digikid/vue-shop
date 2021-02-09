<template>
  <button
      v-if="text"
      :class="['btn', {
        [type]: type
      }]"
      @click="$emit('action')"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: ''
    }
  },
  emits: ['action']
}
</script>

<style scoped>

</style>
