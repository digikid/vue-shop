import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function useUsers() {
    const store = useStore()
    const router = useRouter()

    const roles = {
        admin: 'Администратор',
        user: 'Пользователь'
    }

    const items = computed(() => store.getters['users/items'])

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
        roles,
        load,
        create,
        add,
        edit,
        update,
        remove
    }
}
