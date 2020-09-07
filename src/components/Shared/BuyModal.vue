<template>
    <div>
        <v-btn 
                class="primary mr-3" 
                text 
                @click="dialog = true"
            >
                Buy
            </v-btn>
        <v-dialog width="450px" v-model="dialog">
            <v-card>
                <v-container>
                    <v-layout row>
                        <v-flex xs12>
                            <v-card-title>
                                <h1 class="text--primary">Do you want to buy it?</h1>
                            </v-card-title>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>   
                    <v-layout row>
                        <v-flex xs12>
                            <v-card-text>
                                <v-text-field
                                    label="Your name"
                                    name="name"
                                    type="text"
                                    v-model="name"
                                ></v-text-field>
                                <v-text-field
                                    label="Your phone"
                                    name="phone"
                                    type="text"
                                    v-model="phone"
                                ></v-text-field>
                            </v-card-text>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout row>
                        <v-flex xs12>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    @click="onCancel"
                                    :disabled="localLoading"
                                    text
                                >Close</v-btn>
                                <v-btn 
                                    class="success"
                                    @click="onSave"
                                    :disabled="localLoading"
                                    :loading="localLoading"
                                    text
                                >Buy it!</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: ['ad'],
    data() {
        return {
            dialog: false,
            name: '',
            phone: '',
            localLoading: false
        }
    },
    methods: {
        onCancel() {
            this.name = ''
            this.phone = ''
            this.dialog = false
        },
        onSave() {
            if(this.name !== '' && this.phone !== '') {
                this.localLoading = true
                this.$store.dispatch('createOrder', {
                    name: this.name,
                    phone: this.phone,
                    adId: this.ad.id,
                    ownerId: this.ad.ownerId
                })
                .finally(() => {
                    this.name = ''
                    this.phone = ''
                    this.localLoading = false
                    this.dialog = false
                })
                this.dialog = false
            }
        }
    }
}
</script>