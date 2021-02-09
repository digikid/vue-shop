<template>
  <AppPage title="Войти в систему">
    <form @submit.prevent="onSubmit">
      <div :class="['form-control', {
        invalid: emailError
      }]">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" @blur="emailBlur">
        <small v-if="emailError">{{ emailError }}</small>
      </div>

      <div :class="['form-control', {
        invalid: passwordError
      }]">
        <label for="password">Пароль</label>
        <input type="password" id="password" v-model="password" @blur="passwordBlur">
        <small v-if="passwordError">{{ passwordError }}</small>
      </div>

      <button
          class="btn primary"
          :disabled="isSubmitting || isTooManyAttempts"
      >Войти</button>

      <div
          class="text-danger"
          v-if="isTooManyAttempts"
      >
        Вы слишком часто пытаетесь войти в систему, попробуйте позже.
      </div>
    </form>
  </AppPage>
</template>

<script>
import { useLoginForm } from '@/use/loginForm'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { error } from '@/utils/error'

import AppPage from '@/components/ui/AppPage'

export default {
  name: 'Auth',
  components: { AppPage },
  setup() {
    const route = useRoute()
    const store = useStore()

    if (route.query.message) {
      store.dispatch('setMessage', {
        value: error(route.query.message.toUpperCase()),
        type: 'warning'
      })
    }

    return {
      ...useLoginForm()
    }
  }
}
</script>

<style scoped>

</style>
