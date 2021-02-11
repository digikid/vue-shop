import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function usePagination(items = [], limit = 5) {
    const route = useRoute()
    const router = useRouter()

    const current = ref(route.query.page - 1 || 0)

    const pages = computed(() => items.value ? items.value.reduce((acc, val, i) => {
        const index = Math.floor(i / limit)
        const page = acc[index] || (acc[index] = [])

        page.push(val)

        return acc
    }, []) : [])

    const index = computed(() => i => limit * current.value + i + 1)

    const to = i => {
        if (i < 0 || i >= pages.value.length) {
            return
        }

        router.push({
            query: i ? {
                page: i + 1
            } : null
        })

        current.value = i
    }

    const prev = () => to(current.value - 1)

    const next = () => to(current.value + 1)

    return {
        pages,
        current,
        limit,
        index,
        to,
        prev,
        next
    }
}
