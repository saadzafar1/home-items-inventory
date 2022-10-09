import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n,  } from 'vue-i18n'
import '@popperjs/core'
import "bootstrap"
// import PrimeVue from 'primevue/config';
import App from './App.vue'
import router from './router'
import '@/assets/scss/main.scss'
import resources from '@/resources';
import initFirebase from './utils/firebase';
import initFontAwesome from './utils/init-font-awesome'

const i18n = createI18n({
  locale: 'en',
  messages: resources
})

const app = createApp(App)

initFirebase() // initializing firebase
initFontAwesome(app)
app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
