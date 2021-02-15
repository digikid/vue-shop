<template>
  <form @submit.prevent="onSubmit">
    <div :class="['form-control', {
        invalid: emailError
      }]">
      <label for="sign-in-email">Email</label>
      <input type="email" id="sign-in-email" v-model="email" @blur="emailBlur">
      <small v-if="emailError">{{ emailError }}</small>
    </div>

    <div :class="['form-control', {
        invalid: passwordError
      }]">
      <label for="sign-in-password">Пароль</label>
      <input type="password" id="sign-in-password" v-model="password" @blur="passwordBlur">
      <small v-if="passwordError">{{ passwordError }}</small>
    </div>

    <AppButton
        type="primary"
        text="Войти"
        :disabled="isSubmitting || isTooManyAttempts"
    />

    <div
        class="text-danger"
        v-if="isTooManyAttempts"
    >
      Вы слишком часто пытаетесь войти в систему, попробуйте позже.
    </div>
  </form>
</template>

<script>
import { useSignInForm } from '@/use/forms/signIn'
import AppButton from '@/components/ui/AppButton'

export default {
  name: 'FormSignIn',
  components: {AppButton},
  setup() {
    return {
      ...useSignInForm()
    }
  }
}
</script>

<style scoped>

</style>
