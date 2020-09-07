import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import * as fb from 'firebase'
import BuyModalComponent from './components/Shared/BuyModal'

Vue.component('app-buy-modal',BuyModalComponent)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyD-Vn7rixshsmU2wrOmS4NlNu9GQ6NqbWM",
      authDomain: "vue-ads-a97fd.firebaseapp.com",
      databaseURL: "https://vue-ads-a97fd.firebaseio.com",
      projectId: "vue-ads-a97fd",
      storageBucket: "vue-ads-a97fd.appspot.com",
      messagingSenderId: "744548542464",
      appId: "1:744548542464:web:9733ccee0c3d3e581e90e5",
      measurementId: "G-VYRBVQBYD8"
    };
    
    fb.initializeApp(firebaseConfig);
    fb.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
