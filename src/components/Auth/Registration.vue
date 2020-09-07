<template>
    <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="6"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Registration form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form" validation>
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="email"
                    :rules="emailRules"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="passwordRules"
                    :counter="16"
                    v-model="password"
                  ></v-text-field>

                  <v-text-field
                    id="confirmPassword"
                    label="Confirm password"
                    name="confirm-password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="confirmPasswordRules"
                    :counter="16"
                    v-model="confirmPassword"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                    @click="onSubmit"
                    :loading="loading"
                    :disabled="!valid || loading"
                    class="primary"
                >Create account</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
export default{
    data() {
        return {
            valid: false,
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length >= 6 && v.length <= 16 || 'Password must be equal or more than 6 and less or equal than 16 characters'
            ],
            confirmPassword: '',
            confirmPasswordRules: [
                v => !!v || 'Password is required',
                v => v === this.password || 'Passwords should be matches'
            ]  
        }  
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      }
    },
    methods: {
        onSubmit() {
            if(this.$refs.form.validate()){
                const user = {
                    email: this.email,
                    password: this.password
                }
                this.$store.dispatch('registerUser', user)
                  .then(() => {
                    this.$router.push('/')
                  })
                  .catch(() => {})
            }
        }
    }
}
</script>