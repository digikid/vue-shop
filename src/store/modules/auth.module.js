import axios from 'axios'
import { error } from '@/utils/error'

const FB_KEY = process.env.VUE_APP_FB_KEY

const TOKEN_KEY = process.env.VUE_APP_TOKEN_KEY
const REFRESH_KEY = process.env.VUE_APP_REFRESH_KEY
const EXPIRES_KEY = process.env.VUE_APP_EXPIRES_KEY

const SIGN_IN_URL = process.env.VUE_APP_SIGN_IN_URL
const SIGN_UP_URL = process.env.VUE_APP_SIGN_UP_URL
const REFRESH_URL = process.env.VUE_APP_REFRESH_URL

export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY),
            refreshToken: localStorage.getItem(REFRESH_KEY),
            expiresDate: new Date(localStorage.getItem(EXPIRES_KEY))
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        isAuthenticated(_, getters) {
            return !!getters.token
        },
        isExpired(state) {
            return new Date() >= state.expiresDate
        }
    },
    mutations: {
        setToken(state, { refreshToken, idToken, expiresIn = '3600' }) {
            const expiresDate = new Date(new Date().getTime() + Number(expiresIn) * 1000)

            state.token = idToken
            state.refreshToken = refreshToken
            state.expiresDate = expiresDate

            localStorage.setItem(TOKEN_KEY, idToken)
            localStorage.setItem(REFRESH_KEY, refreshToken)
            localStorage.setItem(EXPIRES_KEY, expiresDate.toString())
        },
        logout(state) {
            state.token = null
            state.refreshToken = null
            state.expiresDate = null

            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem(REFRESH_KEY)
            localStorage.removeItem(EXPIRES_KEY)
        }
    },
    actions: {
        async signIn({ commit, dispatch }, payload) {
            const url = SIGN_IN_URL + FB_KEY

            try {
                const { data } = await axios.post(url, {
                    ...payload,
                    returnSecureToken: true
                })

                const id = data.localId

                commit('setToken', data)

                await dispatch('users/set', id, {
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
            const url = SIGN_UP_URL + FB_KEY

            try {
                const { data } = await axios.post(url, {
                    ...payload,
                    returnSecureToken: true
                })

                const id = data.localId

                commit('setToken', data)

                await dispatch('users/add', {
                    id,
                    ...payload
                }, {
                    root: true
                })

                await dispatch('users/set', id, {
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
        async refresh({ state, commit }) {
            const url = REFRESH_URL + FB_KEY

            try {
                const { data } = await axios.post(url, {
                    grant_type: 'refresh_token',
                    refresh_token: state.refreshToken
                })

                commit('setToken', {
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in
                })
            } catch(e) {
                console.log(e)
            }
        }
    }
}
