import { createStore, createLogger } from 'vuex'

import auth from '@/store/modules/auth.module'
import products from '@/store/modules/products.module'
import categories from '@/store/modules/categories.module'
import orders from '@/store/modules/orders.module'
import users from '@/store/modules/users.module'
import cart from '@/store/modules/cart.module'

const plugins = []

if (process.env.NODE_ENV === 'development') {
    plugins.push(createLogger())
}

const store = createStore({
    state() {
        return {
            message: null
        }
    },
    getters: {

    },
    mutations: {
        setMessage(state, message) {
            state.message = message
        },
        clearMessage(state) {
            state.message = null
        }
    },
    actions: {
        async setMessage({ commit }, message) {
            commit('setMessage', message)

            window.scrollTo(0, 0);

            setTimeout(() => {
                commit('clearMessage')
            }, 3000)
        }
    },
    modules: {
        auth,
        products,
        categories,
        cart,
        orders,
        users
    },
    plugins
})


export default store
