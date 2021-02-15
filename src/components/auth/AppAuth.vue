<template>
  <AppTabs>
    <AppTab title="Войти">
      <FormSignIn/>
    </AppTab>
    <AppTab title="Создать аккаунт">
      <FormSignUp/>
    </AppTab>
  </AppTabs>
</template>

<script>
import AppTabs from '@/components/ui/tabs/AppTabs'
import AppTab from '@/components/ui/tabs/AppTab'
import FormSignIn from '@/components/forms/FormSignIn'
import FormSignUp from '@/components/forms/FormSignUp'

export default {
  name: 'AppAuth',
  components: { FormSignUp, FormSignIn, AppTab, AppTabs }
}
</script>

<style scoped>

</style>
