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
        invalid: showAlerts && !img
      }]">
        <label for="img">Изображение</label>
        <input type="text" id="img" v-model="img">
        <small v-if="showAlerts && !img">Введите URL изображения</small>
      </div>
      <div :class="['form-control', {
        invalid: showAlerts && price === ''
      }]">
        <label for="price">Цена</label>
        <input type="number" min="0" id="price" v-model="price">
        <small v-if="showAlerts && price === ''">Введите цену</small>
      </div>
      <div :class="['form-control', {
        invalid: showAlerts && count === ''
      }]">
        <label for="count">Количество</label>
        <input type="number" min="0" id="count" v-model="count">
        <small v-if="showAlerts && count === ''">Введите количество</small>
      </div>
      <div :class="['form-control', {
        invalid: showAlerts && !category
      }]">
        <label for="category">Категория</label>
        <select id="category" v-model="category">
          <option
              v-for="category in categories"
              :key="category.id"
              :value="category.type"
          >{{ category.title }}</option>
        </select>
        <small v-if="showAlerts && !category">Выберите категорию</small>
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
import { useProducts } from '@/use/products'
import { useCategories } from '@/use/categories'

import AppButton from '@/components/ui/AppButton'

export default {
  name: 'ProductEdit',
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
      items: products,
      add,
      update
    } = useProducts()

    const {
      items: categories
    } = useCategories()

    const { id } = route.params

    const product = computed(() => id ? products.value.find(item => item.id === id) : null)

    const title = ref(id ? product.value.title : '')
    const img = ref(id ? product.value.img : '')
    const price = ref(id ? product.value.price : '')
    const count = ref(id ? product.value.count : '')
    const category = ref(id ? product.value.category : '')

    const showAlerts = ref()

    const onSubmit = async () => {
      const item = {
        title: title.value,
        img: img.value,
        price: Number(price.value),
        count: Number(count.value),
        category: category.value
      }

      if (!item.title || !item.img || !item.category || item.price === '' || item.count === '') {
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
      img,
      price,
      count,
      category,
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
