import { ref } from 'vue'
import { useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

export function useConfirm(hasChanged) {
    const router = useRouter()

    const isConfirmOpen = ref()
    const confirmAccept = ref()
    const confirmTo = ref()

    const onConfirmAccept = () => {
        confirmAccept.value = true
        router.push(confirmTo.value)
    }

    const onConfirmReject = () => {
        isConfirmOpen.value = false
    }

    onBeforeRouteLeave(to => {
        if (hasChanged.value && !confirmAccept.value) {
            isConfirmOpen.value = true
            confirmTo.value = to
            return false
        }

        return true
    })

    onBeforeRouteUpdate(() => {
        isConfirmOpen.value = false
        confirmAccept.value = false
    })

    return {
        isConfirmOpen,
        onConfirmAccept,
        onConfirmReject
    }
}
