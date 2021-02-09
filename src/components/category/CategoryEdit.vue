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
          @action="onSubmit"
      />
    </div>
  </form>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCategories } from '@/use/categories'

import AppButton from '@/components/ui/AppButton'

export default {
  name: 'CategoryEdit',
  components: { AppButton },
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

    const showAlerts = ref()

    const onSubmit = async () => {
      const item = {
        title: title.value,
        type: type.value
      }

      if (!item.title || !item.type) {
        showAlerts.value = true
        return
      }

      if (id) {
        await update({
          id,
          ...item
        })
      } else {
        await add(item)
      }

      emit('action')
    }

    return {
      id,
      categories,
      title,
      type,
      showAlerts,
      onSubmit
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
