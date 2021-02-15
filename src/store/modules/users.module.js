import dbAxios from '@/axios/db'
import store from '@/store'
import axios from 'axios'
import { error } from '@/utils/error'

export default {
    namespaced: true,
    state() {
        return {
            users: []
        }
    },
    getters: {
        items(state) {
            return state.users
        }
    },
    mutations: {
        load(state, payload) {
            state.users = payload
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
        async load({ commit }) {
            try {
                const { data } = await dbAxios.get('/users.json')

                commit('load', data ? Object.keys(data).map(id => ({
                    ...data[id],
                    id
                })) : [])
            } catch(e) {
                console.log(e)
            }
        },
        async create({ dispatch }, payload) {
            const url = process.env.VUE_APP_SIGN_UP_URL + process.env.VUE_APP_FB_KEY

            try {
                const { data } = await axios.post(url, {
                    ...payload,
                    returnSecureToken: true
                })

                await dispatch('add', {
                    ...payload,
                    id: data.name
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
        async add({ commit }, payload) {
            try {
                const token = store.getters['auth/token']
                const { data } = await dbAxios.post(`/users.json?auth=${token}`, payload)

                commit('add', {
                    ...payload,
                    id: data.name
                })
            } catch(e) {
                console.log(e)
            }
        },
        async update({ commit }, payload) {
            const { id, ...item } = payload

            try {
                const token = store.getters['auth/token']
                await dbAxios.put(`/users/${id}.json?auth=${token}`, item)

                commit('update', payload)
            } catch(e) {
                console.log(e)
            }
        },
        async remove({ commit }, id) {
            try {
                const token = store.getters['auth/token']
                await dbAxios.delete(`/users/${id}.json?auth=${token}`)

                commit('remove', id)
            } catch(e) {
                console.log(e)
            }
        }
    }
}
