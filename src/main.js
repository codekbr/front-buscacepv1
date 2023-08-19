import { createApp } from 'vue'
import App from './App.vue'
import {
    Quasar,
    Dialog,
    Notify
} from 'quasar'
import quasarUserOptions from './quasar-user-options'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMask from '@devindex/vue-mask'; // <-- ADD THIS LINE


const app = createApp(App)
app.use(router)
app.use(Quasar, {
  plugins: {
    Dialog,
    Notify
  }
}, quasarUserOptions)
app.use(VueAxios, axios)
app.use(VueMask)
app.config.globalProperties.$axios = axios;
axios.defaults.baseURL = process.env.baseURL || process.env.VUE_APP_ROOT_API || '';
app.mount('#app')

