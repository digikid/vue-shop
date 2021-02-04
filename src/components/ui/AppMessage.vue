<template>
  <div
      v-if="message"
      :class="['alert', message.type]"
  >
    <p class="alert-title" v-if="title">{{ title }}</p>
    <p>{{ message.value }}</p>
    <span
        class="alert-close"
        @click="close"
    >
      &times;
    </span>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'AppMessage',
  setup() {
    const store = useStore()
    const message = computed(() => store.state.message)

    const TITLE_MAP = {
      primary: 'Успешно',
      danger: 'Ошибка',
      warning: 'Внимание'
    }

    const title = computed(() => message.value ? TITLE_MAP[message.value.type] : null)

    const close = () => store.commit('clearMessage')

    return {
      message,
      title,
      close
    }
  }
}
</script>

<style scoped>

</style>
