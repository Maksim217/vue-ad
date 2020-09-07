import * as fb from 'firebase'

class Order {
    constructor(name, phone, adId, done = false, id = null) {
        this.name = name
        this.phone = phone
        this.adId = adId
        this.done = done
        this.id = id
    }
}

export default {
    state: {
        orders: []
    },
    mutations: {
        loadOrders(state, payload) {
            state.orders = payload
        }
    },
    actions: {
        async createOrder({commit}, {name, phone, adId, ownerId}) {
            const order = new Order(name, phone, adId)
            commit('clearError')

            try {
                await fb.database().ref(`/users/${ownerId}/orders`).push(order)
            } catch(error) {
                commit('setError', error.message)
            }
        },
        async markOrderDone({commit, getters}, payload) {
            commit('clearError')
            try {
                await fb.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
                    done: true
                })
            } catch(error) {
                commit('setError', error.message)
            } 
        }
    },
    getters: {
        doneOrders(state) {
            return state.orders.filter(order => order.done)
        },
        undoneOrders(state) {
            return state.orders.filter(order => !order.done)
        },
        orders(state, getters) {
            return getters.undoneOrders.concat(getters.doneOrders)
        }
    }
}