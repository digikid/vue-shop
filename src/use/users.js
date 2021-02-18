import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function useUsers() {
    const store = useStore()
    const router = useRouter()

    const items = computed(() => store.getters['users/items'].sort((a, b) => {
        if (a.role === 'admin' && b.role !== 'admin') {
            return -1
        }

        if (a.role !== 'admin' && b.role === 'admin') {
            return 1
        }

        return 0
    }))

    const roles = computed(() => store.getters['users/roles'])

    const user = computed(() => store.getters['users/current'])
    const isAdmin = computed(() => store.getters['users/isAdmin'])

    const load = async() => await store.dispatch('users/load')

    const create = async item => await store.dispatch('users/create', item)

    const add = async item => await store.dispatch('users/add', item)

    const edit = ({ id }) => router.push(`/admin/users/${id}`)

    const update = async item => {
        await store.dispatch('users/update', item)

        router.go(-1)
    }

    const remove = async ({ id }) => await store.dispatch('users/remove', id)

    return {
        items,
        user,
        isAdmin,
        roles,
        load,
        create,
        add,
        edit,
        update,
        remove
    }
}
