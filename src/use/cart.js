import { computed } from 'vue'
import { useStore } from 'vuex'

export function useCart() {
    const store = useStore()
    const items = computed(() => store.getters['cart/items'])

    const count = computed(() => items.value.length)

    const total = computed(() => items.value.reduce((accumulator, current) => accumulator + current.price * current.count, 0))

    const productCount = computed(() => product => {
        const item = items.value.find(({id}) => id === product.id)

        return item ? item.count : 0
    })

    const load = async() => await store.dispatch('cart/load')

    const add = async item => {
        await store.dispatch('cart/add', item)
    }

    const inc = async item => {
        const { id } = item

        if (items.value.findIndex(item => item.id === id) === -1) {
            await add({
                ...item,
                count: 0
            })
        }

        const count = items.value.find(item => item.id === id).count

        await store.dispatch('cart/update', {
            ...item,
            count: count + 1
        })
    }

    const dec = async item => {
        const { id } = item

        if (items.value.findIndex(item => item.id === id) === -1) {
            return
        }

        const count = items.value.find(item => item.id === id).count

        await store.dispatch('cart/update', {
            ...item,
            count: count - 1
        })
    }

    const get = id => items.value.find(item => item.id === id)

    return {
        items,
        count,
        total,
        productCount,
        add,
        inc,
        dec,
        get,
        load
    }
}
