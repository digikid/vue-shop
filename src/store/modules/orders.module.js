import dbAxios from '@/axios/db'
import store from '@/store'
import { error } from '@/utils/error'

export default {
    namespaced: true,
    state() {
        return {
            orders: []
        }
    },
    getters: {
        items(state) {
            return state.orders
        }
    },
    mutations: {
        load(state, payload) {
            state.orders = payload
        },
        add(state, payload) {
            const index = state.orders.findIndex(item => item.id === payload.id)

            if (index === -1) {
                state.orders.push(payload)
            }
        },
        update(state, payload) {
            const index = state.orders.findIndex(item => item.id === payload.id)

            if (index !== -1) {
                state.orders[index] = payload
            }
        },
        remove(state, id) {
            const index = state.orders.findIndex(item => item.id === id)

            if (index !== -1) {
                state.orders.splice(index, 1)
            }
        }
    },
    actions: {
        async load({ commit, dispatch }) {
            try {
                const { data } = await dbAxios.get('/orders.json')

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
                const { data } = await dbAxios.post('/orders.json', payload)

                dispatch('products/load', null, {
                    root: true
                })

                const products = store.getters['products/items']

                payload.items.forEach(item => {
                    const prevCount = products.find(product => product.id === item.id).count

                    if (prevCount < item.count) return

                    store.dispatch('products/update', {
                        ...item,
                        count: prevCount - item.count
                    })
                })

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
                await dbAxios.patch(`/orders/${id}.json`, item)

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
                await dbAxios.delete(`/orders/${id}.json`)

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
