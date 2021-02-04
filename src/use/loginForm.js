import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function useLoginForm() {
    const store = useStore()
    const router = useRouter()
    const { handleSubmit, isSubmitting, submitCount } = useForm()

    const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField(
        'email',
        yup
            .string()
            .trim()
            .required('Пожалуйста, введите email')
            .email('Введите корректный email')
    )

    const passwordLength = 6

    const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField(
        'password',
        yup
            .string()
            .trim()
            .required('Пожалуйста, введите пароль')
            .min(passwordLength, `Длина пароля должна быть больше ${passwordLength} символов`)
    )

    const isTooManyAttempts = computed(() => submitCount.value >=3 )

    const onSubmit = handleSubmit(async values => {
        try {
            await store.dispatch('auth/login', values)
            router.push('/')
        } catch(e) {
            console.log(e)
        }
    })

    watch(isTooManyAttempts, value => {
        if (value) {
            setTimeout(() => submitCount.value = 0, 1500)
        }
    })

    return {
        email,
        emailError,
        emailBlur,
        password,
        passwordError,
        passwordBlur,
        isSubmitting,
        onSubmit,
        isTooManyAttempts
    }
}
