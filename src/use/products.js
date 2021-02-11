import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { currency } from '@/utils/currency-format'

export function useProducts() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const filter = ref({
        category: route.query.category || '',
        title: route.query.title || ''
    })

    const categories = computed(() => store.getters['categories/items'])

    const items = computed(() => store.getters['products/items'].sort((a, b) => b.count ? 0 : -1).filter(item => {
        if (filter.value.category && filter.value.title) {
            return item.category === filter.value.category && item.title.toLowerCase().startsWith(filter.value.title.toLowerCase())
        }

        if (filter.value.category) {
            return item.category === filter.value.category
        }

        if (filter.value.title) {
            return item.title.toLowerCase().startsWith(filter.value.title.toLowerCase())
        }

        return true
    }))

    const isEditing = ref()

    const price = computed(() => item => currency(item.price))

    const category = computed(() => item => categories.value.find(category => category.type === item.category).title)

    const load = async() => await store.dispatch('products/load')

    const open = ({ id }) => router.push(`/product/${id}`)

    const add = async item => await store.dispatch('products/add', item)

    const edit = ({ id }) => router.push(`/admin/products/${id}`)

    const update = async item => {
        await store.dispatch('products/update', item)

        router.go(-1)
    }

    const remove = async ({ id }) => await store.dispatch('products/remove', id)

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

    onMounted(() => {
        document.addEventListener('click', () => {
            isEditing.value = false
        })
    })

    return {
        isEditing,
        items,
        price,
        category,
        filter,
        load,
        open,
        add,
        edit,
        update,
        remove
    }
}
