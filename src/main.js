import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App)
.use(router)
.use(Quasar, quasarUserOptions)
.use(VueAxios, axios)
.mount('#app')
