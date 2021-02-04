import dbAxios from '@/axios/db'

export default {
    namespaced: true,
    state() {
        return {
            card: [],
            isLoaded: false
        }
    },
    getters: {
        all(state) {
            return state.card
        },
        isLoaded(state) {
            return state.isLoaded
        }
    },
    mutations: {
        load(state, payload) {
            state.card = payload
        },
        update(state, payload) {
            const index = state.card.findIndex(item => item.id === payload.id)

            if (index !== -1) {
                state.card[index] = payload
            }
        },
        remove(state, id) {
            const index = state.card.findIndex(item => item.id === id)

            if (index !== -1) {
                state.card.splice(index, 1)
            }
        },
        loaded(state, payload) {
            state.isLoaded = payload
        }
    },
    actions: {
        async load({ commit }) {
            try {
                const { data } = await dbAxios.get('/card')

                commit('load', data)
                commit('loaded', true)
            } catch(e) {
                commit('load', [])
                commit('loaded', true)
                console.log(e)
            }
        },
        async update({ commit }, payload) {
            const { id, ...item } = payload

            try {
                const { data } = await dbAxios.patch(`/card/${id}`, item)

                commit('update', data)
            } catch(e) {
                console.log(e)
            }
        },
        async remove({ commit }, id) {
            try {
                await dbAxios.delete(`/card/${id}`)

                commit('remove', id)
            } catch(e) {
                console.log(e)
            }
        }
    }
}
