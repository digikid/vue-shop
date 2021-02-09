import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function useAuth() {
    const store = useStore()
    const router = useRouter()

    const isAuthenticated = ref(store.getters['auth/isAuthenticated'])

    const logout = () => {
        store.commit('auth/logout')
        router.push('/auth')
    }

    return {
        isAuthenticated,
        logout
    }
}
