export default {
    state: {
        loading: false,
        serverRequest: false,
        error: null
    },
    mutations: {
        setLoading(state, payload) {
            state. loading = payload
        },
        setServerRequest(state, payload) { 
            state.serverRequest = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        setLoading({commit}, payload) {
            commit('setLoading', payload)
        },
        setServerRequest({commit}, payload) { 
            commit('setServerRequest', payload)
        },
        setError({commit}, payload) {
            commit('setError', payload)
        },
        clearError({commit}, payload) {
            commit('clearError')
        }
    },
    getters: {
        loading(state) {
            return state.loading
        },
        serverRequest(state) { 
            return state.serverRequest
        },
        error(state) {
            return state.error
        }
    }
}