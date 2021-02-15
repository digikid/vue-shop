import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function usePagination(items, limit = 10) {
    const route = useRoute()
    const router = useRouter()

    const current = ref(route.query.page - 1 || 0)
    const previousPage = ref()

    const pages = computed(() => items.value ? items.value.reduce((acc, val, i) => {
        const index = Math.floor(i / limit)
        const page = acc[index] || (acc[index] = [])

        page.push(val)

        return acc
    }, []) : [])

    const index = computed(() => i => limit * current.value + i + 1)

    const to = i => {
        if (i < 0 || i >= pages.value.length) return

        setTimeout(() => {
            let query = {}

            if (route.query.title || route.query.category) {
                query = {
                    ...route.query
                }

                delete query.page
            } else if (i) {
                query.page = i + 1
            }

            router.replace({
                query
            })
        }, 1)

        current.value = i

        if (pages.value.length - 1 > current.value) {
            previousPage.value = 0
        }
    }

    const prev = () => to(current.value - 1)

    const next = () => to(current.value + 1)

    watch(pages, () => {
        if (pages.value.length < current.value + 1) {
            previousPage.value = route.query.page ? route.query.page - 1 : 0
            to(0)
        }

        if (!pages.value.length || previousPage.value) {
            to(previousPage.value)
        }
    })

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
