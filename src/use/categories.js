import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function useCategories() {
    const store = useStore()
    const router = useRouter()

    const items = computed(() => store.getters['categories/items'])

    const products = computed(() => store.getters['products/items'])

    const activeItems = computed(() => items.value.filter(({ type }) => products.value.find(({ category }) => category === type)))

    const productsTotal = ({ type }) => products.value.filter(({ category }) => category === type).length

    const load = async() => await store.dispatch('categories/load')

    const open = ({ type }) => router.push(`/?category=${type}`)

    const add = async item => await store.dispatch('categories/add', item)

    const edit = ({ id }) => router.push(`/admin/categories/${id}`)

    const update = async item => {
        await store.dispatch('categories/update', item)

        router.go(-1)
    }

    const remove = async ({ id }) => {
        if (activeItems.value.find(item => item.id === id)) {
            await store.dispatch('setMessage', {
                value: 'Невозможно удалить категорию, так как она содержит товары',
                type: 'danger'
            })
        } else {
            await store.dispatch('categories/remove', id)
        }
    }

    return {
        items,
        activeItems,
        productsTotal,
        load,
        open,
        add,
        edit,
        update,
        remove
    }
}
