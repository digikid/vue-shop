import dbAxios from '@/axios/db'
import store from '@/store'

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
        async load({ commit }) {
            try {
                const { data } = await dbAxios.get('/orders.json')

                commit('load', data ? Object.keys(data).map(id => ({
                    ...data[id],
                    id
                })) : [])
            } catch(e) {
                console.log(e)
            }
        },
        async add({ commit }, payload) {
            try {
                const token = store.getters['auth/token']
                const { data } = await dbAxios.post(`/orders.json?auth=${token}`, payload)

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
                console.log(e)
            }
        },
        async update({ commit }, payload) {
            const { id, ...item } = payload

            try {
                const token = store.getters['auth/token']
                await dbAxios.patch(`/orders/${id}.json?auth=${token}`, item)

                commit('update', payload)
            } catch(e) {
                console.log(e)
            }
        },
        async remove({ commit }, id) {
            try {
                const token = store.getters['auth/token']
                await dbAxios.delete(`/orders/${id}.json?auth=${token}`)

                commit('remove', id)
            } catch(e) {
                console.log(e)
            }
        }
    }
}
