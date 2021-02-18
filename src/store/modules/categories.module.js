import dbAxios from '@/axios/db'

export default {
    namespaced: true,
    state() {
        return {
            categories: []
        }
    },
    getters: {
        items(state) {
            return state.categories
        }
    },
    mutations: {
        load(state, payload) {
            state.categories = payload
        },
        add(state, payload) {
            const index = state.categories.findIndex(item => item.id === payload.id)

            if (index === -1) {
                state.categories.push(payload)
            }
        },
        update(state, payload) {
            const index = state.categories.findIndex(item => item.id === payload.id)

            if (index !== -1) {
                state.categories[index] = payload
            }
        },
        remove(state, id) {
            const index = state.categories.findIndex(item => item.id === id)

            if (index !== -1) {
                state.categories.splice(index, 1)
            }
        }
    },
    actions: {
        async load({ commit }) {
            try {
                const { data } = await dbAxios.get('/categories.json')

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
                const { data } = await dbAxios.post('/categories.json', payload)

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
                await dbAxios.patch(`/categories/${id}.json`, item)

                commit('update', payload)
            } catch(e) {
                console.log(e)
            }
        },
        async remove({ commit }, id) {
            try {
                await dbAxios.delete(`/categories/${id}.json`)

                commit('remove', id)
            } catch(e) {
                console.log(e)
            }
        }
    }
}
