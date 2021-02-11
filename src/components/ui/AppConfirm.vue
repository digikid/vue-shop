<template>
  <AppModal :title="title">
    <slot />
    <AppButton
        type="primary"
        text="Да"
        @click="$emit('accept')"
    />
    <AppButton
        type="danger"
        text="Нет"
        @click="$emit('reject')"
    />
  </AppModal>
</template>

<script>
import AppModal from '@/components/ui/AppModal'
import AppButton from '@/components/ui/AppButton'

export default {
  name: 'AppConfirm',
  components: { AppButton, AppModal },
  props: {
    title: String
  },
  emits: ['accept', 'reject']
}
</script>

<style scoped>

</style>
