import { computed } from 'vue'
import { useStore } from 'vuex'

export function useCart() {
    const store = useStore()
    const items = computed(() => store.getters['cart/all'])

    const total = computed(() => items.value.reduce((accumulator, current) => accumulator + current.price * current.count, 0))

    const isLoading = computed(() => !store.getters['cart/isLoaded'])

    const inc = async item => {
        await store.dispatch('cart/update', {
            ...item,
            count: item.count + 1
        })
    }

    const dec = async item => {
        if (item.count > 1) {
            await store.dispatch('cart/update', {
                ...item,
                count: item.count - 1
            })
        } else {
            await store.dispatch('cart/remove', item.id)
        }
    }

    const load = async () => await store.dispatch('cart/load')

    return {
        items,
        total,
        isLoading,
        inc,
        dec,
        load
    }
}
