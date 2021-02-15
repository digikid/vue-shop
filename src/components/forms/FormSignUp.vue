<template>
  <form class="form" @submit.prevent="onSubmit">
    <div :class="['form-control', {
        invalid: nameError
      }]">
      <label for="sign-up-name">Имя</label>
      <input type="text" id="sign-up-name" v-model="name" @blur="nameBlur">
      <small v-if="nameError">{{ nameError }}</small>
    </div>

    <div :class="['form-control', {
        invalid: emailError
      }]">
      <label for="sign-up-email">Email</label>
      <input type="email" id="sign-up-email" v-model="email" @blur="emailBlur">
      <small v-if="emailError">{{ emailError }}</small>
    </div>

    <div :class="['form-control', {
        invalid: passwordError
      }]">
      <label for="sign-up-password">Пароль</label>
      <input type="password" id="sign-up-password" v-model="password" @blur="passwordBlur">
      <small v-if="passwordError">{{ passwordError }}</small>
    </div>

    <AppButton
        text="Создать аккаунт"
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
import { useSingUpForm } from '@/use/forms/signUp'

import AppButton from '@/components/ui/AppButton'

export default {
  name: 'FormSignUp',
  components: { AppButton },
  setup() {
    return {
      ...useSingUpForm()
    }
  }
}
</script>

<style scoped>

</style>
