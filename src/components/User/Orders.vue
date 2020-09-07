<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 class="text-center pt-5" v-if="loading || !serverRequest">
                <v-progress-circular
                    :size="100"
                    :width="7"
                    color="purple"
                    indeterminate
                ></v-progress-circular>
            </v-flex> 
            <v-flex xs12 sm6 offset-sm3 v-else-if="!loading && orders.length !== 0">
                <v-list
                    flat
                    subheader
                    three-line
                >
                    <h1 class="text--secondary mb-3">Orders</h1>
                    <v-list-item-group
                        multiple
                        active-class=""
                    >
                        <v-list-item
                            v-for="order of resultOrders"
                            :key="order.id"
                        >
                            <template>
                                <v-list-item-action>
                                <v-checkbox
                                    color="success"
                                    :input-value="order.done"
                                    @change="markDone(order)"
                                ></v-checkbox>
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title>{{order.name}}</v-list-item-title>
                                    <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn 
                                        :to="'/ad/' + order.adId"
                                        class="primary"
                                    >Open</v-btn>
                                </v-list-item-action>
                            </template>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>    
            </v-flex> 
            <v-flex xs12 class="text-center" v-else-if="serverRequest && orders.length === 0">
                <h1>You have no orders</h1>
            </v-flex>  
        </v-layout>
    </v-container>
</template>

<script>
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


export default{
    data() {
        return {
            orders: []
        }
    },
    computed: {
        loading() {
            this.$store.getters.loading
        },
        doneOrders() {
            return this.orders.filter(order => order.done)
        },
        undoneOrders() {
            return this.orders.filter(order => !order.done)
        },
        resultOrders() {
            return this.undoneOrders.concat(this.doneOrders)
        },
        serverRequest() {
            return this.$store.getters.serverRequest
        }
    },
    methods: {
        markDone(order) { 
            this.$store.dispatch('markOrderDone', order.id)
                .then(() => {
                    order.done = true
                })
                .catch(() => {}) 
        }
        
    },
    mounted: async function() {
        const id = this.$store.getters.user.id

        this.$store.dispatch('clearError')
        this.$store.dispatch('setLoading', true)

        const resultOrders = []

            try {
                const fbVal = await fb.database().ref(`/users/${id}/orders`).once('value')
                const orders = fbVal.val()
                Object.keys(orders).forEach(key => {
                    const order = orders[key]
                    const newOrder = new Order(
                        order.name,
                        order.phone,
                        order.adId,
                        order.done,
                        key
                    )
                    resultOrders.push(newOrder)
                })
                this.orders = resultOrders
                this.$store.dispatch('setServerRequest', true)
                this.$store.dispatch('setLoading', false)
            } catch (error) {
                this.$store.dispatch('setError', error.message)
                this.$store.dispatch('setServerRequest', true)
                this.$store.dispatch('setLoading', false)
            }    
    },
    beforeDestroy() {
        this.$store.dispatch('setServerRequest', false)
    }
}
</script>