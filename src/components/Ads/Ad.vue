<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card v-if="!loading">
                    <v-img
                        :src="ad.imageSrc"  
                        height="300px"  
                    ></v-img>
                    <v-card-text>
                        <h1 class="pb-5">{{ad.title}}</h1>
                        <p>{{ad.description}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <app-edit-ad-modal :ad="ad" v-if="isOwner"></app-edit-ad-modal>  
                        <app-buy-modal :ad="ad"></app-buy-modal>
                    </v-card-actions>
                </v-card>
                <div class="text-center pt-5" v-else>
                    <v-progress-circular
                        :size="100"
                        :width="7"
                        color="purple"
                        indeterminate
                    ></v-progress-circular>
                </div>
            </v-flex>   
        </v-layout>
    </v-container>
</template>

<script>
import EditAdModal from './EditAdModal'
export default{
    props: ['id'],
    computed: {
        ad() {
            const id = this.id
            return this.$store.getters.adById(id)
        },
        loading() {
            return this.$store.getters.loading
        },
        isOwner() {
            if(this.$store.getters.user === null) {
                return false
            }
            return this.ad.ownerId === this.$store.getters.user.id
        }
    },
    components: {
        appEditAdModal: EditAdModal
    }
}
</script>