<template>
  <v-app>
    <v-card
      color="grey lighten-4"
      flat
      tile
    >
      <v-toolbar
        color="primary"
        dark 
        dense
      >
        <v-app-bar-nav-icon 
          @click="drawer=true"
          class="hidden-md-and-up"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link 
            to="/" 
            tag="span"
            class="pointer"
          >
            Ad application
          </router-link>
          </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          class="hidden-sm-and-down"
          v-for="link in links"
          :key="link.title"
          :to="link.url" 
          text
        >
          <v-icon left>{{link.icon}}</v-icon>
          {{link.title}}
        </v-btn>
        <v-btn
          @click="onLogout"
          text
          v-if="isUserLoggedIn"
        >
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar>
    </v-card>
    
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item 
            v-for="link of links"
            :key="link.title"
            :to="link.url"
          >
            <v-list-item-icon>
              <v-icon>{{link.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{link.title}}</v-list-item-title>
          </v-list-item>
          <v-list-item 
            @click="onLogout"    
            v-if="isUserLoggedIn"
          >
            <v-list-item-icon>
              <v-icon>exit_to_app</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>  
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>

    <template v-if="error && error !== 'Cannot convert undefined or null to object'">
      <v-snackbar
        :multi-line="true"
        :timeout="5000"
        color="error"
        @input="closeError"
        :value="true"
      >
        {{error}}
        <v-btn
          text
          dark
          @click="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn
    },
    links() {
      if(this.isUserLoggedIn) {
        return [
          {title: 'Orders', icon: 'bookmark_border', url: '/orders'},
          {title: 'New ad', icon: 'note_add', url: '/new'},
          {title: 'My ads', icon: 'list', url: '/list'}  
        ]
      }
      
      return [
        {title: 'Login', icon: 'lock', url: '/login'},
        {title: 'Registration', icon: 'face', url: '/registration'}  
      ]
    }
  },
  methods: {
    closeError() {
      this.$store.dispatch('clearError')
    },
    onLogout() {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
        .then(() => {})
        .catch(() => {})
    }
  }
};
</script>

<style>
 .pointer {
   cursor: pointer;
 }
</style>
