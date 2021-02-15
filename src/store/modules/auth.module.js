import axios from 'axios'
import store from '@/store'
import { error } from '@/utils/error'

const TOKEN_KEY = process.env.VUE_APP_TOKEN_KEY
const USER_KEY = process.env.VUE_APP_USER_KEY

export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY),
            user: JSON.parse(localStorage.getItem(USER_KEY))
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        isAuthenticated(_, getters) {
            return !!getters.token
        },
        user(state) {
            return state.user
        },
        isAdmin(state) {
            return state.user ? state.user.role === 'admin' : false
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        },
        setUser(state, user) {
            state.user = user
            localStorage.setItem(USER_KEY, JSON.stringify(user))
        },
        logout(state) {
            state.token = null
            state.user = null
            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem(USER_KEY)
        }
    },
    actions: {
        async signIn({ commit, dispatch }, payload) {
            const url = process.env.VUE_APP_SIGN_IN_URL + process.env.VUE_APP_FB_KEY

            try {
                const { data } = await axios.post(url, {
                    ...payload,
                    returnSecureToken: true
                })

                const { idToken: token } = data

                const user = store.getters['users/items'].find(user => user.email === payload.email)

                delete user.password

                commit('setUser', user)
                commit('setToken', token)

                commit('clearMessage', null, {
                    root: true
                })
            } catch(e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {
                    root: true
                })
            }
        },
        async signUp({ commit, dispatch }, payload) {
            const url = process.env.VUE_APP_SIGN_UP_URL + process.env.VUE_APP_FB_KEY

            console.log(payload)

            try {
                const { data } = await axios.post(url, {
                    ...payload,
                    returnSecureToken: true
                })

                const { idToken: token } = data

                const user = {
                    ...payload,
                    id: data.name
                }

                delete user.password

                commit('setUser', user)
                commit('setToken', token)

                await dispatch('users/add', user, {
                    root: true
                })

                commit('clearMessage', null, {
                    root: true
                })
            } catch(e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {
                    root: true
                })
            }
        }
    }
}
