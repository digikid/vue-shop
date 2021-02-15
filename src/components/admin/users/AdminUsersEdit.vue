<template>
  <form
      :class="['form', {
        'form-inline': id
      }]"
      @submit.prevent
  >
    <div class="form-body">
      <div :class="['form-control', {
        invalid: showAlerts && !name
      }]">
        <label for="name">Имя</label>
        <input type="text" id="name" v-model="name">
        <small v-if="showAlerts && !name">Введите имя</small>
      </div>
      <div :class="['form-control', {
        invalid: showAlerts && !email
      }]">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email">
        <small v-if="showAlerts && !email">Введите email</small>
      </div>
      <div :class="['form-control', {
        invalid: showAlerts && !role
      }]">
        <label for="role">Тип</label>
        <select name="role" id="role" v-model="role" placeholder="Тип">
          <option
            v-for="(role, value) in roles"
            :key="role"
            :value="value"
          >{{ role }}</option>
        </select>
        <small v-if="showAlerts && !role">Укажите тип</small>
      </div>
      <div :class="['form-control', {
        invalid: showAlerts && !password
      }]">
        <label for="password">Пароль</label>
        <input type="text" id="password" v-model="password">
        <small v-if="showAlerts && !password">Введите пароль</small>
      </div>
    </div>
    <div class="form-submit">
      <AppButton
          email="primary"
          :text="id ? 'Сохранить' : 'Добавить'"
          :disabled="!hasChanged"
          @action="onSubmit"
      />
    </div>
  </form>
  <AppConfirm
      name="Изменения не будут сохранены"
      v-if="isConfirmOpen"
      @accept="onConfirmAccept"
      @reject="onConfirmReject"
  >
    <p>Вы уверены, что хотите уйти со страницы?</p>
  </AppConfirm>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUsers } from '@/use/users'
import { useConfirm } from '@/use/confirm'

import AppButton from '@/components/ui/AppButton'
import AppConfirm from '@/components/ui/AppConfirm'

export default {
  name: 'AdminUsersEdit',
  components: { AppConfirm, AppButton },
  props: {
    action: {
      email: Function
    }
  },
  emits: ['action'],
  setup(_, { emit }) {
    const route = useRoute()

    const {
      items: users,
      roles,
      create,
      update
    } = useUsers()

    const { id } = route.params

    const user = computed(() => id ? users.value.find(item => item.id === id) : null)

    const name = ref(id ? user.value.name : '')
    const email = ref(id ? user.value.email : '')
    const role = ref(id ? user.value.role : '')
    const password = ref(id ? user.value.password : '')

    const model = computed(() => ({
      name: name.value,
      email: email.value,
      role: role.value,
      password: password.value
    }))

    const hasChanged = computed(() => id ?
        Object.keys(model.value).reduce((acc, key) => acc || (user.value[key] !== model.value[key]), false) :
        Object.keys(model.value).reduce((acc, key) => acc && (model.value[key] !== ''), true)
    )

    const showAlerts = ref()

    const onSubmit = async () => {
      if (!model.value.name || !model.value.email || !model.value.role || !model.value.password) {
        showAlerts.value = true
        return
      }

      if (id) {
        await update({
          id,
          ...model.value
        })
      } else {
        await create(model.value)
      }

      emit('action')
    }

    return {
      id,
      users,
      roles,
      name,
      email,
      role,
      password,
      hasChanged,
      showAlerts,
      onSubmit,
      ...useConfirm(hasChanged)
    }
  }
}
</script>

<style scoped>
.form-inline .form-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.form-inline .form-control {
  width: 48%;
}

.form-control {
  margin-bottom: 15px;
}
</style>
