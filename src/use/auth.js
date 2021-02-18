import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function useAuth() {
    const store = useStore()
    const router = useRouter()

    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

    const logout = () => {
        store.commit('auth/logout')
        store.commit('users/reset')
        router.push('/auth')
    }

    return {
        isAuthenticated,
        logout
    }
}
