<template>
    <div>
        <v-btn 
            class="warning mr-3" 
            text 
            @click="dialog = true"
        >
            Edit
        </v-btn>
        <v-dialog width="400px" v-model="dialog">
            <v-card>
                <v-container>
                    <v-layout row>
                        <v-flex xs12>
                            <v-card-title>
                                <h1 class="text--primary">Title</h1>
                            </v-card-title>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>   
                    <v-layout row>
                        <v-flex xs12>
                            <v-card-text>
                                <v-text-field
                                    label="Title"
                                    name="title"
                                    type="text"
                                    v-model="editedTitle"
                                ></v-text-field>
                                <v-textarea
                                    clearable
                                    clear-icon="cancel"
                                    label="Description"
                                    v-model="editedDescription"
                                ></v-textarea>
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
                                    text
                                >Cancel</v-btn>
                                <v-btn 
                                    class="success"
                                    @click="onSave"
                                    text
                                >Save</v-btn>
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
            editedTitle: this.ad.title,
            editedDescription: this.ad.description
        }
    },
    methods: {
        onCancel() {
            this.editedTitle = this.ad.title
            this.editedDescription = this.ad.description
            this.dialog = false
        },
        onSave() {
            if(this.editedDescription !== '' && this.editedTitle !== '') {
                this.$store.dispatch('updateAd', {
                    title: this.editedTitle,
                    description: this.editedDescription,
                    id: this.ad.id
                })
                this.dialog = false
            }
        }
    }
}
</script>