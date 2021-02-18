import axios from 'axios'
import dbAxios from '@/axios/db'
import { error } from '@/utils/error'

const FB_KEY = process.env.VUE_APP_FB_KEY
const SIGN_UP_URL = process.env.VUE_APP_SIGN_UP_URL
const USER_KEY = process.env.VUE_APP_USER_KEY

export default {
    namespaced: true,
    state() {
        return {
            users: [],
            roles: {
                admin: 'Администратор',
                user: 'Пользователь'
            },
            current: JSON.parse(localStorage.getItem(USER_KEY))
        }
    },
    getters: {
        items(state) {
            return state.users
        },
        roles(state) {
            return state.roles
        },
        current(state) {
            return state.current
        },
        isAdmin(state) {
            return state.current ? state.current.role === 'admin' : false
        }
    },
    mutations: {
        load(state, payload) {
            state.users = payload
        },
        set(state, payload) {
            state.current = payload

            localStorage.setItem(USER_KEY, JSON.stringify(payload))
        },
        reset(state) {
            state.current = null

            localStorage.removeItem(USER_KEY)
        },
        add(state, payload) {
            const index = state.users.findIndex(item => item.id === payload.id)

            if (index === -1) {
                state.users.push(payload)
            }
        },
        update(state, payload) {
            const index = state.users.findIndex(item => item.id === payload.id)

            if (index !== -1) {
                state.users[index] = payload
            }
        },
        remove(state, id) {
            const index = state.users.findIndex(item => item.id === id)

            if (index !== -1) {
                state.users.splice(index, 1)
            }
        }
    },
    actions: {
        async load({ commit, dispatch }) {
            try {
                const { data } = await dbAxios.get('/users.json')

                commit('load', data ? Object.keys(data).map(id => ({
                    ...data[id],
                    id
                })) : [])

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
        async set({ commit, dispatch }, id) {
            try {
                const { data } = await dbAxios.get(`/users/${id}.json`)

                const {
                    name,
                    role
                } = data

                commit('set', {
                    id,
                    name,
                    role
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
        },
        async create({ dispatch }, payload) {
            const url = SIGN_UP_URL + FB_KEY

            try {
                const { data } = await axios.post(url, {
                    ...payload,
                    returnSecureToken: true
                })

                const id = data.localId

                await dispatch('add', {
                    id,
                    ...payload
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
        async add({ commit, dispatch }, payload) {
            try {
                const { id, ...user } = payload

                await dbAxios.put(`/users/${id}.json`, user)

                commit('add', payload)

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
        async update({ commit, dispatch }, payload) {
            const { id, ...user } = payload

            try {
                await dbAxios.patch(`/users/${id}.json`, user)

                commit('update', payload)

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
        async remove({ commit, dispatch }, id) {
            try {
                await dbAxios.delete(`/users/${id}.json`)

                commit('remove', id)

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
