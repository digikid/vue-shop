import dbAxios from '@/axios/db'
import { error } from '@/utils/error'

export default {
    namespaced: true,
    state() {
        return {
            products: []
        }
    },
    getters: {
        items(state) {
            return state.products
        }
    },
    mutations: {
        load(state, payload) {
            state.products = payload
        },
        add(state, payload) {
            const index = state.products.findIndex(item => item.id === payload.id)

            if (index === -1) {
                state.products.push(payload)
            }
        },
        update(state, payload) {
            const index = state.products.findIndex(item => item.id === payload.id)

            if (index !== -1) {
                state.products[index] = payload
            }
        },
        remove(state, id) {
            const index = state.products.findIndex(item => item.id === id)

            if (index !== -1) {
                state.products.splice(index, 1)
            }
        }
    },
    actions: {
        async load({ commit, dispatch }) {
            try {
                const { data } = await dbAxios.get(`/products.json`)

                commit('load', data ? Object.keys(data).map(id => ({
                    ...data[id],
                    id
                })) : [])
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
                const { data } = await dbAxios.post('/products.json', payload)

                commit('add', {
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
        async update({ commit, dispatch }, payload) {
            const { id, ...item } = payload

            try {
                await dbAxios.patch(`/products/${id}.json`, item)

                commit('update', payload)
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
                await dbAxios.delete(`/products/${id}.json`)

                commit('remove', id)
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
