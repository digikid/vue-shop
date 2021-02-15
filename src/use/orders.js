import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export function useOrders() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const statuses = [{
        title: 'Активен',
        value: 'active'
    }, {
        title: 'Выполняется',
        value: 'pending'
    }, {
        title: 'Завершен',
        value: 'done'
    }, {
        title: 'Отменен',
        value: 'cancel'
    }]

    const filter = ref({
        status: route.query.status || ''
    })

    const items = computed(() => store.getters['orders/items']
        .sort((a, b) => a.date - b.date)
        .sort((a, b) => statuses.findIndex(status => a.status === status.value) - statuses.findIndex(status => b.status === status.value))
        .filter(item => {
            if (filter.value.status) {
                return item.status === filter.value.status
            }

            return true
        }))

    const load = async() => await store.dispatch('orders/load')

    const add = async item => {
        await store.dispatch('orders/add', {
            ...item,
            date: Date.now(),
            status: 'active'
        })
        await store.dispatch('setMessage', {
            value: 'Ваш заказ успешно создан',
            type: 'primary'
        })
        store.commit('cart/clear')
        router.push('/')
    }

    const edit = ({ id }) => router.push(`/admin/orders/${id}`)

    const update = async item => await store.dispatch('orders/update', item)

    const remove = async ({ id }) => await store.dispatch('orders/remove', id)

    watch(filter, () => {
        const query = {}

        Object.entries(filter.value).forEach(([key, value]) => {
            if (value) {
                query[key] = value
            }
        })

        router.replace({
            query
        })
    })

    return {
        items,
        statuses,
        filter,
        load,
        add,
        open,
        edit,
        update,
        remove
    }
}
