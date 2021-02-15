<template>
  <form
      :class="['form', {
        'form-inline': id
      }]"
      @submit.prevent
  >
    <div class="form-body">
      <div :class="['form-control', {
        invalid: showAlerts && !title
      }]">
        <label for="title">Название</label>
        <input type="text" id="title" v-model="title">
        <small v-if="showAlerts && !title">Введите название</small>
      </div>
      <div :class="['form-control', {
        invalid: showAlerts && !type
      }]">
        <label for="type">Тип</label>
        <input type="text" id="type" v-model="type">
        <small v-if="showAlerts && !type">Введите тип</small>
      </div>
    </div>
    <div class="form-submit">
      <AppButton
          type="primary"
          :text="id ? 'Сохранить' : 'Добавить'"
          :disabled="!hasChanged"
          @action="onSubmit"
      />
    </div>
  </form>
  <AppConfirm
      title="Изменения не будут сохранены"
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
import { useCategories } from '@/use/categories'
import { useConfirm } from '@/use/confirm'

import AppButton from '@/components/ui/AppButton'
import AppConfirm from '@/components/ui/AppConfirm'

export default {
  name: 'AdminCategoriesEdit',
  components: { AppConfirm, AppButton },
  props: {
    action: {
      type: Function
    }
  },
  emits: ['action'],
  setup(_, { emit }) {
    const route = useRoute()

    const {
      items: categories,
      add,
      update
    } = useCategories()

    const { id } = route.params

    const category = computed(() => id ? categories.value.find(item => item.id === id) : null)

    const title = ref(id ? category.value.title : '')
    const type = ref(id ? category.value.type : '')

    const model = computed(() => ({
      title: title.value,
      type: type.value
    }))

    const hasChanged = computed(() => id ?
        Object.keys(model.value).reduce((acc, key) => acc || (category.value[key] !== model.value[key]), false) :
        Object.keys(model.value).reduce((acc, key) => acc && (model.value[key] !== ''), true)
    )

    const showAlerts = ref()

    const onSubmit = async () => {
      if (!model.value.title || !model.value.type) {
        showAlerts.value = true
        return
      }

      if (id) {
        await update({
          id,
          ...model.value
        })
      } else {
        await add(model.value)
      }

      emit('action')
    }

    return {
      id,
      categories,
      title,
      type,
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
