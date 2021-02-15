import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function useAuth() {
    const store = useStore()
    const router = useRouter()

    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
    const isAdmin = computed(() => store.getters['auth/isAdmin'])
    const user = computed(() => store.getters['auth/user'])

    const logout = () => {
        store.commit('auth/logout')
        router.push('/auth')
    }

    return {
        user,
        isAuthenticated,
        isAdmin,
        logout
    }
}
